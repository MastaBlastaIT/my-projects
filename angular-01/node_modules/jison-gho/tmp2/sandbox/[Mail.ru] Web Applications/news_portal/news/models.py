# conding: utf-8

from django.db import models
from django.conf import settings
from django.db.models import Q
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation


# class ArticleManager(models.Manager):
#     def authored_by(self, user):
#         if user.is_authenticated():
#             return super().get_queryset().filter(
#                 Q(author=user) | Q(is_published=True))
#         else:
#             return super().get_queryset().filter(is_published=True)
class ArticleQuerySet(models.QuerySet):
    def authored_by(self, user):
        if user.is_authenticated():
            return self.filter(Q(author=user) | Q(is_published=True))
        else:
            return self.filter(is_published=True)



class Like(models.Model):  # inside Article: likes = models.ManyToManyField(settings.AUTH_USER_MODEL)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    item_type = models.ForeignKey(ContentType)
    item_id = models.PositiveIntegerField()
    item = GenericForeignKey('item_type', 'item_id')

    # article = models.ForeignKey('Article', related_name="like_set")
    is_liked = models.BooleanField(default=False)

    def __str__(self):
        return ' '.join(['id:', str(self.id), 'user:', self.user.username, 'item: <', str(self.item), ' > ', 'is_liked:', '1' if self.is_liked else '0'])

    class Meta:  # meta-model
        verbose_name = 'Лайк'
        verbose_name_plural = 'Лайки'


class LikeMixIn(models.Model):
    likes = GenericRelation("Like", content_type_field="item_type", object_id_field="item_id",
                            related_query_name="article_set")  # note: likes will be cascade-deleted

    class Meta:
        abstract = True  # do not create db table

    @models.permalink  # use {{ article.get_like_url }} in templates to get URL to like
    def get_like_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return 'news:like', (), {'content_type_id': content_type.id, 'pk': self.id}

    def toggle_like(self, u, commit=False):
        # like_obj = a.like_set.get_or_create(user_id=request.user.id, is_liked=True)
        delta = 0
        try:
            # cp = ContentType.objects.get_for_model(Article)
            # cp.get_object_for_this_type(user=u, id=self.id)
            # like_obj = Like.objects.get(user=u, item_type=ContentType.objects.get_for_model(Article), item_id=self.id)
            like_obj = self.likes.get(user=u, item_id=self.id)  # using GenericRelation
        except Like.DoesNotExist:
            # like_obj = Like.objects.create(user=u, item_type=ContentType.objects.get_for_model(Article), item_id=self.id)
            like_obj = self.likes.create(user=u, item_id=self.id, is_liked=True)
            self.rating += 1 # storing aggregated data (number of likes) right away
            if commit:
                like_obj.save()
                self.save()
            else:
                delta = 1
        else:  # remove like
            self.rating -= 1
            if commit:
                like_obj.delete()
                self.save()
            else:
                delta = -1

        # return Like.objects.filter(item_type=ContentType.objects.get_for_model(Article), item_id=self.id).count() + delta
        return self.likes.count() + delta


class Article(LikeMixIn, models.Model):

    author = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=255)
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=0)
    is_published = models.BooleanField(default=False, verbose_name="Опубликовать?")
    tags = models.ManyToManyField("Tag", related_name="article_set", blank=True)

    def __str__(self):
        return ' '.join(['id:', str(self.id), 'pk:', str(self.pk), 'title:', self.title])

    class Meta:  # meta-model
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'
        ordering = ('title', )  # default sorting of objects of this model; specify "-" for reverse sort

    objects = ArticleQuerySet.as_manager()  # retrieve ModelManager to objects; usage: article.objects
    # objects = ArticleManager

    def get_absolute_url(self):  # used by django to get url to model instance after create/update
        return reverse("news:detail", args=[self.id])

    def get_latest_comment(self):
        return self.comment_set.latest()  # uses get_latest_by Meta field

    def get_cent_comments_channel_name(self):  # for centrifugo
        return "news_portal_comments"

class Tag(models.Model):
    tag_text = models.SlugField()  # max_length = 50

    def __str__(self):
        return self.tag_text


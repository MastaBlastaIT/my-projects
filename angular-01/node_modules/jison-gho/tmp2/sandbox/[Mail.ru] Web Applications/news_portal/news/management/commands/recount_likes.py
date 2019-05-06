# -*- coding: utf-8 -*-
# $ python manage.py recount_likes
from django.core.management import BaseCommand
from news.models import Article, Like
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for a in Article.objects.all():
            is_edited = False
            # likes_count = a.like_set.count()
            likes = Like.objects.filter(item_type=ContentType.objects.get_for_model(Article), item_id=a.id)
            likes_count = likes.count()

            # Check that 1 user - 1 like for an article
            users_liked = set()
            for like in likes:
                if like.user in users_liked:
                    like.delete()
                    print("Article {}: user {} removed extra like".format("<"+str(a)+">", like.user))
                    is_edited = True
                else:
                    users_liked.add(like.user)

            # Check missing dates
            if not(a.pub_date):
                print("Article {}: pub_date was missing => set to {}".format("<"+str(a)+">", timezone.now()))
                a.pub_date = timezone.now()
                is_edited = True
            # Check article.rating field
            if a.rating != likes_count:
                print("Article {}: rating was {} => fixed to {}".format("<"+str(a)+">", a.rating, likes))
                a.rating = likes_count
                is_edited = True

            if is_edited:
                a.save()

        return False

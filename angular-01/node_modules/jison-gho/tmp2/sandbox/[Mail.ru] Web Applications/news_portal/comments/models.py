from django.db import models


class Comment(models.Model):
    article = models.ForeignKey('news.Article', related_name="comment_set")  # by default related_name="comment_set"
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return ' '.join(['id:', str(self.id), 'pk:', str(self.pk), 'text:', self.text])

    class Meta:
        get_latest_by = 'created_at'

    def as_compact_dict(self):
        return {'text': self.text}

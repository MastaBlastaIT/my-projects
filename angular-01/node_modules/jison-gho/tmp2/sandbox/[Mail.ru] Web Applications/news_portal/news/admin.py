from django.contrib import admin
from news.models import Article, Like, Tag
from comments.models import Comment

class CommentInLine(admin.TabularInline):  # editting connected models: can be also StackedInline etc.
    model = Comment
    extra = 2  # provide fields for 3 comments (2 extra)

# class LikeInLine(admin.TabularInline):
#     model = Like
#     extra = 2

class ArticleAdmin(admin.ModelAdmin):  # customize admin UI for creating new article
    fieldsets = [
        (None, {'fields': ['author', 'title', 'text', 'is_published']}),
    ]
    inlines = [CommentInLine, ]
    list_display = ('pk', 'pub_date', 'title', 'is_published')
    list_filter = ['pub_date']
    search_fields = ['title', 'text']

admin.site.register(Article, ArticleAdmin)
admin.site.register(Like)
admin.site.register(Tag)

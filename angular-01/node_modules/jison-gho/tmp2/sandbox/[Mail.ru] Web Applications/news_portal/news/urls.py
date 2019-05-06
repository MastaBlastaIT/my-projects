from django.conf.urls import url
import news.views
from django.contrib.auth.decorators import login_required

urlpatterns = [
     url(r'^$', news.views.NewsListView.as_view(), name="list"),
     url(r'^page/(?P<page>\d+)/$', news.views.NewsListView.as_view()),
     url(r'^create/$', news.views.ArticleCreate.as_view(), name="create"),  # login required - via MixIn (see views)
     url(r'^edit/(?P<pk>\d+)/$', login_required(news.views.ArticleUpdate.as_view()), name="update"),  # login required - via decorator
     url(r'^(?P<pk>\d+)/$', news.views.NewsDetail.as_view(), name="detail"),  # pk - db id of model
     url(r'^like/(?P<content_type_id>\d+)/(?P<pk>\d+)/$', news.views.apply_like, name="like"),
]
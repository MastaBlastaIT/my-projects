from django.conf.urls import url
import hello.views

urlpatterns = [
     url(r'^(?P<id>\d+)/$', hello.views.show_views),  # http://127.0.0.1:8000/hello/1/?name=petr
]
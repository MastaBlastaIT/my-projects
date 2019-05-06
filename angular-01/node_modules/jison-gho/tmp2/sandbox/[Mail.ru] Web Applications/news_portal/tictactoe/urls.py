from django.conf.urls import url
from .views import new_invitation, accept_invitation, game_detail, game_list, game_move

urlpatterns = [
    url(r'^$', game_list, name="list"),
    url(r'^invite/$', new_invitation, name="invite"),
    url(r'^accept_invite/(?P<pk>\d+)/$', accept_invitation, name="accept_invite"),
    url(r'^game/(?P<pk>\d+)/$', game_detail, name="game"),
    url(r'^game_move/(?P<pk>\d+)/$', game_move, name="move"),
]

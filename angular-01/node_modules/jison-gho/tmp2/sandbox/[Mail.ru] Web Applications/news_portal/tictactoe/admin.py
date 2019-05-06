from django.contrib import admin
from .models import Game, Move, Invitation


class MoveInLine(admin.TabularInline):
    model = Move
    readonly_fields = ('timestamp',)
    extra = 3

class GameAdmin(admin.ModelAdmin):
    readonly_fields = ('last_active',)  # activate in field set explicitly due to auto_now=True
    fieldsets = [
        ("General info", {'fields':['players', 'first_player_id', 'board_size', 'last_active']}),
        ("Status info", {'fields':['status', 'next_to_move']}),
        ("Result", {'fields':['is_draw', 'winner']}),
    ]
    inlines = [MoveInLine]

    list_display = ['id', 'next_to_move', 'board_size', 'start_time']
    list_filter = ['players', 'start_time', 'last_active']


admin.site.register(Game, GameAdmin)
admin.site.register(Move)
admin.site.register(Invitation)

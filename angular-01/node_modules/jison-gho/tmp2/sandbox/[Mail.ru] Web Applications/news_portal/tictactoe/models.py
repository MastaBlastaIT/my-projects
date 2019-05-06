from django.db import models
from django.conf import settings
from django.core.urlresolvers import reverse
from django.core.validators import MinValueValidator, ValidationError


# -------------- #
#   INVITATION   #
# -------------- #

class Invitation(models.Model):
    user_from = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="invitations_sent")
    user_to = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="invitations_received",
                                verbose_name="User to invite", help_text="Please select user you want to invite")
    message = models.CharField("Optional message", max_length=300, blank=True, default="You are invited!")
    timestamp = models.DateTimeField(auto_now_add=True)
    is_opponent_first = models.BooleanField("Invite opponent to move first", default=False)  # first to move?


# ------------- #
#     GAME      #
# ------------- #

GAME_STATUS_CHOICES = [('A', 'Active'), ('F', 'Finished')]

FIRST_PLAYER_MOVE = 'X'
SECOND_PLAYER_MOVE = 'O'


class GameManager(models.Manager):
    def games_for_user(self, user):
        """Return a query set of games the user participates in."""
        return super().get_queryset().filter(players__id__contains=user.id)

    def new_game(self, invitation):
        """Start new game from an invitation"""
        game = Game(next_to_move=invitation.user_to if invitation.is_opponent_first else invitation.user_from,
                    first_player_id=invitation.user_to.id if invitation.is_opponent_first else invitation.user_from.id)
        game.save()
        game.players.add(invitation.user_to)  # add value to M2M field
        game.players.add(invitation.user_from)
        return game


class Game(models.Model):
    players = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="games_first_player")
    first_player_id = models.IntegerField()
    start_time = models.DateTimeField(auto_now_add=True)
    board_size = models.IntegerField(default=3)

    next_to_move = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="games_to_move")
    last_active = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=1, default='A',
                              choices=GAME_STATUS_CHOICES)

    is_draw = models.BooleanField(default=False)
    winner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="games_winner", blank=True, null=True)

    objects = GameManager()

    class Meta:
        ordering = ("-last_active",)

    def get_absolute_url(self):
        return reverse('tictactoe:game', args=[self.id, ])

    def __str__(self):
        return ' '.join(['id:', str(self.id), 'players:', ' vs '.join(self.get_players())])

    def as_board(self):
        """Return board as list of lists based on current status of moves.
        The size of matrix is board_size x board_size."""
        board = [['' for _ in range(self.board_size)] for _ in range(self.board_size)]
        for i, move in enumerate(self.move_set.all()):
            board[move.y][move.x] = FIRST_PLAYER_MOVE if i%2==0 else SECOND_PLAYER_MOVE
        return board

    def latest_move(self):
        return self.move_set.latest()

    def is_users_move(self, user):
        return self.next_to_move == user

    def is_empty(self, x, y):
        """Ensure that the cell (x, y) is empty"""
        return not self.move_set.filter(x=x, y=y).exists()

    def create_move(self):
        """Returns Move instance connected to the current game."""
        return Move(game=self, player=self.next_to_move)

    def toggle_next_player(self):
        self.next_to_move = self.players.exclude(id=self.next_to_move.id)[0] or self.next_to_move

    def update_status(self, latest_move):
        """Return status of the game it should after the `latest_move`."""
        self.status = "A"
        board = self.as_board()
        x, y = latest_move.x, latest_move.y
        is_move_in_game = True
        if not(board[y][x]): # If latest_move is not part of move_set - include
            is_move_in_game = False
            # self.move_set.add(latest_move)  # requires latest_move to be already persisted in db
            board[y][x] = FIRST_PLAYER_MOVE if self.move_set.count()%2==0 else SECOND_PLAYER_MOVE

        # Check for win state
        # Sufficient to check last move's row, column, and diagonal
        if board[y][0] == board[y][1] == board[y][2] or \
            board[0][x] == board[1][x] == board[2][x]:
            self.status = "F"
            self.is_draw = False
            self.winner = latest_move.player
        if (x==y or abs(x-y)==2) and \
            (board[0][0] == board[1][1] == board[2][2]) or (board[2][0]==board[1][1]==board[0][2]):
            self.status = "F"
            self.winner = latest_move.player

        # Check for draw
        if self.move_set.count()>=(9 if is_move_in_game else 8):
            self.status = "F"
            self.is_draw = True

        return self.status

    def update_after_move(self, move):
        self.toggle_next_player()
        self.update_status(move)

    def get_players(self):
        """Return list of players playing the game"""
        players_list = [u.username for u in self.players.all()]
        if len(players_list)==1:
            players_list.append(players_list[0])  # playing against yourself

        return players_list

    def get_opponents(self, user):
        """Return list of opponents"""
        assert user in self.get_players()
        if self.players.count()==1:
            return [self.players.all()[0],]  # playing against yourself
        return [u for u in self.players.exclude(user)]


class Move(models.Model):
    game = models.ForeignKey(Game, related_name="move_set")
    x = models.IntegerField(validators=[MinValueValidator(0), ])
    y = models.IntegerField(validators=[MinValueValidator(0), ])
    player = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="moves")
    timestamp = models.DateTimeField(auto_now_add=True)

    def clean(self):  # Custom model-level validation
        if max(self.x, self.y) > self.game.board_size - 1:
            raise ValidationError("Exceeded maximum form size")
        super().clean()

    class Meta:
        get_latest_by = "timestamp"
        ordering = ("timestamp", )

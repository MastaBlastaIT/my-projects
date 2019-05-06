from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from .models import Invitation, Game, Move
from .forms import InvitationForm, MoveForm


# -------------- #
#   INVITATION   #
# -------------- #

@login_required
def new_invitation(request):
    if request.method == 'POST':
        invitation = Invitation(user_from=request.user)
        form = InvitationForm(data=request.POST, instance=invitation)
        if form.is_valid():  # else - renders error messages
            form.save()  # to model, then to db
            return redirect('news:list')  # shortcut for HttpResponseRedirect(reverse('news:list'))
    else:
        form = InvitationForm()

    return render(request, "tictactoe/invitation.html", {'form': form})


@login_required
def accept_invitation(request, pk):
    invitation = get_object_or_404(Invitation, pk=pk)
    if not request.user == invitation.user_to:
        raise PermissionDenied
    if request.method == 'POST':
        if "accept" in request.POST:
            game = Game.objects.new_game(invitation)
            invitation.delete()
            # return HttpResponse("Success!")
            return redirect(game.get_absolute_url())
        else:
            invitation.delete()
            return redirect('news:list')

    return render(request, 'tictactoe/accept_invitation.html', {'invitation': invitation,
                                                                'user_from': invitation.user_from})


# ------------- #
#     GAME      #
# ------------- #

def game_prepare_list_context(request, pk):
    game = get_object_or_404(Game, pk=pk)
    if not(game.players.filter(id=request.user.id).exists()):  # check permissions
        raise PermissionDenied

    opponent = game.players.exclude(id=request.user.id)[0]
    if not(opponent):
        opponent = request.user  # playing against yourself

    my_move = game.is_users_move(request.user)  # boolean
    context = {'opponent': opponent, 'my_move': my_move, 'game': game}
    if game.move_set.count():  # append latest_move, if any moves were made
        context['latest_move'] = game.latest_move()

    return context

@login_required
def game_detail(request, pk):
    context = game_prepare_list_context(request, pk)
    if context['my_move']:
        return redirect("tictactoe:move", pk=pk)

    return render(request, template_name='tictactoe/game.html', context=context)


@login_required
def game_move(request, pk):
    context = game_prepare_list_context(request, pk)
    game = context['game']

    if request.method == 'POST':
        form = MoveForm(data=request.POST, instance=game.create_move())

        context['form'] = form
        if form.is_valid():  # go to render(request, ...) if throwing errors
            move = form.instance  # return obj instance
            game.update_after_move(move)
            form.save()  # save only after successful move
            game.save()
            return redirect('tictactoe:game', pk=pk)
    else:
        context['form'] = MoveForm()

    return render(request, template_name='tictactoe/move.html', context=context)


@login_required
def game_list(request):
    user_games = Game.objects.games_for_user(request.user)
    active_games = user_games.filter(status="A")
    finished_games = user_games.filter(status="F")
    waiting_games = active_games.filter(next_to_move=request.user)
    active_games = active_games.exclude(next_to_move=request.user)
    context = {'waiting_games': waiting_games[:3],
               'active_games': active_games[:3],
               'finished_games': finished_games[:3]}

    return render(request, "tictactoe/list_snippet.html", context)

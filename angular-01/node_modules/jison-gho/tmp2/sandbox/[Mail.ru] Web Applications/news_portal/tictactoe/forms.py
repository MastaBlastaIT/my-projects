from django import forms
from .models import Invitation, Move
from django.core.exceptions import ValidationError


class InvitationForm(forms.ModelForm):
    class Meta:
        model = Invitation
        fields = "__all__"  # select model fields for the form
        exclude = ('user_from',)


class MoveForm(forms.ModelForm):
    class Meta:
        model = Move
        exclude = ('game', 'player',)

    def clean(self):
        game = self.instance.game
        self.cleaned_data['x'] -= 1
        self.cleaned_data['y'] -= 1
        if not game or \
                not game.status == 'A' or \
                not game.is_empty(self.cleaned_data['x'], self.cleaned_data['y']):
            raise ValidationError('Illegal move (cell not empty or game not active)')
        return super().clean()

from django.contrib.auth.models import User
from django.views.generic import CreateView
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.urlresolvers import reverse_lazy


class SignUpView(CreateView):
    template_name = 'signup.html'
    form_class = UserCreationForm
        # can override as shown here http://stackoverflow.com/questions/26850164/django-placeholders#answer-26850981
    success_url = reverse_lazy('news:list')



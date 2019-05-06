from django.shortcuts import render
from django.views.generic import FormView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import resolve_url

from .forms import ReportErrorForm


class TechsupportView(FormView):
    template_name = 'techsupport/report_error.html'
    form_class = ReportErrorForm
    success_url = "/"

    def form_valid(self, form):
        return super().form_valid(form)

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        self.form = self.form_class(request.POST or None)
        self.success_url = request.POST.get('error_url') or "/"
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['error_form'] = self.form
        return context




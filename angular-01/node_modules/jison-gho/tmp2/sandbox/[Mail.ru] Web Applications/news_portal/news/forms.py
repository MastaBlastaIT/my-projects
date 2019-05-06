from django import forms
from .models import Article, Tag

class ArticleListForm(forms.Form):
    search = forms.CharField(required=False)
    sort_field = forms.ChoiceField(choices=(('id','ID'), ('pub_date','Дата'),
                                            ('title','Название'),('rating','Лайки')), required=False)

    # def clean_search(self):
    #     search = self.cleaned_data.get('search')
    #     # raise forms.ValidationError("Я не хочу искать и сортировать, уходи!")
    #     return search

#
# class ArticleCreateForm(forms.Form):
#     title = forms.CharField(max_length=255)
#     text = forms.CharField(widget=forms.Textarea)
#     tags = forms.ModelMultipleChoiceField(queryset=Tag.objects.all())
#     is_published = forms.BooleanField(widget=forms.CheckboxInput, label="Опубликовать?")
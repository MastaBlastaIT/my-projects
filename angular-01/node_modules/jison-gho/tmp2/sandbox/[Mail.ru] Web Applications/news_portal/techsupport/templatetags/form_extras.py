# http://stackoverflow.com/questions/31569563/get-the-type-of-field-in-django-template
from django import template

register = template.Library()

@register.filter(name='field_type')
def field_type(field):
    return field.field.widget.__class__.__name__
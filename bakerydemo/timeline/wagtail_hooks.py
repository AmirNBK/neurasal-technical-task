# timeline/wagtail_hooks.py

from django.urls import reverse,re_path

from wagtail.admin.menu import MenuItem
from wagtail.core import hooks

from .views import timeline_view


@hooks.register('register_admin_urls')
def urlconf_time():
    return [
        re_path(r'^timeline/$', timeline_view, name='timeline'),
    ]


@hooks.register('register_admin_menu_item')
def register_timeline_menu_item():
    return MenuItem(
        'Timeline',
        reverse('timeline'),
        classnames='icon icon-time',
        order=10000 # very last
    )
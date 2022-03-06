from django.urls import path,re_path
from .import views
urlpatterns = [
    path("",views.home,name="home"),
    path("settings/",views.settings,name="settings"),
    path("profile/",views.profile,name="profile"),
    path("logout/",views.logout_view,name="logout"),
    path("play/<str:category>/<str:difficulty>/<str:type>/<str:game_mode>/",views.play,name="play"),
    path("add_question/",views.add_question,name="add_question"),
]




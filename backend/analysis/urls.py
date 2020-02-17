from django.urls import path
from . import views

app_name = "analysis"

urlpatterns = [path("word2vec", views.Word2VecAPI.as_view(), name="word2vec")]

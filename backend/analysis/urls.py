from django.urls import path
from . import views

app_name = "analysis"

urlpatterns = [
    path("fasttext/simliarity", views.Similarity.as_view(), name="simlarity"),
    path("fasttext/analogies", views.analogy.as_view(), name="analogies"),
    path("fasttext/visualize", views.visualize.as_view(), name="visualize"),
]

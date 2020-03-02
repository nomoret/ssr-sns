from django.urls import path
from . import views

app_name = "analysis"

urlpatterns = [
    path("fasttext/simliarity", views.Similarity.as_view(), name="simlarity"),
    path("fasttext/analogies", views.Analogy.as_view(), name="analogies"),
    path("fasttext/visualize", views.Visualize.as_view(), name="visualize"),
]

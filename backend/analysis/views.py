from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from konlpy.tag import Okt
from sklearn.decomposition import PCA
from matplotlib import font_manager, rc
import os
import fasttext
import matplotlib.pyplot as plt

font_name = font_manager.FontProperties(fname=settings.FONT_PATH).get_name()
rc("font", family=font_name)


model = fasttext.load_model(settings.FAST_TEXT_MODEL_PATH)
tokenizer = Okt()


words = [
    "apple",
    "bananan",
    "orange",
]


class Similarity(APIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        print(request.user)
        try:
            query = request.GET["query"]
            k = request.GET["k"]
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        tokens = tokenizer.pos(query)
        # print(tokens)
        neighbors = model.get_nearest_neighbors(query, int(k))
        # print(neighbors)
        result = {"query": tokens, "result": neighbors}
        print(result)
        return Response(data=result, status=status.HTTP_200_OK)


class analogy(APIView):
    def get(self, request, format=None):
        try:
            query = request.GET["query"]
            k = request.GET["k"]
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        print(tokenizer.pos(query))
        result = model.get_nearest_neighbors(query, int(k))

        return Response(data=result, status=status.HTTP_200_OK)


class visualize(APIView):
    # def post(self, request, format=None):
    #     pca = PCA(n_components=2)

    #     xys = pca.fit_transform([model.get_word_vector(word) for word in words])

    #     xs = xys[:, 0]
    #     ys = xys[:, 1]
    #     plt.figure(figsize=(18, 10))
    #     plt.scatter(xs, ys, marker="o")

    #     print(xs)
    #     print(ys)
    #     for i, v in enumerate(words):
    #         plt.annotate(v, xy=(xs[i], ys[i]))
    #     img_path = settings.MEDIA_ROOT + "/fig1.png"
    #     plt.savefig(img_path, dpi=300)
    #     return Response(data=img_path, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        print(request.data["data"])
        req_words = request.data["data"]

        pca = PCA(n_components=2)

        new_words = [word["text"] for word in req_words]

        xys = pca.fit_transform(
            [model.get_word_vector(word["text"]) for word in req_words]
        )

        xs = xys[:, 0]
        ys = xys[:, 1]

        result = {"x": xs, "y": ys, "text": new_words}
        return Response(data=result, status=status.HTTP_200_OK)

# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import fasttext

model = fasttext.load_model("USER_MODEL_PATH")


class Word2VecAPI(APIView):
    def get(self, request, format=None):
        try:
            query = request.GET["query"]
            k = request.GET["k"]
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        result = model.get_nearest_neighbors(query, int(k))
        print(result)
        return Response(data=result, status=status.HTTP_200_OK)

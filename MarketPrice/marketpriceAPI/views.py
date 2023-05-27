# from django.shortcuts import render
from django.db.models import Sum
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status

from . models import Product
from . serializers import ProductSerializer

import random
# Create your views here.

@api_view(['GET'])
def index(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def search_products(request, product_name:str):
    # products = Product.objects.filter(price__gte=300.0)
    products = Product.objects.filter(name__icontains=product_name)
    if products.count() != 0:
        min_price_product= ProductSerializer(products[0]).data
        max_price_product = ProductSerializer(products[products.count()-1]).data
        recommendations_num = 5
        recommendations_list=[]
        for _ in range(recommendations_num):
            recommendations_list.append(ProductSerializer(products[random.randint(0,products.count()-1)]).data)

        return Response({
            'min_price_product':min_price_product,
            'max_price_product':max_price_product,
            'min_price':products[0].price,
            'max_price':products[products.count()-1].price,
            'avg_price':round(products.aggregate(total=Sum('price')).get('total')/products.count(), 2),
            'items_looked_up':products.count(),
            'other_recommendations':recommendations_list,
        }, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # serializer = ProductSerializer(products, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)
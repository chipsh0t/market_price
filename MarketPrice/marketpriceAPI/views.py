# from django.shortcuts import render
from django.db.models import Avg
from django.contrib.auth import login,authenticate,logout
# from django.contrib.auth.password_validation import validate_password
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.authentication import SessionAuthentication # IsAuthenticated,
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ValidationError

from . models import Product, User
from . serializers import ProductSerializer, UserSerializer, UserRegisterSerializer, UserLoginSerializer
# from .validators import validate_password

import random
# Create your views here.

# User authentication views start

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username',None)
    password = request.data.get('password',None)
    confirmation = request.data.get('confirmation',None)
    if not username or len(username)==0:
        return Response({"username":["Username can`t be blank !"]}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username = username).exists():
        return Response({"username":["This username is taken!"]}, status=status.HTTP_400_BAD_REQUEST)

    if not password or len(password)<6:
        return Response({"password":["Your password is too short !"]}, status=status.HTTP_400_BAD_REQUEST)
    
    if password != confirmation:
        return Response({"password":["Please correctly confirm your password !"]}, status=status.HTTP_400_BAD_REQUEST)
    
    register_serializer = UserRegisterSerializer(data=request.data)
    # new_user_serializer = UserSerializer(data=request.data)
    if register_serializer.is_valid():
        user = register_serializer.create(request.data)
        if user:
            user_serializer = UserSerializer(user)
            return Response(user_serializer.data,status=status.HTTP_201_CREATED)
    else:
        # new_user.errors['password'] = 'bruh'
        return Response(register_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    
    #try creating new user
    # try:
    #     pass
    # except:
    #     pass

    # login(request,new_user)



# {
#   "username":"user1",
#    "password":"12345678",
#     "confirmation":"12345678"
# }



@api_view(['POST'])
@authentication_classes([SessionAuthentication])
def login_user(request):
    data = request.data
    username = data.get('username',None)
    password = data.get('password',None)

    if not username:
        return Response({"username":["Username can`t be blank !"]}, status=status.HTTP_400_BAD_REQUEST)

    
    if not password:
        return Response({"password":["Please enter your password !"]}, status=status.HTTP_400_BAD_REQUEST)
    
    login_serializer = UserLoginSerializer(data=request.data)

    if login_serializer.is_valid():
        user = login_serializer.check_user(request.data)
        user_serializer = UserSerializer(user)
        login(request,user)
        return Response(user_serializer.data,status=status.HTTP_200_OK)
        

# {
#   "username":"user1",
#    "password":"12345678"
# }

@api_view(['POST'])
@permission_classes([AllowAny])
# @authentication_classes()
def logout_user(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

# User authentication views end

@api_view(['GET'])
def index(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def search(request, product_name:str):
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
            'avg_price':round(products.aggregate(average_price=Avg('price')).get('average_price'),2),
            'items_looked_up':products.count(),
            'other_recommendations':recommendations_list,
        }, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # serializer = ProductSerializer(products, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)
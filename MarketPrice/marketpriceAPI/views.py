from django.db.models import Avg,Count  
from django.db import IntegrityError
from django.contrib.auth import login,logout
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.authentication import SessionAuthentication # IsAuthenticated,
from rest_framework.response import Response
from rest_framework import status

from . models import Product, User, Interaction
from . serializers import ProductSerializer, UserSerializer, UserRegisterSerializer, UserLoginSerializer, InteractionSerializer

import numpy as np
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
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

# User authentication views end

@api_view(['GET'])
def index(request):
    #returning top4 viewed items on index page
    queryset_sorted = Product.objects.annotate(interaction_count = Count('interacting_item')).order_by('-interaction_count')[:4]
    serializer = ProductSerializer(queryset_sorted, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search(request, product_name:str):
    products = Product.objects.filter(name__icontains=product_name)
    products_looked_up = products.count()
    if products_looked_up != 0:
        min_price_product= ProductSerializer(products[0]).data
        max_price_product = ProductSerializer(products[products.count()-1]).data
        min_price = min_price_product["price"]
        max_price = max_price_product["price"]
        avg_price = round(products.aggregate(average_price=Avg('price')).get('average_price'),2)

        #finding price ranges for graph
        range_number = 10
        graph_prices = np.linspace(min_price,max_price,range_number)
        graph_prices_coupled = []
        #finding amount of items in each price range
        graph_labels = []
        for i in range(len(graph_prices)-1):
            graph_prices_coupled.append(f'{int(graph_prices[i])}-{int(graph_prices[i+1])}')
            product_count_in_current_range = products.filter(price__gte=graph_prices[i], price__lte=graph_prices[i+1]).count()
            graph_labels.append(product_count_in_current_range)

        #loading recommendations for search page
        less_than_average=[ProductSerializer(product).data for product in products.filter(price__lte=avg_price)][-2:]
        more_than_average=[ProductSerializer(product).data for product in products.filter(price__gte=avg_price)][:2]
        
        return Response({
            'min_price_product':min_price_product,
            'max_price_product':max_price_product,
            'min_price':min_price,
            'max_price':max_price,
            'avg_price':avg_price,
            'items_looked_up':products_looked_up,
            'graph_prices':graph_prices_coupled,
            'graph_labels':graph_labels,
            'search_recommendations':less_than_average+more_than_average,
        }, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def interactions(request):
    interactions = [InteractionSerializer(interaction).data for interaction in Interaction.objects.all()] 
    return Response({'interactions':interactions},
                    status = status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_interaction(request,product_id):
    #getting request data
    user_id = request.user.id

    # if not product_id:
    #     return Response({'detail':'Please correctly provide product id !'}, status=status.HTTP_400_BAD_REQUEST)
    
    #check if both user and product exist in database
    try:
        product_id = int(product_id)
        user = User.objects.get(pk = user_id)
        product = Product.objects.get(pk = product_id)
        interaction_serializer = InteractionSerializer(data={"user":user_id,"product":product_id})
        if interaction_serializer.is_valid():
            try:
                interaction_serializer.save()
            except IntegrityError:
                #interaction object exists
                return Response({'detail':'This interaction already exists !'},status=status.HTTP_400_BAD_REQUEST)
            #successful save
            return Response(interaction_serializer.data,status=status.HTTP_201_CREATED)
    except Exception:
        return Response({'detail':'Product you asked for couldn`t be found !'}, status=status.HTTP_404_NOT_FOUND)

# {"user":"11","product":"12"}

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_page(request):
    user_id = request.user.id
    try:
        user = User.objects.get(pk = user_id)
        interactions = Interaction.objects.filter(user=user)[:4]
        interactions_serializer = InteractionSerializer(interactions, many=True)
        return Response({'interactions':interactions_serializer.data,
                         'profile_recommendations':[]
                        },status=status.HTTP_200_OK)
    except Exception:
        return Response({'detail':'User can`t be found !'}, status=status.HTTP_404_NOT_FOUND)



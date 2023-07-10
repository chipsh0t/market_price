from rest_framework.serializers import ModelSerializer, Serializer, CharField, ValidationError
from django.db import IntegrityError
from django.contrib.auth import authenticate
from .models import Product, User


#serializer for user model
class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields = ('id','username')
        # extra_kwargs = {'password':{'write_only':True}}


class UserRegisterSerializer(Serializer):
    username = CharField()
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username','password')

    def create(self, data):
        password = data.pop('password')
        new_user = User.objects.create(username = data['username'])
        new_user.set_password(password)
        new_user.save()
        return new_user
        

class UserLoginSerializer(Serializer):
    username = CharField()
    password = CharField(write_only = True)

    class Meta:
        model = User
        fields = ('username', 'password')
    
    def check_user(self, data):
        user = authenticate(username = data['username'], password=data['password'])
        if not user:
            raise ValidationError('No such user exists !')
        return user


#serializer for product model
class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields ='__all__'
    
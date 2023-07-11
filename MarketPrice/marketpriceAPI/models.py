from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):

    def __str__(self) -> str:
        return f'{self.username}'


class Product(models.Model):
    class Meta:
        ordering = ['price']

    productURL = models.URLField()
    imageURL = models.URLField()
    name = models.TextField()
    price = models.FloatField()

    def __str__(self) -> str:
        return f'{self.name}'
    

#through table to store user-product interactions
class Interaction(models.Model):
    class Meta:
        ordering = ['-interaction_date']
        constraints = [
            models.UniqueConstraint(fields=['user','product'], name='unique_interaction')
        ]

    user = models.ForeignKey('User', related_name='interacting_user', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', related_name='interacting_item', on_delete=models.CASCADE)
    interaction_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.user} clicked on {self.product}, date: {self.interaction_date}'
from django.db import models

# Create your models here.

class Product(models.Model):
    class Meta:
        ordering = ['price']

    productURL = models.URLField()
    imageURL = models.URLField()
    name = models.TextField()
    price = models.FloatField()

    def __str__(self) -> str:
        return f'prodURL: {self.productURL},\n image url:{self.imageURL},\n name:{self.name} price: {self.price},\n'
    


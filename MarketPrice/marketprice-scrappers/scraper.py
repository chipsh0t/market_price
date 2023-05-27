import selenium
from selenium import webdriver
import django
import os
import sys
import logging

#import product 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MarketPrice.settings')
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
django.setup()
from marketpriceAPI.models import Product


with open('mockdata.txt', mode='r', encoding='utf-8') as file:
    lines = file.readlines()

model_data_blocks = [lines[i:i+3] for i in range(0,len(lines),3)] 
for block in model_data_blocks:
        imageURL,productURL,name,price = "","","",""
        urls = block[0].split(' : ')
        imageURL,productURL = urls[1].strip(),urls[2].strip()
        name = block[1].split(' : ')[1].strip()
        price = block[2].split(' : ')[1].strip()[:-1]
        
        try:
            prod = Product(productURL=productURL,imageURL=imageURL,name=name,price=float(price))
            prod.save()
        except Exception as e:
            logging.error("Failed to create a product!!!", str(e))

# with open('testoutput.txt', mode='w', encoding='utf-8')as file:
#     for prod in l:
#          file.write(f'{prod}\n')
          





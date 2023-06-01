# import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import threading
# import time
# from multiprocessing import Process

import django
import os
import sys
import logging

#import product 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MarketPrice.settings')
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
django.setup()
from marketpriceAPI.models import Product


# with open('mockdata.txt', mode='r', encoding='utf-8') as file:
#     lines = file.readlines()

# model_data_blocks = [lines[i:i+3] for i in range(0,len(lines),3)] 
# for block in model_data_blocks:
#         imageURL,productURL,name,price = "","","",""
#         urls = block[0].split(' : ')
#         imageURL,productURL = urls[1].strip(),urls[2].strip()
#         name = block[1].split(' : ')[1].strip()
#         price = block[2].split(' : ')[1].strip()[:-1]
        
#         try:
#             prod = Product(productURL=productURL,imageURL=imageURL,name=name,price=float(price))
#             prod.save()
#         except Exception as e:
#             logging.error("Failed to create a product!!!", str(e))

# with open('testoutput.txt', mode='w', encoding='utf-8')as file:
#     for prod in l:
#          file.write(f'{prod}\n')


# class ScrapedProduct :
#     def __init__(self,link,name,price,img):
#         self.link=link
#         self.name=name
#         self.price=price
#         self.img=img
    
#     def __str__(self):
#         return f"{self.link}!!split!!{self.img}!!split!!{self.name}!!split!!{self.price}\n"
    
def dr(driver):
    try:
        elem = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "close-popup")) #This is a dummy element
        )
        elem.send_keys(Keys.RETURN)
  
        cookies=driver.find_element(By.CLASS_NAME, "border-radius-12")
        cookies.click()
    except:
        print("no baners")
    ##link=driver.find_element(By.CSS_SELECTOR, "#searchProducts > div.m-0 > div > div:nth-child(1) > a")
pages=10
def get_links(driver): 
    links=[]
    for j in range(pages):
        for i in range(30): 
           try:
               link = WebDriverWait(driver, 2).until(
                   EC.presence_of_element_located((By.CSS_SELECTOR, f"#searchProducts > div.m-0 > div > div:nth-child({i}) > a")) #This is a dummy element
               )
              
               print(i)
               l=link.get_attribute("href")
               print(l)
               links.append(l)
           except :
               print("no a tag")
        driver1.get(f"https://www.mymarket.ge/ka/search/1064/iyideba-teqnika/?CatID=1064&Page={j+2}")
        # print(j)
    return links
def getData(link,driver):
    driver.get(link)
    try:
        name = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "#width_id > div > div.col-m-7.col-lg-6.px-0.pl-m-15px.pl-lg-15px > div.product-details-content.pl-2px > div.pd-title.position-relative.mt-20px.px-15px.px-md-0 > h1")) #This is a dummy element
        )
        price=driver.find_element(By.CLASS_NAME, "pr-price")
        img_src=driver.find_element(By.CSS_SELECTOR,"#thumbs-gallery-with-two-way-control > div > div > div > div > div > img").get_attribute("src")
    
        # ScrapedProducts.append(ScrapedProduct(link,name.text,price.text,img_src))
        #sb save
        try:
            prod = Product(productURL=link,imageURL=img_src,name=name.text,price=float(price.text[:-1]))
            prod.save()
        except Exception as e:
            logging.error("Failed to create a product!!!", str(e))

    except Exception as e: 
        logging.log('Failed to scrape product !!!', str(e))
prcs=[0,0,0,0]
def thread_job(links,driver,threadid,prcs):
    n=0
    for link in links:
        getData(link,driver)
        n+=1
        prcs[threadid]=round(n*100/(len(links)))
        print(f"thread{threadid} : {prcs[threadid]}%")
        print(f"overall : {round(sum(prcs)/2)}%")
    driver.quit()

if __name__ == '__main__':
    driver1 = webdriver.Chrome()
    driver1.maximize_window() 
    driver1.get("https://www.mymarket.ge/ka/search/1064/iyideba-teqnika/?CatID=1064&Page=1")
    dr(driver1)
    links=get_links(driver1)
    driver2 = webdriver.Chrome()
    driver2.maximize_window() 

   # driver3 = webdriver.Chrome()
   # driver3.maximize_window() 


    #driver4 = webdriver.Chrome()
    #driver4.maximize_window() 
    #dr(driver2)
    #dr(driver3)
    #dr(driver4)
 

    length=len(links)
    l1=links[:int(length/2)]
    l2=links[int(length/2):]
    #l3=links[int(length*2/4):int(length*3/4)]
   # l4=links[int(length*3/4):]
    thread1 = threading.Thread(target=thread_job,args=(l1,driver1,0,prcs)) 
    thread1.start()
    thread2 = threading.Thread(target=thread_job,args=(l2,driver2,1,prcs))
    thread2.start()
   # thread3 = threading.Thread(target=thread_job,args=(l3,driver3,2,prcs)) 
    #thread3.start()
    #thread4 = threading.Thread(target=thread_job,args=(l4,driver4,3,prcs))
    #thread4.start()


    threads=[thread1,thread2]

    for j in threads:
        j.join()
       
   
    # print("start")
    # f = open("testoutput", "a",encoding="utf-8")
    # for ScrapedProduct in ScrapedProducts:
    #     print(ScrapedProduct)
    #     f.write(ScrapedProduct.__str__())
    # f.close()
    


          





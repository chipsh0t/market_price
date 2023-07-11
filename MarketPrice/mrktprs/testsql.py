import sqlite3

from flask import jsonify
from scrpr import Product

class Resp :
    def __init__(self, name):
        self.con = sqlite3.connect("product.db")
        self.cur = self.con.cursor()
        self.cur.execute(f"SELECT * FROM products WHERE name LIKE '%{name}%'")
        self.prods=self.cur.fetchall()
        self.products=[Product(link,name,price,img) for link,name,price,img in self.prods]
        self.avrg=0
        self.max=0
        self.min=0
    def maxprs(self):
        maxpr=0
        ind=0
        sum=0
        n=1
        for i in range(len(self.products)):
            pr=self.products[i].price[:len(self.products[i].price)-3]
            if pr.isnumeric():
                pr=int(pr)
                sum=sum+pr
                n+=1
                if maxpr<pr:
                    maxpr=pr
                    ind=i
        self.avrg=sum/n
        rsp=self.products[ind] 
        self.max=int(rsp.price[:len(rsp.price)-3])
        return rsp
    def minprs(self):
        minpr=1000000000
        minindx=0
        for i in range(len(self.products)):
            pr=self.products[i].price[:len(self.products[i].price)-3]
            if pr.isnumeric():
                pr=int(pr)
                if minpr>pr:
                    minpr=pr
                    minindx=i
          
            
        rsp=self.products[minindx]        
        self.min=int(rsp.price[:len(rsp.price)-3])
        return rsp  
    def recoms(self):
        if len(self.products)>5:
            return self.products[:5]
        return self.products

    
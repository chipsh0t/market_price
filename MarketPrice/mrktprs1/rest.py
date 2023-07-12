#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask, jsonify, request
from flask_cors import CORS,cross_origin
import sqlite3
from testsql import Product, Resp
app = Flask(__name__)
CORS(app)
con = sqlite3.connect("product.db")
cur = con.cursor()
@app.route('/getone', methods=['GET'])
def getone():
    args = request.args
    fr=int(args.get("to"))-2
    to=int(args.get("to"))
    
    con = sqlite3.connect("product.db")
    cur = con.cursor()
    cur.execute(f"SELECT link, name, price, img FROM (SELECT ROW_NUMBER()OVER ( ORDER BY name) RN, link, name, price, img  from products ) WHERE RN>{fr}  and RN<{to}")
    pr=cur.fetchall()
    prods=[Product(link,name,price,img) for link,name,price,img in pr]
    return jsonify(prods[0].todict())
@app.route('/search', methods=['GET'])
def search():
    args = request.args
    resp=Resp(args.get("name"))
    maxpritem=resp.maxprs()
    minpritem=resp.minprs()
    maxprs=resp.max
    minpr=resp.min
    avrg=resp.avrg
    recs=resp.recoms()
    return jsonify({
        "min_price_product":
        maxpritem.todict(),
    "max_price_product": minpritem.todict(),
    "min_price" :minpr,
    "max_price" :maxprs,
    "avg_price" :avrg,
    "items_looked_up" :len(resp.products),
    "other_recommendations":[x.todict() for x in recs
    ]
    }
    )
    
    






@app.route('/')
def index():
    return jsonify({
         "min_price_product":{
        "id":"4",
        "productURL":"https://www.mymarket.ge/ka/pr/28718984/teqnika/kompiuterebi-aqsesuarebi/Laptop-kompiuterebi/DELL-i7-6-Taoba-8GB-DDR4--128GB-SSD--2-videokartiT?OfferType=SuperVip",
        "imageURL":"https://static.my.ge/mymarket/photos/large/0527/28718984_1.jpg?v=1",
        "name":"DELL i7, 6 თაობა/ 8GB DDR4/ 128GB SSD/ 2 ვიდეოკარტით",
        "price":500
    },
    "max_price_product":{
        "id" :"5",
        "productURL":"https://www.mymarket.ge/ka/pr/28718984/teqnika/kompiuterebi-aqsesuarebi/Laptop-kompiuterebi/DELL-i7-6-Taoba-8GB-DDR4--128GB-SSD--2-videokartiT?OfferType=SuperVip",
        "imageURL":"https://static.my.ge/mymarket/photos/large/0527/28718984_1.jpg?v=1",
        "name":"DELL i7, 6 თაობა/ 8GB DDR4/ 128GB SSD/ 2 ვიდეოკარტით",
        "price":500
    },
    "min_price" : 0,
    "max_price" : 0,
    "avg_price" : 0,
    "items_looked_up" :0,
    "other_recommendations":[{
        "id" :"1",
        "productURL":"https://www.mymarket.ge/ka/pr/28718984/teqnika/kompiuterebi-aqsesuarebi/Laptop-kompiuterebi/DELL-i7-6-Taoba-8GB-DDR4--128GB-SSD--2-videokartiT?OfferType=SuperVip",
        "imageURL":"https://static.my.ge/mymarket/photos/large/0527/28718984_1.jpg?v=1",
        "name":"DELL i7, 6 თაობა/ 8GB DDR4/ 128GB SSD/ 2 ვიდეოკარტით",
        "price":500
    },
    {
        "id" :"2",
        "productURL":"https://www.mymarket.ge/ka/pr/28718984/teqnika/kompiuterebi-aqsesuarebi/Laptop-kompiuterebi/DELL-i7-6-Taoba-8GB-DDR4--128GB-SSD--2-videokartiT?OfferType=SuperVip",
        "imageURL":"https://static.my.ge/mymarket/photos/large/0527/28718984_1.jpg?v=1",
        "name":"DELL i7, 6 თაობა/ 8GB DDR4/ 128GB SSD/ 2 ვიდეოკარტით",
        "price":500
    },
    {
        "id" :"3",
        "productURL":"https://www.mymarket.ge/ka/pr/28718984/teqnika/kompiuterebi-aqsesuarebi/Laptop-kompiuterebi/DELL-i7-6-Taoba-8GB-DDR4--128GB-SSD--2-videokartiT?OfferType=SuperVip",
        "imageURL":"https://static.my.ge/mymarket/photos/large/0527/28718984_1.jpg?v=1",
        "name":"DELL i7, 6 თაობა/ 8GB DDR4/ 128GB SSD/ 2 ვიდეოკარტით",
        "price":500
    }]
})
app.run()
from scrpr import Product
import sqlite3

con = sqlite3.connect("product.db")
cur = con.cursor()
cur.execute("SELECT link, name, price, img FROM (SELECT ROW_NUMBER()OVER ( ORDER BY name) RN, link, name, price, img  from products ) WHERE RN>1  and RN<3")
pr=cur.fetchall()
prods=[Product(link,name,price,img) for link,name,price,img in pr]

for p in prods:
    print(p.__str__())
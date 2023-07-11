from scrpr import Product
import sqlite3

f = open("data.txt", "r", encoding="utf-8" )
txt=[]
for x in f:
    d="".join(x.split(" ")[2:])
    txt.append(d[:len(d)-2])
    print(d)
f.close()
products=[]
for i in range(0,len(txt),4):
    products.append(Product(txt[i],txt[i+1],txt[i+2],txt[i+3]))

con = sqlite3.connect("product.db")
cur = con.cursor()
cur.execute("CREATE TABLE products(link text, name text, price text, img text)")
for i in range(len(products)):
    cur.execute("""INSERT INTO products VALUES(?,?, ?,?)""",(products[i].link,products[i].name, products[i].price,products[i].img))
con.commit()
con.close()
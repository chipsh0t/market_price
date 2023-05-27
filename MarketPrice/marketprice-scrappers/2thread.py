# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import threading


class Product:
    def __init__(self, link, name, price, img):
        self.link = link
        self.name = name
        self.price = price
        self.img = img

    def __str__(self):
        return f"link : {self.link}\nname : {self.name}\nprice : {self.price}\nimg_src : {self.img}\n"


class Scraper:
    def __init__(self, pages, link):
        self.pages = pages
        self.link = link
        self.links = []
        self.products = []
        self.prcs = [0, 0, 0, 0]
        self.driver1 = webdriver.Chrome()
        self.driver2 = webdriver.Chrome()

    def dr(self):
        try:
            elem = WebDriverWait(self.driver1, 10).until(
                EC.presence_of_element_located(
                    (By.CLASS_NAME, "close-popup"))  # This is a dummy element
            )
            elem.send_keys(Keys.RETURN)

            cookies = self.driver1.find_element(
                By.CLASS_NAME, "border-radius-12")
            cookies.click()
        except:
            print("no baners")

    # link=driver.find_element(By.CSS_SELECTOR, "#searchProducts > div.m-0 > div > div:nth-child(1) > a")
    def get_links(self):
        for j in range(self.pages):
            for i in range(30):
                try:
                    link = WebDriverWait(self.driver1, 2).until(
                        EC.presence_of_element_located(
                            (By.CSS_SELECTOR, f"#searchProducts > div.m-0 > div > div:nth-child({i}) > a"))  # This is a dummy element
                    )

                    print(i)
                    l = link.get_attribute("href")
                    print(l)
                    self.links.append(l)
                except:
                    print("no a tag")
            self.driver1.get(
                f"https://www.mymarket.ge/ka/search/1064/iyideba-teqnika/?CatID=1064&Page={j+2}")
            print(j)

    def getData(self, link, driver):
        driver.get(link)
        try:
            name = WebDriverWait(driver, 30).until(
                EC.presence_of_element_located(
                    (By.CSS_SELECTOR, "#width_id > div > div.col-m-7.col-lg-6.px-0.pl-m-15px.pl-lg-15px > div.product-details-content.pl-2px > div.pd-title.position-relative.mt-20px.px-15px.px-md-0 > h1"))  # This is a dummy element
            )
            price = driver.find_element(By.CLASS_NAME, "pr-price")
            img_src = driver.find_element(
                By.CSS_SELECTOR, "#thumbs-gallery-with-two-way-control > div > div > div > div > div > img").get_attribute("src")

            self.products.append(
                Product(link, name.text, price.text, img_src)
            )
        except:
            print("SWW")

    def thread_job(self, links, driver, threadid):
        n = 0
        for link in links:
            self.getData(link, driver)
            n += 1
            self.prcs[threadid] = round(n*100/(len(links)))
            # print(f"thread{threadid} : {prcs[threadid]}%")
            print(f"overall : {round(sum(self.prcs)/2)}%")
        driver.quit()

    def scrape(self):

        self.driver1.get(self.link)
        self.dr()
        self.get_links()
        length = len(self.links)
        l1 = self.links[:int(length/2)]
        l2 = self.links[int(length/2):]
        thread1 = threading.Thread(
            target=self.thread_job, args=(l1, self.driver1, 0))
        thread1.start()
        thread2 = threading.Thread(
            target=self.thread_job, args=(l2, self.driver2, 1))
        thread2.start()
        threads = [thread1, thread2]

        for j in threads:
            j.join()

    def save_in_file(self, file):
        f = open(file, "a", encoding="utf-8")
        for product in self.products:
            f.write(product.__str__())
        f.close()

    def save_in_db(self):
        pass


if __name__ == '__main__':
    scraper = Scraper(
        1, "https://www.mymarket.ge/ka/search/1064/iyideba-teqnika/?CatID=1064&Page=1")

    scraper.scrape()
    scraper.save_in_file("data.txt")
    scraper.save_in_db()


from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from pymongo import MongoClient
from time import sleep
import random as r
import string

# Necessary data
website = 'https://englab.herokuapp.com/'
auth_email = 'james@gmail.com'
auth_pass = 'Temp4321'



# necessary html signatures
menuSig = '//*[@id="dropdown-hamburger"]'
signinSig = '/html/body/nav/nav[1]/div[2]/ul/li[1]/a'
signinEmailSig = '//*[@id="email"]'
signinPassSig = '//*[@id="password"]'
submit = '/html/body/main/form/button'
admin = '/html/body/nav/nav[1]/div[2]/ul/li[2]/a'


# Connecting to mongodb
username_db = "james"
password_db = "g2y8txhgesr"
mongo = f'mongodb://{username_db}:{password_db}@pricetracker-shard-00-00.f9njy.mongodb.net:27017,pricetracker-shard-00-01.f9njy.mongodb.net:27017,pricetracker-shard-00-02.f9njy.mongodb.net:27017/priceTracker?ssl=true&replicaSet=atlas-11qc0i-shard-0&authSource=admin&retryWrites=true&w=majority'
client = MongoClient(mongo)
db = client.priceTracker


driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get(website)
sleep(2)
menu = driver.find_element_by_xpath(menuSig)
signin = driver.find_element_by_xpath(signinSig)
menu.click()
sleep(1)
signin.click()
sleep(1)

signin_email = driver.find_element_by_xpath(signinEmailSig)
signin_password = driver.find_element_by_xpath(signinPassSig)
signin_button = driver.find_element_by_xpath(submit)
signin_email.send_keys(auth_email)
signin_password.send_keys(auth_pass)
sleep(0.5)

signin_button.click()
sleep(0.5)
menu = driver.find_element_by_xpath(menuSig)
adminBox = driver.find_element_by_xpath(admin)

menu.click()
sleep(1)

adminBox.click()

scrapeTab = f'/html/body/main/nav/a[4]'
scrapeDom = driver.find_element_by_xpath(scrapeTab)
scrapeDom.click()
sleep(1)
startScrapeButton = '//*[@id="scrap-btn"]'
startDom = driver.find_element_by_xpath(startScrapeButton)
startDom.click()
sleep(4)
status = '//*[@id="status"]'
statusDom = driver.find_element_by_xpath(status)
statusText = statusDom.text

print(statusText)
if statusText == "Scheduling running ✔️":
  print('scheduling started! success')
else:
  print('Failed!')

driver.quit()



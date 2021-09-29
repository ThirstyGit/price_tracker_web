
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
auth_email = 'jimmashuke@gmail.com'
auth_pass = '1234'



# necessary html signatures
menuSig = '//*[@id="dropdown-hamburger"]'
signinSig = '/html/body/nav/nav[1]/div[2]/ul/li[1]/a'
signinEmailSig = '//*[@id="email"]'
signinPassSig = '//*[@id="password"]'
submit = '/html/body/main/form/button'
priceTracking = '/html/body/nav/nav[1]/div[2]/ul/li[2]/a'


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
priceTracking = driver.find_element_by_xpath(priceTracking)

menu.click()
sleep(0.5)

priceTracking.click()
productRandom = f'/html/body/ul[2]/li[{r.randrange(0, 4)}]/div/a[2]'
priceGraphButton = driver.find_element_by_xpath(productRandom)
priceGraphButton.click()
sleep(1)
watchbutton = f'/html/body/div[1]/button'
watchDom = driver.find_element_by_xpath(watchbutton)
watchDom.click()

nameEmail = f'/html/body/div[1]/div[1]/form/input[3]'
priceMin = f'/html/body/div[1]/div[1]/form/input[4]'
buttonDone = f'/html/body/div[1]/div[1]/form/button[1]'

emailBox = driver.find_element_by_xpath(nameEmail)
priceBox = driver.find_element_by_xpath(priceMin)
buttonDom = driver.find_element_by_xpath(buttonDone)
emailBox.send_keys(''.join(r.choice(string.ascii_letters) for _ in range(8)) + "@gmail.com")
priceBox.send_keys("12")
oldCount = db.monitors.count_documents({})

buttonDom.click()

newCount = db.monitors.count_documents({})



if newCount > oldCount:
  print('Monitor database got a new data!! Success')
else:
  print('Failed! Monitor databse is same as before')

driver.quit()



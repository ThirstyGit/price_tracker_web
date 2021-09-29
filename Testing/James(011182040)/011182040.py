from time import sleep
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from pymongo import MongoClient


# Necessary data
main_url = 'https://englab.herokuapp.com/'
email = 'james@gmail.com'
password = 'Temp4321'

# Data for new product.
selector_name = '.game_area_purchase_game_wrapper h1'
selector_price = '.game_purchase_price'
selector_image = '.game_header_image_full'
url = 'https://store.steampowered.com/app/851850/DRAGON_BALL_Z_KAKAROT/'

# xpaths
hamburger_xpath = '//*[@id="dropdown-hamburger"]'
signin_xpath = '/html/body/nav/nav[1]/div[2]/ul/li[1]/a'
signin_email_xpath = '//*[@id="email"]'
signin_password_xpath = '//*[@id="password"]'
signin_button_xpath = '/html/body/main/form/button'
admin_panel_xpath = '/html/body/nav/nav[1]/div[2]/ul/li[2]/a'
new_product_url_xpath = '//*[@id="new-product-url"]'
new_product_name_xpath = '/html/body/main/div/div[1]/form/input[2]'
new_product_price_xpath = '/html/body/main/div/div[1]/form/input[3]'
new_product_image_xpath = '/html/body/main/div/div[1]/form/input[4]'
new_product_button_xpath = '/html/body/main/div/div[1]/form/button'
delete_product_xpath = '/html/body/main/nav/a[2]'
delete_product_input_xpath = '//*[@id="delete-product-input"]'
delete_product_search_xpath = '/html/body/main/div/div[2]/form/button'
delete_product_button_xpath = '/html/body/main/div/div[2]/div/div[1]/button'

# Connecting to mongodb
database_url = 'mongodb://safat:f0tkgjo5rwo@pricetracker-shard-00-00.f9njy.mongodb.net:27017,pricetracker-shard-00-01.f9njy.mongodb.net:27017,pricetracker-shard-00-02.f9njy.mongodb.net:27017/priceTracker?ssl=true&replicaSet=atlas-11qc0i-shard-0&authSource=admin&retryWrites=true&w=majority'
client = MongoClient(database_url)
db = client.priceTracker

# Initializing Driver.
options = Options()
options.headless = True
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

# Going to the page.
driver.get(main_url)

# Go to Sign In page.
hamburger = driver.find_element_by_xpath(hamburger_xpath)
signin = driver.find_element_by_xpath(signin_xpath)
hamburger.click()
signin.click()
# Sign In.
signin_email = driver.find_element_by_xpath(signin_email_xpath)
signin_password = driver.find_element_by_xpath(signin_password_xpath)
signin_button = driver.find_element_by_xpath(signin_button_xpath)
signin_email.send_keys(email)
signin_password.send_keys(password)
signin_button.click()
# Go to admin panel
hamburger = driver.find_element_by_xpath(hamburger_xpath)
admin_panel = driver.find_element_by_xpath(admin_panel_xpath)
hamburger.click()
admin_panel.click()
# Insert new data.
new_product_url = driver.find_element_by_xpath(new_product_url_xpath)
new_product_name = driver.find_element_by_xpath(new_product_name_xpath)
new_product_price = driver.find_element_by_xpath(new_product_price_xpath)
new_product_image = driver.find_element_by_xpath(new_product_image_xpath)
new_product_button = driver.find_element_by_xpath(new_product_button_xpath)
new_product_url.send_keys(url)
new_product_name.send_keys(selector_name)
new_product_price.send_keys(selector_price)
new_product_image.send_keys(selector_image)
new_product_button.click()

# Wait for data to be stored in the database.
sleep(5)

# Check if the data has been stored.

query_count = db.scrapes.count_documents({'url': url})


if query_count > 0:
  print('*** Data Input Successful! ***')
else:
  print('*** Data Input unsuccessful! ***')

# Delete data.
delete_product = driver.find_element_by_xpath(delete_product_xpath)
delete_product_input = driver.find_element_by_xpath(delete_product_input_xpath)
delete_product_search = driver.find_element_by_xpath(delete_product_search_xpath)
delete_product.click()
delete_product_input.send_keys('dragon ball')
delete_product_search.click()

# Wait for fetch to work and delete.
sleep(5)
delete_product_button = driver.find_element_by_xpath(delete_product_button_xpath)
delete_product_button.click()
# Wait for data to be deleted from the database.
sleep(5)

query_count = db.scrapes.count_documents({'url': url})


if query_count == 0:
  print('*** Data Delete Successful! ***')
else:
  print('*** Data Delete unsuccessful! ***')

# Quiting the driver.
driver.quit()



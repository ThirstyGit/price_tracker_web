from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:3333")

# dropdown for signin
dropdown1 = driver.find_element_by_xpath('//*[@id="dropdown-hamburger"]')
forsignin = driver.find_element_by_xpath('//*[@id="dropdown"]/li[1]/a')

dropdown1.click()
forsignin.click()
# information for sign in
email = driver.find_element_by_xpath('//*[@id="email"]')
password = driver.find_element_by_xpath('//*[@id="password"]')
signIn = driver.find_element_by_xpath('/html/body/main/form/button')

email.send_keys("arpi@gmail.com")
password.send_keys("1234")
signIn.click()

# trying to go to the profile page for getting new request page
dropdown = driver.find_element_by_xpath('//*[@id="dropdown-hamburger"]')
profile = driver.find_element_by_xpath('//*[@id="dropdown"]/li[1]/a')
dropdown.click()
profile.click()

# loding the new request page
requestpage = driver.find_element_by_xpath('/html/body/div/div[2]/div[4]/a')
requestpage.click()

product_name = driver.find_element_by_xpath('//*[@id="name"]')
website = driver.find_element_by_xpath('//*[@id="website"]')
link = driver.find_element_by_xpath('//*[@id="link"]')
submit = driver.find_element_by_xpath('//*[@id="submit"]')


product_name.send_keys("wine1")
website.send_keys("something1")
link.send_keys("www.s.bd")
submit.click()
print('We are successfully requesting for a new product in the website!')

driver.quit()



from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys

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

old_title = driver.title

email.send_keys("arpi@gmail.com")
password.send_keys("1234")
signIn.click()


new_title = driver.title

if (new_title == old_title):
	print('Bad luck, password didnt match')
else:
	print('We are successfully logging in the website!')


driver.quit()
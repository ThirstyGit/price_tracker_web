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

email = driver.find_element_by_xpath('//*[@id="email"]')
password = driver.find_element_by_xpath('//*[@id="password"]')
signIn = driver.find_element_by_xpath('/html/body/main/form/button')

email.send_keys("james@gmail.com")
password.send_keys("Temp4321")
signIn.click()

# trying to go to the profile page for getting new request page
dropdown2 = driver.find_element_by_xpath('//*[@id="dropdown-hamburger"]')
admin_panel = driver.find_element_by_xpath('//*[@id="dropdown"]/li[2]/a')
dropdown2.click()
admin_panel.click()


product_req = driver.find_element_by_xpath('/html/body/main/nav/a[3]')
accept = driver.find_element_by_xpath('//*[@id="form-output-container"]/div[2]/button[1]')

product_req.click()
accept.click()

print('We are successfully accepting a request !')

driver.quit()



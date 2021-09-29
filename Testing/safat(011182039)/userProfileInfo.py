from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:3333/user")

email = driver.find_element_by_xpath('//*[@id="email"]')
password = driver.find_element_by_xpath('//*[@id="password"]')
signIn = driver.find_element_by_xpath('/html/body/main/form/button')

VarEmail = "tanvir@gmail.com"

old_title = driver.title
email.send_keys(VarEmail)
password.send_keys("Tanvir123456")
signIn.click()

new_title = driver.title

if(old_title == new_title):
    print("Please enter the correct email and password")
else:    
    dropdown = driver.find_element_by_xpath('//*[@id="dropdown-hamburger"]')
    profile = driver.find_element_by_xpath('//*[@id="dropdown"]/li[1]/a')
    dropdown.click()
    profile.click()

    #time.sleep(3)
    name = driver.find_element_by_xpath('/html/body/div/div[2]/div[1]/div[2]/p')
    userEmail = driver.find_element_by_xpath('/html/body/div/div[2]/div[2]/div[2]/p')

    checkname =name.text
    checkEmail = userEmail.text


    if(VarEmail == checkEmail):
        print("For user " + checkname + " email is [ " + checkEmail +" ] Ok")

driver.quit()
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
    edit = driver.find_element_by_xpath('/html/body/div/div[1]/div[4]/a')
    edit.click()

    name = driver.find_element_by_xpath('//*[@id="name"]')
    email = driver.find_element_by_xpath('//*[@id="email"]')
    name.clear()
    email.clear()
    up_name = "Tanvir"
    up_email = "tanvir12@gmail.com"
    name.send_keys(up_name)
    email.send_keys(up_email)
    button = driver.find_element_by_xpath('//*[@id="user-form"]/button')
    button.click()
    time.sleep(3)

    driver.back()
    driver.refresh()

    time.sleep(3)

    resname = driver.find_element_by_xpath('/html/body/div/div[2]/div[1]/div[2]/p')
    resemail = driver.find_element_by_xpath('/html/body/div/div[2]/div[2]/div[2]/p')
   
    checkname = resname.text
    checkemail = resemail.text

    if(up_name == checkname and up_email == checkemail):
        print("Information update successfully")
    else:
        print("An Error occures")


driver.quit()
           
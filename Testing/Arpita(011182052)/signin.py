from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get("http://localhost:3333")

# dropdown for signin
dropdown1 = driver.find_element_by_xpath('//*[@id="dropdown-hamburger"]')
forsignup = driver.find_element_by_xpath('//*[@id="dropdown"]/li[2]/a')

dropdown1.click()
forsignup.click()
# information for sign up
username = driver.find_element_by_xpath('//*[@id="name"]')
email = driver.find_element_by_xpath('//*[@id="email"]')
password = driver.find_element_by_xpath('//*[@id="password"]')
confirmPassword = driver.find_element_by_xpath('//*[@id="confirm-password"]')
signin = driver.find_element_by_xpath('//*[@id="register-form"]/button')

username.send_keys("Arp")
email.send_keys("api@gmail.com")
password.send_keys("1234")
confirmPassword.send_keys("1234")


signin.click()
print("successfully ok!")

driver.quit()
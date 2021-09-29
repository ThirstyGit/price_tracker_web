from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:3333")

searchbar = driver.find_element_by_xpath('//*[@id="search-bar"]')
search = "red"
searchbar.send_keys(search)
searchbar.send_keys(Keys.ENTER)

time.sleep(4)
name1 = driver.find_element_by_xpath('//*[@id="card-container"]/div[1]/p[1]')
name2 = driver.find_element_by_xpath('//*[@id="card-container"]/div[2]/p[1]')

str1 = name1.text
str2 = name2.text

print(" Search products are -> " + str1 +" , " + str2) 

driver.quit()

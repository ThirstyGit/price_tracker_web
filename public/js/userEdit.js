const userForm = document.querySelector('#user-form');
const passwordForm = document.querySelector('#password-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const changeInfo = document.querySelector('#change-info');
const changePassword = document.querySelector('#change-password');
const infoChangeContainer = document.querySelector('#info-change-container');
const passwordChangeContainer = document.querySelector('#password-change-container');



changeInfo.addEventListener('click', event => {
    infoChangeContainer.classList.remove('hidden');
    passwordChangeContainer.classList.add('hidden')
 });
 
 changePassword.addEventListener('click', event => {
    infoChangeContainer.classList.add('hidden');
    passwordChangeContainer.classList.remove('hidden');
 });

 userForm.addEventListener('submit', event=>{

 });
 
const dropdownHamburger = document.querySelector('#dropdown-hamburger');
const dropdown = document.querySelector('#dropdown');

//const searchBar = document.querySelector('#search-bar');

// Open or close dropdown when clicked on hamburger.
dropdownHamburger.addEventListener("click", () => {
    if(window.getComputedStyle(dropdown).opacity === '0') {
       dropdown.style.opacity = 1; 
       dropdown.style.transform = 'translateY(0px)';
       dropdown.style.pointerEvents = 'all';
    }
    else {
       dropdown.style.opacity = 0;
       dropdown.style.transform = 'translateY(-20px)';
       dropdown.style.pointerEvents = 'none';
    }
 })
/*
 // search with enter.
searchBar.addEventListener('keypress', (e) => {
   if(e.keyCode === 13) {
      // getting the domain name out.
      const hostName = window.location.href.split('/')[2];
      window.location.href = `http://${hostName}/search/${searchBar.value}`;
   }
})*/
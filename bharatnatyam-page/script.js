let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY; 
    if (scrollTop > lastScrollTop) {
        
        header.style.transform = "translateY(-100%)"; 
    } else {
       
        header.style.transform = "translateY(0)"; 
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

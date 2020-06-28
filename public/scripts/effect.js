
const icons = document.querySelectorAll('.icon');
icons.forEach (icon => {  
    icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
    });
});

function menuToggle(){
    var nav = document.getElementById('menu-overlay');
    nav.classList.toggle('active');
}

function bodyToggle(){
    var nav = document.getElementById('bodyb');
    nav.classList.toggle('bodyb');
}

var typed = new Typed('.h_text', {
    strings: ['Ищите книги быстрее <br class="br_elem"> вместе с нами'],
    typeSpeed: 90,
});


// Parallax

// var banner = document.getElementById('banner');
// window.onmousemove = function(e){
//     var x = e.clientX/150, y = -e.clientY/100;
//     banner.style.backgroundPositionX = x + 'px';
//     banner.style.backgroundPositionY = y + 'px';
// }
var navLinks = document.getElementById("navLinks")

function showMenu(){
  navLinks.style.right = "0";

}
function hideMenu(){
  navLinks.style.right = "-200px";

}

const buttons = document.querySelectorAll('button');

buttons.forEach( button =>{
    button.addEventListener('click',()=>{
        const faq = button.nextElementSibling;
        const icon = button.children[1];

        faq.classList.toggle('show');
        icon.classList.toggle('rotate');
    })
} )

//login




const aboutButton = document.querySelector('#Pagebutton');
const about = document.querySelector('#aboutPage')
const blurryscreen = document.querySelector('#blurryBackground')

aboutButton.addEventListener('click', (e) => {

    about.style.display = 'none'
    blurryscreen.style.display = 'none'


})
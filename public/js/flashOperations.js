const xButton = document.querySelector("#X");
const flashBanner = document.querySelector("#flash-card");


xButton.addEventListener('click', (event) => {

    flashBanner.style.transform = "translateX(-105%)"

})
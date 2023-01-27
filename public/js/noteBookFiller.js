const form = document.querySelector('#filler');
const button = document.querySelector('#searchButton')
const eng = document.querySelector('#english');
const fr = document.querySelector('#french');
const IdUser = document.querySelector('#userId');


// form.addEventListener("submit", (e) => {

//     e.preventDefault()
//     fetch('http://localhost:3000/home/wordSearch', {
//         method: 'PATCH',
//         body: JSON.stringify({
//             englishW: eng.value,
//             frenchW: fr.value,
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error('Request failed');
//     }, newtworkError => console.log(networkError.message)
//     ).then(jsonResponse => {
//         console.log(jsonResponse);
//     });



// });




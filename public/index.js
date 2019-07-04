// // console.log('working')


let form = document.getElementById('form');
let input = document.getElementById('locationInput');

form.onsubmit = getWeather;

async function getWeather() {
    event.preventDefault()
    let location = input.value

let weather = await fetch(`http://localhost:3001/weather?location=${location}`).then(response => response.text())
console.log(weather)
console.log('worjing')

document.getElementById("info").innerHTML = weather


}



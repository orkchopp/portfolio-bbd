document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        alert('It no work');
    }
});

function getWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
    
    const apiKey = 'dc09c9239910d461bdd17cc4c1d2b9d2';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            let location = data.name;
            let country = data.sys.country;
            let description = data.weather[0].description;
            let temperature = data.main.temp;

            document.getElementById('weather').innerHTML = `
                <h2>${location} - ${country}</h2>
                <p>${description.toUpperCase()}</p>
                <p>${temperature} C</p>`;
        }).catch(error => console.error('Error', error));
};
var button = document.querySelector(".btn")
var inputValue = document.querySelector(".form-input")
var city = document.querySelector(".city")
var temp = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
var uvIndex = document.querySelector(".uvIndex")

var day1Date = document.querySelector(".day1Date")

var myDate = new Date();
var currentMonth = myDate.getMonth() + 1;
var currentDate = myDate.getDate();
var currentYear = myDate.getFullYear();
var date = currentMonth + "/" + currentDate + "/" + currentYear;
console.log(date);

var userCity = document.getElementById("search-input");
var btnInsert = document.getElementById("search-button");
var histories = document.getElementById("history");

var cities = [];
btnInsert.onclick = function (history) {
    history.preventDefault();

    var userCityInput = userCity.value;
    console.log(userCityInput);

    cities = localStorage.getItem(userCityInput);

    if (userCityInput) {
    localStorage.setItem("history", JSON.stringify(userCityInput));
}
    console.log(cities)
    histories.innerHTML = userCityInput;
}





    button.addEventListener('click', function (event) {
        event.preventDefault();

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=imperial&appid=9bb2e2ef36f19c7a13bb8488cc8177f6')
            .then(Response => Response.json())
            .then(data => {
                var cityValue = data['name'];
                var tempValue = data['main']['temp'].toFixed(0);
                var humidityValue = data['main']['humidity'];
                var windValue = data['wind']['speed'].toFixed(0);


                city.innerHTML = cityValue + " (" + date + ")";
                temp.innerHTML = "Temp: " + tempValue + "°F";
                humidity.innerHTML = "Humidity: " + humidityValue + "%";
                wind.innerHTML = "Wind: " + windValue + " MPH";

            })

        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&units=imperial&appid=9bb2e2ef36f19c7a13bb8488cc8177f6')
            .then(Response => Response.json())
            .then(data => {
                for (i = 0; i < 5; i++) {
                    document.getElementById("day" + (i + 1) + "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp).toFixed(0) + "°F";
                }
                for (i = 0; i < 5; i++) {
                    document.getElementById("day" + (i + 1) + "Humidity").innerHTML = "Humidity: " + Number(data.list[i].main.humidity) + "%";
                }

                for (i = 0; i < 5; i++) {
                    document.getElementById("day" + (i + 1) + "Wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(0) + "MPH";
                }

                for (i = 0; i < 5; i++) {
                    document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
                }

                for (i = 0; i < 5; i++) {
                    var myDate = new Date();
                    var currentMonth = myDate.getMonth() + 1;
                    var currentDate = myDate.getDate() + 1 + i;
                    var currentYear = myDate.getFullYear();
                    var date1 = currentMonth + "/" + currentDate + "/" + currentYear;
                    document.getElementById("day" + (i + 1) + "Date").innerHTML = date1;
                }

            })

            .catch(err => alert("Wrong city name!"))




    });


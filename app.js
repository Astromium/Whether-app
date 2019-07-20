window.addEventListener("load", () => {
  let long;
  let latt;
  //const timezone = document.querySelector(".container .timezone h2");
  //const temp = document.querySelector(".temperature");
  //const desc = document.querySelector(".description p");
  const timezone = document.getElementById("title");
  const temp = document.getElementById("temp");
  const desc = document.getElementById("desc");
  const icon = document.getElementById("icon");
  const display = document.querySelector(".wrapper .time p");
  const humidity = document.getElementById("humid");
  const pressure = document.getElementById("pressure");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      latt = position.coords.latitude;
      long = position.coords.longitude;
      console.log(`latt is ${latt}`);
      console.log(`long is ${long}`);
      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/ae8406495037a6e795d9719356a0b214/${latt +
        2},${long + 3}`;
      const api2 = `http://api.openweathermap.org/data/2.5/weather?lat=${latt -
        2}&lon=${long}&APPID=07fc0b6f47e9ecbbbb3f146675dfb3ee`;
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          //desc.textContent = data.currently.summary;
          temp.textContent = `${Math.floor(
            ((data.currently.temperature - 32) * 5) / 9
          )} °C`;
        });
      fetch(api2)
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response);
          timezone.textContent = response.name;
          console.log(response.name);
          desc.textContent = response.weather[0].description.toUpperCase();
          //? set the weather icon
          let iconCode = response.weather[0].icon;
          let url = `http://openweathermap.org/img/w/${iconCode}.png`;
          icon.setAttribute("src", url);
          //! set the humidity , pressure , sunrise and sunset
          let humidValue = response.main.humidity;
          humidity.textContent = `${humidValue}%`;

          let pressureValue = response.main.pressure;
          //! convert  hPa to atm
          pressure.textContent = `${Math.floor(pressureValue * 0.0009869233) +
            1} atm`;

          let sunriseTime = response.sys.sunrise;
          sunrise.textContent = `${timeStampConverter(sunriseTime)}`;

          let sunsetTime = response.sys.sunset;
          sunset.textContent = `${timeStampConverter(sunsetTime)}`;
        });
    });

    function displayTime() {
      const time = new Date();
      let day = time.getDay(),
        month = time.getMonth(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        seconds = time.getSeconds(),
        day2 = time.getDate();

      switch (day) {
        case 1:
          day = "Mon";
          break;
        case 2:
          day = "Tue";
          break;
        case 3:
          day = "Wed";
          break;
        case 4:
          day = "Thu";
          break;
        case 5:
          day = "Fri";
          break;
        case 6:
          day = "Sat";
          break;
        case 7:
          day = "Sun";
          break;
      }

      switch (month) {
        case 0:
          month = "Jan";
          break;
        case 1:
          month = "Feb";
          break;
        case 2:
          month = "Mar";
          break;
        case 3:
          month = "Apr";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "June";
          break;
        case 6:
          month = "July";
          break;
        case 7:
          month = "Aug";
          break;
        case 8:
          month = "Sep";
          break;
        case 9:
          month = "Oct";
          break;
        case 10:
          month = "Nov";
          break;
        case 11:
          month = "Dec";
          break;
      }
      display.textContent = `${day} ${month} ${day2} ${addZero(hour)}:${addZero(
        minute
      )}:${addZero(seconds)}`;
      setTimeout(displayTime, 1000);
    }

    function addZero(i) {
      return (parseInt(i, 10) < 10 ? "0" : "") + i;
    }

    //? converting timestamp into a real date

    function timeStampConverter(n) {
      var date = new Date(n * 1000);
      var sunHour = date.getHours(),
        sunMinute = date.getMinutes();

      var time = `${addZero(sunHour)}:${addZero(sunMinute)}`;
      return time;
    }

    displayTime();
  }
});

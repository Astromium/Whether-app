window.addEventListener("load", () => {
  let long;
  let latt;
  //const timezone = document.querySelector(".container .timezone h2");
  //const temp = document.querySelector(".temperature");
  //const desc = document.querySelector(".description p");
  const timezone = document.getElementById("title");
  const temp = document.getElementById("temp");
  const desc = document.getElementById("desc");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      //console.log(position);
      long = position.coords.latitude;
      latt = position.coords.longitude;
      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/ae8406495037a6e795d9719356a0b214/${latt},${long}`;
      const api2 = `http://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&APPID=07fc0b6f47e9ecbbbb3f146675dfb3ee`;
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          //console.log(data);
          timezone.textContent = data.timezone;
          desc.textContent = data.currently.summary;
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
        });
    });
  }
});

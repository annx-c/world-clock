/* MOSTRAR EL HORARIO DE LAS CIUDADES -- SHOW CITY TIMES */
function updateTime(citiesId) {
  /* OBTENER LOS ELEMENTOS DE LA CIUDAD Y SUS HORARIOS ACTUALES - GET CITY ELEMENTS AND THEIR CURRENT SCHEDULES */
  let cityElement = document.getElementById(citiesId);
  let cityDateElement = cityElement.querySelector(".date-container .date");
  let cityMonthElement = cityElement.querySelector(".month-day .month");
  let cityDayElement = cityElement.querySelector(".month-day .day");
  let cityTimeElement = cityElement.querySelector(
    ".city-time .city-time-current"
  );

  /* MOSTRAR LOS HORARIOS Y CIUDADES - DISPLAY THE TIMES AND CITIES */
  let cityTime = moment().tz(`${citiesId}`);
  cityDateElement.innerHTML = cityTime.format("DD");
  cityMonthElement.innerHTML = cityTime.format("MMM");
  cityDayElement.innerHTML = cityTime.format("ddd");
  cityTimeElement.innerHTML = cityTime.format("HH:mm [<small>]A[</small>]");
}

/* MOSTRAR LA CIUDAD - SHOW CITY */
let currentCityInterval; // Variable para almacenar el ID del intervalo - Variable to store the interval ID
function updateCity(cityTimeZone) {
  function updateCurrentCity() { // Función para actualizar la información de la ciudad seleccionada - Function to update the selected city's information
    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
    }

    let currentCity = moment().tz(cityTimeZone);
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let currentCityName = document.querySelector(".current-time .city");
    let currentCityTime = document.querySelector(".current-hour h2");
    let currentCityDate = document.querySelector(".current-date p");
    currentCityName.innerHTML = cityName;
    currentCityTime.innerHTML = currentCity.format(
      "HH:mm:ss [<small>]A[</small>]"
    );
    currentCityDate.innerHTML = currentCity.format("dddd, MMMM Do YYYY");
  }

  // Limpiar cualquier intervalo existente - Clear any existing interval
  if (currentCityInterval) {
    clearInterval(currentCityInterval);
  }

  updateCurrentCity();
  currentCityInterval = setInterval(updateCurrentCity, 1000);
}

/* LISTAR CIUDAD - LIST CITY */
function listedCity(element) {
  let cityId = element.id;

  /* VERIFICAR SI EL ID DE LA CIUDAD EXISTE - CHECK IF CITY ID EXISTS */
  if (cityId) {
    updateTime(cityId); // Llamar a la función para mostrar la ciudad - Call function to show city
    setInterval(() => updateTime(cityId), 1000);
  }
}

/* OBTENER TODOS LOS ELEMENTOS DE CIUDADES LISTADAS - GET ALL LISTED CITY ELEMENTS */
let listedCityElements = document.querySelectorAll(".listed-city");
listedCityElements.forEach((element) => {
  /* AGREGAR EVENTO CLICK A CADA ELEMENTO DE CIUDAD LISTADA - ADD CLICK EVENT TO EACH LISTED CITY ELEMENT */
  element.addEventListener("click", (event) => {
    let cityTimeZone = event.currentTarget.id;
    updateCity(cityTimeZone);
  });
  listedCity(element); // Llamar a la función listedCity para cada elemento - Call the listedCity function for each element
});

// SELECCIONAR LAS CIUDADES - SELECT CITIES
let citySelectElement = document.querySelector("#cities");

/* AGREGAR EVENTO CHANGE AL SELECTOR DE CIUDADES - ADD CHANGE EVENT TO CITY SELECTOR */
citySelectElement.addEventListener("change", (event) => {
  if (event.target.value.length > 0) {
    let cityTimeZone = event.target.value;
    updateCity(cityTimeZone);
  }
});

/* MOSTRAR EL HORARIO DE LA LOCALIZACIÓN ACTUAL - SHOW THE TIME OF THE CURRENT LOCATION */
let currentLocation = moment.tz.guess();
updateCity(currentLocation);

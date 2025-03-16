/*MOSTRAR EL HORARIO DE LAS CIUDADES -- SHOW CITY TIMES */  
function updateTime(citiesId) {

  /* LAS CIUDADES Y SUS HORARIOS ACTUALES - CITIES AND THEIR CURRENT SCHEDULES */
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



/*MOSTRAR LA CIUDAD -  */
function updateCity(cityTimeZone) {
 
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  console.log(cityTimeZone);
  let currentCity = moment().tz(cityTimeZone);
  
  let currentCityName = document.querySelector(".current-time .city");
  let currentCityTime = document.querySelector(".current-hour h2");
  let currentCityDate = document.querySelector(".current-date p")
  currentCityName.innerHTML = cityName ;
  currentCityTime.innerHTML = currentCity.format("HH:mm:ss [<small>]A[</small>]")
  currentCityDate.innerHTML = currentCity.format("dddd, MMMM Do YYYY");

}

/* LISTAR CIUDAD - LIST CITY */
function listedCity(element) {
  let cityId = element.id;

  /* VERIFICAR SI EL ID DE LA CIUDAD EXISTE - CHECK IF CITY ID EXISTS */
  if (cityId) {
    updateTime(cityId); //Llamar a a funcion mostrar ciudad
    setInterval(() => updateTime(cityId), 1000);
  }
}

/* OBTENER TODOS LOS ELEMENTOS DE CIUDADES LISTADAS - GET ALL LISTED CITY ELEMENTS */
let listedCityElements = document.querySelectorAll(".listed-city");
listedCityElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    let cityTimeZone = event.currentTarget.id;
    updateCity(cityTimeZone);
  });
  listedCity(element); // Llamar a la función listedCity para cada elemento
});

//SELECCIONAR LAS CIUDADES - SELECT CITIES
let citySelectElement = document.querySelector("#cities");

citySelectElement.addEventListener("change", (event) => {
  if (event.target.value.length > 0) {
    let cityTimeZone = event.target.value;
    updateCity(cityTimeZone);
  }
 
});
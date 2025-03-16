/*FUNCION MOSTRAR CIUDAD - FUNCION MOSTRAR CIUDAD */  
function updateTime(citiesId) {
  console.log(`this ${citiesId}`);

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
  listedCity(element);
});

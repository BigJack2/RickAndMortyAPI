//Declaramos la variable que contendra la apli, como esta no cmbia es tipo const
const API = "https://rickandmortyapi.com/api/character";


const getAPI = (url) => {
  //un return es una ejecucion y solo eso como si tuviera break integrado.
  //consume la api es decir la url que se quiere consumir, es una funcion reservada de JS
  //solo puede consumir una api al tiempo
  return fetch(url)
    //prometemos una respuesta y que esta sea traida en json
    //response es una variable reservada que se siempre se debe usar y se puede abreviar como res
    .then((response) => response.json())
    //variable que va a guardar lo que la respuesta en json nos trajo
    //Dentro de los then se invocn funciones no se pone codigo
    .then((datosJson) => {
      //results es el sub Jason que se encuentra en la api que contiene todos los personajes
      cardData(datosJson.results), pagination(datosJson.info);
    })
    //Si al consultar la API algo no fue bien entonces hay error en la api que la da el catch.
    //Este error corresponde a la api no a nuestro codigo
    //poner la variable error en el console ayuda a ver en detalle el error
    .catch((error) => {
      console.log("Error in the API", error);
    });
};


//esta variable esper que le lleguen los datos
const cardData = (data) => {
  //En esta variable cargamos los datos de la tarjeta
  let html = "";
  //Variable ch de character que guardara el personaje
  data.forEach((ch) => {

    let status = "";
    ch.status == "Alive" ? status = "success" : status = "danger";

    html += '<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-4">';
    html += '<div class="card bg-dark text-white h-100">';
    html += `<img src="${ch.image}" class="card-img-top" alt="...">`;
    html += '<div class="card-body">';
    html += `<h5 class="card-title text-center font2"><a href="" class="text-link">${ch.name}</a></h5>`;
    html += `<p class="card-text text-gray"><strong>Species: </strong>${ch.species}</p>`;
    html += `<p class="card-text text-gray"><strong>Gender: </strong>${ch.gender}</p>`;
    html += '</div>';
    html += '<div class="card-footer">';
    html += `<small class="text-${status}">Status - ${ch.status}</small>`;
    html += '</div>';
    html += '</div>';
    html += '</div>';

    //html += '';
  });
  document.getElementById("characters").innerHTML = html;
};


//Paginacion de personajes

const pagination = (info) => {

  //Variables vacias para cuando las opciones de recorrido no tengan mas informacion que mostrar
  //let prevDisabled = "";
  //let nextDisabled = "";
  let html = "";


  //Llama la variable del Json
  //operador ternario que remplaza los if para optimizar codigo
  //el operador ternario no funciona con if anidados
  //info.prev == null ? prevDisabled = "disabled" : prevDisabled = "";

  //Llama la variable del Json
  //operador ternario que remplaza los if para optimizar codigo
  //info.next == null ? nextDisabled = "disabled" : nextDisabled = "";


  //dentro de la clase de bootstrap ponemos la interpolacion de la variable que puede deshabilitar el boton
  //OJO en el onlcik va la funcion que me esta trayendo el Json es decir getAPI
  html += `<li class="page-item ${info.prev == null ? "disabled" : ""}"><a class="btn btn-primary" onclick="getAPI('${info.prev}')"><strong>Prev</strong></a></li>`;
  html += `<li class="page-item ${info.next == null ? "disabled" : ""}"><a class="btn btn-primary" onclick="getAPI('${info.next}')"><strong>Next</strong></a></li>`;

  document.getElementById("pagination").innerHTML = html;
}


//Cuando se ejecuta se evnia la variable de la URL y la funcion la recibe
getAPI(API);
//llama a mis elementos html
const root = document.getElementById('root');
const loader = document.getElementById('contenedor');
const totalPersonajes = document.getElementById('total-personajes');

//para el paginado
const paginaActual = document.getElementById('pagina-actual');
const totalPaginas = document.getElementById('total-paginas');
const proximaPagina = document.getElementById('proximaPagina');
const primeraPagina = document.getElementById('primeraPagina');//aca hay que modificar
const paginaAnterior = document.getElementById('paginaAnterior');
const ultimaPagina = document.getElementById('ultimaPagina');

// para los filtros
const todos = document.getElementById('todos');
const mujeres = document.getElementById('mujeres');
const hombres = document.getElementById('hombres');
const sinGenero = document.getElementById('sinGenero');
const desconocido = document.getElementById('desconocido');

let pagina = 1;
let total = 0;

const getData = async () => {
  const url = `https://rickandmortyapi.com/api/character?page=${pagina}`
  const response = await fetch(url);
  const json = await response.json();
  total = json.info.pages;
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total;
  printData(json.results)
  
    root.classList.remove('esconder');
    loader.classList.add('esconder');
  
  updatePagination()
  data = json;
  return json;
}

let data = {};

const printData = arr => {
  let card = '';
  totalPersonajes.innerHTML = arr.length
  arr.forEach((personaje) => {
    card = card + `
    <div class="col s12 m6 l3">
      <div class="card">
        <div class="card-image">
          <img src=${personaje.image}>
        </div>
        <div class="card-content">
          <p>Nombre: ${personaje.name}</p>
          <p>Género: ${personaje.gender}</p>
          <p>Especie: ${personaje.species}</p>
          <p>Estado: ${personaje.status}</p>
          <p>Origen: ${personaje.origin.name}</p>
          <p>Locación: ${personaje.location.name}</p>
        </div>
        <div class="card-action">
          <a href="#">Ver mas...</a>
        </div>
      </div>
    </div>`
  })
  root.innerHTML = card;
}
//aca hay uno
//eventos de las paginas
const pagination = async promesa => {
  const result = await promesa
  proximaPagina.addEventListener('click', () => {
    pagina += 1;
    getData();
  })
  paginaAnterior.addEventListener('click', () => {
    pagina -= 1;
    getData();
  })
  ultimaPagina.addEventListener('click', () => {
    if(pagina < result.info.pages){
      pagina = result.info.pages
      getData();
    }
  })
  primeraPagina.addEventListener('click', () => {
    if(pagina > 2){
      pagina = 1;
      getData();
    }
  })
}
// aca se realiza la accion del paginado, ir adelante y atras
const updatePagination = () => {
  if(pagina <= 1){
    paginaAnterior.disabled = true;
    primeraPagina.disabled = true;
  } else {
    paginaAnterior.disabled = false;
    primeraPagina.disabled = false;
  }
  if(pagina === total ){
    proximaPagina.disabled = true
    ultimaPagina.disabled = true
  } else {
    proximaPagina.disabled = false
    ultimaPagina.disabled = false
  };
};

//filtrado y eventos de los generos
mujeres.addEventListener('click', () => {
  const arr = data.results;
  let arrMujeres = [];
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].gender === 'Female'){
      arrMujeres.push(arr[i])
    };
  };
  printData(arrMujeres)
});

hombres.addEventListener('click', () => {
  const arr = data.results;
  const arrHombres = arr.filter(personaje => personaje.gender === 'Male');
  printData(arrHombres);
});

sinGenero.addEventListener('click', () =>{
    const arr = data.results;
    const arrsingenero = arr.filter(personaje => personaje.gender === 'Genderless');
    printData(arrsingenero);
});

desconocido.addEventListener('click', () =>{
    const arr =data.results;
    const arrdesconosido = arr.filter(personajes => personajes.gender === 'unknown');
    printData(arrdesconosido);
});

todos.addEventListener('click', () => {
  const arr = data.results;
  printData(arr)
});
pagination(getData());
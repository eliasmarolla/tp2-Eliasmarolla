// apykey = 'feed1c0c';

const inputBusqueda = document.getElementById('inputBusqueda');
const buscarButton = document.getElementById('buscarButton');
const resultado = document.querySelector('.resultados-grilla');

const page = 1;

var db;

function iniciarDB(){
    db = new Dexie('favoritos');
    
    db.version(1).stores({nombre: '_id'});
    db.open().then(refreshView);
    document.body.addEventListener("click", agregarDB);
    
}
function refreshView(){
    db.nombre.toArray().then((listafavoritos)=>{
        console.log('favoritos',listafavoritos);
    })
}

window.onload = function(){
    iniciarDB();
  }

buscarButton.addEventListener('click', event =>{
    event.preventDefault();
     buscarpelicula();
     
})
function agregarDB(e){
    var id
    if(e.target.hasAttribute('id') && e.target.classList.contains('btnfav')){
        e.preventDefault();
        id = e.target.getAttribute("id");

        
    if(e.target.classList.contains('quitarfav')){
            
            db.nombre.where('_id').equals(id).delete()
            .then(refreshView);
            e.target.className = "btnfav";
            e.target.innerHTML = "agregar favoritos"

        
    }else{
        db.nombre.put({ text: id, _id: String(id)})
            .then(refreshView);
            e.target.className = "btnfav quitarfav";
            e.target.innerHTML = "quitar de favorito"

    }}

}


async function cargarPelicula(peliculaBuscada){
    const url = `http://omdbapi.com/?apikey=feed1c0c&s=${peliculaBuscada}&page=${page}`;
    const respuesta = await fetch(`${url}`);
    const data = await respuesta.json();
    if(data.Response == "True") mostrarListaPeliculas(data.Search)
    console.log(data);  
}
function buscarpelicula(){
    let peliculaBuscada = (inputBusqueda.value).trim();
    cargarPelicula(peliculaBuscada);
    
}
function mostrarListaPeliculas(pelicula){
    
    for(let i = 0; i< pelicula.length; i++){
        let peliculaLI = document.createElement('div');
        peliculaLI.dataset.id = pelicula[i].imdbID;
        peliculaLI.className += " grid-item";

        if(pelicula[i].Poster != "N/A")
            peliculaPoster = pelicula[i].Poster;
        else 
            peliculaPoster = "img/img_error.jpeg";


        peliculaLI.innerHTML = `
            <h3>${pelicula[i].Title}</h3>
            <img src="${peliculaPoster}" alt="${pelicula[i].Title}">
            <p>año:${pelicula[i].Year}</p>
            <button type="button" class="btnfav" id="${pelicula[i].imdbID}">agregar favoritos</button>
            `;
        resultado.appendChild(peliculaLI);
        }
}




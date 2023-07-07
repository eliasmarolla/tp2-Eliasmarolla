const contenido = document.getElementById('contenido');

const listadeFavoritos = await Dexie.getDatabaseNames([favoritos]);

console.log(listadeFavoritos);




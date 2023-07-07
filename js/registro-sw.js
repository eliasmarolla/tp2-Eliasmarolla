if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('../SW.js').then((message)=>{
        console.log(' El service Worker funciona correctamente')
    });
}else{
    console.log('El navegador no soporta al servis Worker')
}
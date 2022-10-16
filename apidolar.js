//cargo las constantes
const dolarBlue = "https://api-dolar-argentina.herokuapp.com/api/dolarblue"
let contenedorDolarBlue = document.getElementById("contenedorDolarBlue");

//Función fetch para buscar el dato del dolar hoy

fetch(dolarBlue)
    .then(respuesta => respuesta.json())
    .then((venta) => {
        console.log(venta.venta)
        contenedorDolarBlue.innerHTML =
        `<p>Valor dolar blue ${venta.venta}</p>`
    })
    .catch(error => console.log(error))

//remplazado anteriormente
const criptoYa = "https://criptoya.com/api/dolar";


/* setInterval( ()=> {
    fetch(criptoYa)
        .then(response => response.json())
        .then(({blue}) => {
            contenedorDolarBlue.innerHTML = `
            
            <p>Cambio Dolar Blue: ${blue} </p>
            `
        })
        .catch(error => console.error(error))
}, 1000) */

let horaLocal = document.getElementById("horaLocal");

setInterval (()=> {
    hora = moment().format('LT')
    horaLocal.innerHTML =
    `<p>Hora local ${hora}</p>`
    
},1000)
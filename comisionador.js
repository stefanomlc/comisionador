

/*ARRAY DE LAS RESPUESTAS  */
const montoAcobrar = document.getElementById("formularioMonto");
const arrayRespuestas = [];
const arrayCalculo = [];
const arrayHistorial = [];
const arrayMetodosSeleccionados = [];

/* Función de boton */
montoAcobrar.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("el valor es" + document.getElementById("MPLink").value)
    if(document.getElementById("MPLink").value == "none"){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se seleccionó ningun método de pago!',
            
          })
        
        
    } else {

    //Alerta de inicio de cálculo
        Toastify({
            text: "Calculo realizado",
            duration: 3000,
            position: "left",
            gravity: "bottom",
            backgroundColor: "#c84d0a",
          }).showToast();

    //Importamos datos a calcular
        ingresarDatos();

    //importar métodos de cobro seleccionados
        ingresarMetodoDeCobro();

    //Proceso de calculo
        calculo();

    //Creamos el Historial
        verHistorial();
    }

})


class calcularCosto{
    constructor(razon, monto){
        this.razon = razon;
        this.monto = monto;
    }
}

/* Función de tomar valores */
function ingresarDatos (){
    const razon = document.getElementById("razon").value;
    const monto = document.getElementById("monto").value;
//    const nuevaCalculo = new calcularCosto(monto);
    arrayRespuestas.push(razon);
    arrayCalculo.push(monto);

    

    

}

//constructor del historial

class MetodoHistorial{
    constructor(razon, metodo, comision, total){
        this.metodo = metodo;
        this.comision = comision;
        this.razon = razon;
        this.total = total;
    }
}
class DiferentesCostos{
    constructor(metodo, comision, total){
        this.metodo = metodo;
        this.comision = comision;
        this.total = total;
    }
}
class ClaseHistorial{
    constructor(razon, costos){
        this.razon = razon;
        this.costos = costos;
    }
}



//JSON cargamos los valores y ponemos en un Array
const jsonMetodosDeCobro = "json/metodosdepago.json";
const metodosDeCobro = [];

fetch(jsonMetodosDeCobro)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        datos.forEach( metodo =>{
            metodosDeCobro.push(metodo)
        })
    })
    .catch(error => console.log(error))
    .finally(() => console.log("Carga de métodos de cobro terminada"));



function calculo(){
    //importo las variables
    let monto = parseInt(arrayCalculo);
    let razon = arrayRespuestas[0];

    const arrayCostos = [];

     


    for (const {comision: c, nombre: i } of arrayMetodosSeleccionados){
        
        let costoComision = ((monto * c) * 1.21);

        let total = monto + costoComision;

        const aux = new DiferentesCostos ( i, costoComision.toFixed(2), total.toFixed(2));
        arrayCostos.push(aux);
    }

    const aux = new ClaseHistorial (razon, arrayCostos);
    
    console.log(arrayHistorial);
    
    arrayHistorial.unshift(aux);
        
    arrayCalculo.shift(); //esto borra el valor cargado
    let l = arrayMetodosSeleccionados.length;
    arrayMetodosSeleccionados.splice(0,l); //borramos el valor elegido en el método para que no se repita
    arrayRespuestas.shift();


    localStorage.setItem("Respuestas", JSON.stringify(arrayHistorial)); //publica el historial en el LocalStorage


}

function ingresarMetodoDeCobro() {
    let MPLink = document.getElementById("MPLink").value;
    let uala = document.getElementById("uala").value;
    let payway = document.getElementById("payway").value;
    let naranja = document.getElementById("naranja").value;
    let modo = document.getElementById("modo").value;
    console.log(MPLink);
    
    //Ternario para revisar métodos activados
    (MPLink == "false") && (uala == "false") && (payway == "false") && (naranja == "false") && (modo == "false") ? 
    Swal.fire('No hay métodos de pago seleccionados') : console.log ("iniciamos el calculo"); 

    //necesito encontrar el valor, sacar el indice y pedir que lo devuelva como un array
   
    if (MPLink != "false"){
        let indexFormaDePago = metodosDeCobro.find(({codigo}) => codigo === MPLink);
        arrayMetodosSeleccionados.push(indexFormaDePago); 
    }
    //AULA
    if (uala != "false"){
        let indexUala = metodosDeCobro.find(({codigo}) => codigo === uala);
        arrayMetodosSeleccionados.push(indexUala); 
    }

    //PAYWAY    
    if (payway != "false"){
        let aux = metodosDeCobro.find(({codigo}) => codigo === payway);
        arrayMetodosSeleccionados.push(aux); 
    }

    //NARANJA    
    if (naranja != "false"){
        let aux = metodosDeCobro.find(({codigo}) => codigo === naranja);
        arrayMetodosSeleccionados.push(aux); 
    }

    //MODO    
    if (modo != "false"){
        let aux = metodosDeCobro.find(({codigo}) => codigo === modo);
        arrayMetodosSeleccionados.push(aux); 
    }

    localStorage.setItem("Mercadopago", JSON.stringify(MPLink));




}



//Revisamos si hay o no algo local y lo tomamos

if(localStorage.getItem("Respuestas")){ //esto da True porque el localStorage es distinto de vacio
    verHistorial(); //solo tengo que llamar a la otra función
    console.log("Historial cargado");
    
    
}



const limpiarHistoria = document.getElementById("limpiarHistorial");

limpiarHistoria.addEventListener("click", () => {
    Toastify({
        text: "Historial eliminado",
        duration: 1500,
        position: "left",
        gravity: "bottom",
        backgroundColor: "#0f7d25",
        
      }).showToast();

    //limpio el storage
    localStorage.removeItem("Respuestas");
    contenedorRespuestas.innerHTML = "";
    //limpio el historial para que no se siga cargando
    let l = arrayHistorial.length;
    arrayHistorial.splice(0,l);

});

function verHistorial() {
    const historial = JSON.parse(localStorage.getItem("Respuestas"));
    console.log("vemos el historial")
    console.log(historial)
    let aux = "";
    
   historial.forEach (rta => {
      
        aux += `
        <div>
        <h4>${rta.razon}</h4>
        </div>
        `
        ;
        

        for (const {comision: c, metodo: m, total: t } of rta.costos){
            total = t;
            ;
            
            aux +=
            `
            <div>
            <p>Método: ${m}</p>
            <p>Costo de la comisión: ${c}</p>
            <p>Total: ${total}</p>

            </div>
            `
            ;
            
        }
        

    contenedorRespuestas.innerHTML = aux;
    }) 

}


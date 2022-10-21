

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
        //alert("No se seleccionó un método de pago")
        
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

    //console.log(arrayRespuestas); //borrar
    

    

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

    //Método funcionado
    //for (const {comision: c, nombre: i } of metodosDeCobro){
    console.log(arrayMetodosSeleccionados)
    for (const {comision: c, nombre: i } of arrayMetodosSeleccionados){
        
        let costoComision = ((monto * c) * 1.21);

        let total = monto + costoComision;

        const aux = new DiferentesCostos ( i, costoComision.toFixed(2), total.toFixed(2));
        arrayCostos.push(aux);
    }

    const aux = new ClaseHistorial (razon, arrayCostos);
    arrayHistorial.unshift(aux);
   

    
    arrayCalculo.shift(); //esto borra el valor cargado
    let l = arrayMetodosSeleccionados.length;
    arrayMetodosSeleccionados.splice(0,l); //borramos el valor elegido en el método para que no se repita
    arrayRespuestas.shift();


    localStorage.setItem("Respuestas", JSON.stringify(arrayHistorial));


}

function ingresarMetodoDeCobro() {
    let MPLink = document.getElementById("MPLink").value;
    
    console.log(MPLink); //Resultado MPLink

    //necesito encontrar el valor, sacar el indice y pedir que lo devuelva como un array
   
    if (MPLink != "false"){
        let indexFormaDePago = metodosDeCobro.find(({codigo}) => codigo === MPLink);
        arrayMetodosSeleccionados.push(indexFormaDePago); 
    }


    let uala = document.getElementById("uala").value;
    if (uala != "false"){
        let indexUala = metodosDeCobro.find(({codigo}) => codigo === uala);
        arrayMetodosSeleccionados.push(indexUala); 
    }
    //PAYWAY
    let payway = document.getElementById("payway").value;
    if (payway != "false"){
        let aux = metodosDeCobro.find(({codigo}) => codigo === payway);
        arrayMetodosSeleccionados.push(aux); 
    }
    //NARANJA
    let naranja = document.getElementById("naranja").value;
    if (naranja != "false"){
        let aux = metodosDeCobro.find(({codigo}) => codigo === naranja);
        arrayMetodosSeleccionados.push(aux); 
    }
    //MODO
    let modo = document.getElementById("modo").value;
    if (modo != "false"){
        let aux = metodosDeCobro.find(({codigo}) => codigo === modo);
        arrayMetodosSeleccionados.push(aux); 
    }

    console.log(arrayMetodosSeleccionados);

    localStorage.setItem("Mercadopago", JSON.stringify(MPLink));




}



//Revisamos si hay o no algo local y lo tomamos

if(localStorage.getItem("Respuestas")){ //esto da True porque el localStorage es distinto de vacio
    verHistorial(); //solo tengo que llamar a la otra función
    const historial = JSON.parse(localStorage.getItem("Respuestas"));
    console.log(historial)
    arrayHistorial.push(historial);
    
    
}

//Reviso si hay algo en el Local guardado como método de pago
/* if(localStorage.getItem("Mercadopago")){
    console.log("cargamos el método de pago");
    document.ready = document.getElementById("MPLink").value = localStorage.getItem("Mercadopago");
} */

const limpiarHistoria = document.getElementById("limpiarHistorial");

limpiarHistoria.addEventListener("click", () => {
    Toastify({
        text: "Historial eliminado",
        duration: 1500,
        position: "left",
        gravity: "bottom",
        backgroundColor: "#0f7d25",
        
      }).showToast();


    localStorage.removeItem("Respuestas");
    contenedorRespuestas.innerHTML = "";

});

function verHistorial() {
    const historial = JSON.parse(localStorage.getItem("Respuestas"));

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
            <p>Total: ${t}</p>

            </div>
            `
            ;
        
        }
        

    contenedorRespuestas.innerHTML = aux;
    })
}

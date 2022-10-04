

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
    

    montoAcobrar.reset();

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

const metodosDeCobro = [
    {metodo: "Credito y Debito", comision: 0.0599, dias: 0, nombre: "Mercado Pago 0 días", codigo: "mpLink0D"},
    {metodo: "Credito y Debito", comision: 0.0399, dias: 10, nombre: "Mercado Pago 10 días", codigo: "mpLink10D"},
    {metodo: "Credito y Debito", comision: 0.0299, dias: 18, nombre: "Mercado Pago 18 días", codigo: "mpLink18D"},
    {metodo: "Credito y Debito", comision: 0.0176, dias: 35, nombre: "Mercado Pago 35 días", codigo: "mpLink35D"},
    {metodo: "Ualá Link", comision: 0.044, dias: 0, nombre: "Ualá link con acreditación al instante", codigo: "ualaLink"},
    {metodo: "Ualá mPos Debito", comision: 0.029, dias: 0, nombre: "Ualá mPOS Débito con acreditación al instante", codigo: "ualaMposDebito"},
    {metodo: "Ualá mPos Credito", comision: 0.044, dias: 0, nombre: "Ualá mPOS Credito con acreditación al instante", codigo: "ualaMposCredito"},
    {metodo: "Ualá QR", comision: 0.06, dias: 0, nombre: "Ualá mPOS Crédito", codigo: "ualaQr"},
];


function calculo(){
    //importo las variables
    let monto = parseInt(arrayCalculo);
    let razon = arrayRespuestas[0];

    const arrayCostos = [];

    //Método funcionado
    //for (const {comision: c, nombre: i } of metodosDeCobro){
    
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
    let indexFormaDePago = metodosDeCobro.find(({codigo}) => codigo === MPLink);
    arrayMetodosSeleccionados.push(indexFormaDePago); 

    let uala = document.getElementById("uala").value;
    let indexUala = metodosDeCobro.find(({codigo}) => codigo === uala);
    arrayMetodosSeleccionados.push(indexUala); 

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
            
            aux = aux +
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

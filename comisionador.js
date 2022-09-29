

/*ARRAY DE LAS RESPUESTAS  */
const montoAcobrar = document.getElementById("formularioMonto");
const arrayRespuestas = [];
const arrayCalculo = [];
const arrayHistorial = [];

/* Función de boton */
montoAcobrar.addEventListener("submit", (e) => {
    e.preventDefault();
    ingresarDatos();
    calculo();
    verHistorial();
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
    {metodo: "Credito y Debito", comision: 0.0599, dias: 0, nombre: "Mercado Pago 0 días"},
    {metodo: "Credito y Debito", comision: 0.0399, dias: 10, nombre: "Mercado Pago 10 días"},
    {metodo: "Credito y Debito", comision: 0.0299, dias: 18, nombre: "Mercado Pago 18 días"},
    {metodo: "Credito y Debito", comision: 0.0176, dias: 35, nombre: "Mercado Pago 35 días"},
];


function calculo(){
    //importo las variables
    let monto = parseInt(arrayCalculo);
    let razon = arrayRespuestas[0];

    const arrayCostos = [];

    for (const {comision: c, nombre: i } of metodosDeCobro){
        
        let costoComision = ((monto * c) * 1.21);

        let total = monto + costoComision;

        const aux = new DiferentesCostos ( i, costoComision.toFixed(2), total.toFixed(2));
        arrayCostos.push(aux);
    }

    const aux = new ClaseHistorial (razon, arrayCostos);
    arrayHistorial.push(aux);
   

    
    arrayCalculo.shift(); //esto borra el valor cargado
    arrayRespuestas.shift();


    localStorage.setItem("Respuestas", JSON.stringify(arrayHistorial));


}


function verHistorial() {
    const historial = JSON.parse(localStorage.getItem("Respuestas"));
    let aux = "";
    console.log(historial);

    historial.forEach (rta => {
        aux += `
        <div>
        <p>Razon: ${rta.razon}</p>
        </div>
        `
        ;
        

        for (const {comision: c, metodo: m, total: t } of rta.costos){
            total = t;
            console.log(t);
            
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
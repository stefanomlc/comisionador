/* CONSTRUCTOR */

class MetodoDeCobro{
    constructor(metodo, comision, diasdecobro, nombre){
        this.metodo = metodo;
        this.comision = comision;
        this.diasdecobro = diasdecobro;
        this.nombre = nombre;
    }
}

/* OBJETOS */

const mpLink0 = new MetodoDeCobro ("Crédito y Débido", 0.0599, 0, "Mercado Pago 0 días" )
const mpLink10 = new MetodoDeCobro ("Crédito y Débido", 0.0399, 10, "Mercado Pago 10 días" )
const mpLink18 = new MetodoDeCobro ("Crédito y Débido", 0.0299, 18, "Mercado Pago 18 días" )
const mpLink35 = new MetodoDeCobro ("Crédito y Débido", 0.0179, 35, "Mercado Pago 35 días" )

const arrayMetodoDeCobro = [];

arrayMetodoDeCobro.push(mpLink0);
arrayMetodoDeCobro.push(mpLink10);
arrayMetodoDeCobro.push(mpLink18);
arrayMetodoDeCobro.push(mpLink35);


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
    let comision = arrayMetodoDeCobro[0].comision;
    let metodo = arrayMetodoDeCobro[0].nombre;
    let razon = arrayRespuestas[0];

    //let total = (monto + ((monto * comision) * 1.21));
    //let costoComision = monto * comision;

    const arrayCostos = [];

    for (const {comision: c, nombre: i } of metodosDeCobro){
        
        let costoComision = ((monto * c) * 1.21);

        let total = monto + costoComision;

        const aux = new DiferentesCostos ( i, costoComision.toFixed(2), total.toFixed(2));
        arrayCostos.push(aux);
    }

    const aux = new ClaseHistorial (razon, arrayCostos);
    arrayHistorial.push(aux);
   

    //creo el historial
    //const aux = new MetodoHistorial (razon, metodo, costoComision, total)
    
    //cargo el historial
    //arrayHistorial.push(aux)
    
    arrayCalculo.shift(); //esto borra el valor cargado
    arrayRespuestas.shift();

/*     console.log(arrayRespuestas[0])
    console.log(total)
    console.log(aux)
    console.log(arrayHistorial) */

    localStorage.setItem("Respuestas", JSON.stringify(arrayHistorial));


}

//const calculo = document.getElementById("calculo")

/* function verHistorial() {
    const historial = JSON.parse(localStorage.getItem("Respuestas"));
    let aux = "";
    historial.forEach (rta => {
        aux = `
            <div>
            <p>Razon: ${rta.razon}</p>
            <p>Método: ${rta.metodo}</p>
            <p>Costo de la comisión: ${rta.comision}</p>
            <p>Total: ${rta.total}</p>

            </div>
            `
            + aux;
    contenedorRespuestas.innerHTML = aux;
    })
} */

//    {metodo: "Credito y Debito", comision: 0.0599, dias: 0, nombre: "Mercado Pago 0 días"},

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
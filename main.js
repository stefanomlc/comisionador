/* Funciones */

function calcularCosto (monto){
    let diasdecobro = parseInt(prompt("¿En cuantos días quiere acceder a su dinero? 0 / 10 / 18 / 35"));
    let comi = arrayMetodoDeCobro.find(comi => comi.diasdecobro === diasdecobro);
    let indice = arrayMetodoDeCobro.indexOf(comi);
    total = (monto + ((monto * arrayMetodoDeCobro[indice].comision) * 1.21));
    
    calculo.innerHTML = "";
    arrayMetodoDeCobro.forEach ( MetodoDeCobro => {
        const div = document.createElement("div");
        div.innerHTML= `
                        <div>
                            <p>Costo de ${MetodoDeCobor.nombre}</p>
                            <p>En ${MetodoDeCobor.diasdecobro} dias de cobro</p>
                            <p>De comisión tenes ${MetodoDeCobor.}</p>
                            <p>En total${MetodoDeCobor.nombre}</p>
                        </div>
                         `
        })
    return total;
    
}

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

const montoAcobrar = document.getElementById("formularioMonto");

/*ARRAY DE LAS RESPUESTAS  */
const arrayRespuestas = [];

/* Función de boton */
montoAcobrar.addEventListener("submit", (e) => {
    e.preventDefault();
    ingresarDatos();
    verRespuestas();
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
    const nuevaCalculo = new calcularCosto(monto);
    arrayRespuestas.push(razon, nuevaCalculo);
    localStorage.setItem("Respuestas", JSON.stringify(arrayRespuestas));
    montoAcobrar.reset();

}
function calculo(){

}
const calculo = document.getElementById("calculo")
const contenedorRespuestas = document.getElementById("contenedorRespuestas");

function verRespuestas() {
    arrayRespuestas.forEach (calcularCosto => {
        contenedorRespuestas.innerHTML = `
            <div>
            <p>Razon: ${calcularCosto.razon}</p>
            <p>Monto: ${calcularCosto.monto}</p>

            </div>
            `;
    })
}
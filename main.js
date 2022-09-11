/* Funciones */

/* let cobroLink = (cobroIdeal , diasParaIngresar) => {
    switch (diasParaIngresar){
        case "0":
            impuestos = (cobroIdeal * 0.0599) * 1.21;
            aCobrar = cobroIdeal + impuestos;

            break;

        case "10":
            impuestos = (cobroIdeal * 0.0399) * 1.21;
            aCobrar = cobroIdeal + impuestos;

            break;

        case "18":
            impuestos = (cobroIdeal * 0.0299) * 1.21;
            aCobrar = cobroIdeal + impuestos;

            break;

        case "35":
            impuestos = (cobroIdeal * 0.0179) * 1.21;
            aCobrar = cobroIdeal + impuestos;

            break;
        default:
            alert("Los dias ingresados no son válidos, presione F5")

    }
    return aCobrar
}
 */

function calcularCosto (monto){
    let diasdecobro = parseInt(prompt("¿En cuantos días quiere acceder a su dinero? 0 / 10 / 18 / 35"));
    let comi = arrayMetodoDeCobro.find(comi => comi.diasdecobro === diasdecobro);
    let indice = arrayMetodoDeCobro.indexOf(comi);
    total = (monto + ((monto * arrayMetodoDeCobro[indice].comision) * 1.21));
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

const mpLink0 = new MetodoDeCobro ("Crédito y Débido", 0.0599, 0, "mpLink0" )
const mpLink10 = new MetodoDeCobro ("Crédito y Débido", 0.0399, 10, "mpLink10" )
const mpLink18 = new MetodoDeCobro ("Crédito y Débido", 0.0299, 18, "mpLink18" )
const mpLink35 = new MetodoDeCobro ("Crédito y Débido", 0.0179, 35, "mpLink35" )

const arrayMetodoDeCobro = [];

arrayMetodoDeCobro.push(mpLink0);
arrayMetodoDeCobro.push(mpLink10);
arrayMetodoDeCobro.push(mpLink18);
arrayMetodoDeCobro.push(mpLink35);



/* INGRESAR VALOR */
calcularCosto(parseInt(prompt("ingrese el valor que quieres cobrar")));
alert("debes cobrar " + total.toFixed(2));

/* let diasParaIngresar = prompt("¿En cuantos días quiere acceder a su dinero? 0 / 10 / 18 / 35");
 */

/* VER QUE NO SEA UN ERROR POR SER STRING O VOLVER A PEDIR*/

/* EJECUTAR EL CALCULO */
/* cobroLink(cobroIdeal, diasParaIngresar);
console.log("El costo de impuestos es $" + impuestos.toFixed(2));
console.log("Debes cobrar $" + aCobrar.toFixed(2));
alert("Debes cobrar $" + aCobrar.toFixed(2)) */
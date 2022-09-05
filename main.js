/* Funciones */
let cobroLink = (cobroIdeal , diasParaIngresar) => {
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

let cobroCredito

/* INGRESAR VALOR */
let cobroIdeal = parseInt(prompt("ingrese el valor que quieres cobrar"));

let diasParaIngresar = prompt("¿En cuantos días quiere acceder a su dinero? 0 / 10 / 18 / 35");

/* VER QUE NO SEA UN ERROR POR SER STRING O VOLVER A PEDIR*/

/* EJECUTAR EL CALCULO */
cobroLink(cobroIdeal, diasParaIngresar);
console.log("El costo de impuestos es $" + impuestos.toFixed(2));
console.log("Debes cobrar $" + aCobrar.toFixed(2));
alert("Debes cobrar $" + aCobrar.toFixed(2))
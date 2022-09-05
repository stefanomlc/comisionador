/* let valorDeseado = parseInt(prompt("ingrese el valor que desea cobrar luego de todos los costos"));

let metodoDePago = prompt("¿Vas a cobrar en? (Escribe '1' para Debito o escribe '2' para Credito");


if (metodoDePago == "1" || metodoDePago == "2"){
    switch (metodoDePago){
        case "1":
        console.log("va a Debito")
        break;
        case "2" :
        console.log("va a Credito")
        break;

    }
}
 */
let tuNombre;

do{
    tuNombre = prompt("Cómo te llamas?")
} while (!tuNombre && !Number(tuNombre) ) ;
console.log (tuNombre);

/* 
const mpQrDebito = 0.0099;

let costo = mpQrDebito * valorIdeal;
let costoIva = costo*1.21; 



console.log("El costo es " + costo);
console.log("El IVA es " + costoIva);
console.log("El total es " + (valorIdeal + costo + costoIva)); */
import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

//agregar un escuchador, resibe 2 parameros, 1 es el tipo de evento, y 2 una función que se va a disparar una vez que el usuario o que se cumpla esta condición
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();//prevenir el funcionamiento del formulario
  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;
  clientServices
    .crearCliente(nombre, email)
    .then(() => {
      //cuando le registre me dirija a esta ruta 
      window.location.href = "/screens/registro_completado.html";
    })
    .catch((err) => console.log(err));
});

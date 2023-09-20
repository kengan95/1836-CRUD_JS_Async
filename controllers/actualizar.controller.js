import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInformacion = async () => {
  const url = new URL(window.location);//objeto que es nuestra URL
  const id = url.searchParams.get("id");//cual es el nombre del param que estamos buscando, osea el id

  if (id === null) {
    window.location.href = "/screens/error.html";
  }

  const nombre = document.querySelector("[data-nombre]");
  const email = document.querySelector("[data-email]");

  try {
    const perfil = await clientServices.detalleCliente(id);
    if (perfil.nombre && perfil.email) {
      nombre.value = perfil.nombre;
      email.value = perfil.email;
    } else {
      throw new Error();//activamos un error
    }
  } catch (error) {
    window.location.href = "/screens/error.html";
  }
};

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();//evitar que el formulario trate de hacer la petición
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;

  clientServices.actualizarCliente(nombre, email, id).then(() => {
    window.location.href = "/screens/edicion_concluida.html";
  });
});

window.addEventListener("load", function () {
  const formulario = document.getElementById("formulario");
  const inputs = document.querySelectorAll("#formulario input");

  const expresiones = {
    firstname: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    lastname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const campos = {
    firstname: false,
    lastname: false,
    password: false,
    email: false,
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "firstname":
        validarCampo(expresiones.firstname, e.target, "firstname");
        break;
      case "lastname":
        validarCampo(expresiones.lastname, e.target, "lastname");
        break;
      case "password":
        validarCampo(expresiones.password, e.target, "password");
        validarPassword2();
        break;
      case "password2":
        validarPassword2();
        break;
      case "email":
        validarCampo(expresiones.email, e.target, "email");
        break;
    }
  };

  const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
      document
        .getElementById(`grupo__${campo}`)
        .classList.remove("formulario__grupo-incorrecto");
      document
        .getElementById(`grupo__${campo}`)
        .classList.add("formulario__grupo-correcto");
      document
        .querySelector(`#grupo__${campo} i`)
        .classList.add("fa-check-circle");
      document
        .querySelector(`#grupo__${campo} i`)
        .classList.remove("fa-times-circle");
      document
        .querySelector(`#grupo__${campo} .formulario__input-error`)
        .classList.remove("formulario__input-error-activo");
      campos[campo] = true;
    } else {
      document
        .getElementById(`grupo__${campo}`)
        .classList.add("formulario__grupo-incorrecto");
      document
        .getElementById(`grupo__${campo}`)
        .classList.remove("formulario__grupo-correcto");
      document
        .querySelector(`#grupo__${campo} i`)
        .classList.add("fa-times-circle");
      document
        .querySelector(`#grupo__${campo} i`)
        .classList.remove("fa-check-circle");
      document
        .querySelector(`#grupo__${campo} .formulario__input-error`)
        .classList.add("formulario__input-error-activo");
      campos[campo] = false;
    }
  };

  const validarPassword2 = () => {
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
      document
        .getElementById(`grupo__password2`)
        .classList.add("formulario__grupo-incorrecto");
      document
        .getElementById(`grupo__password2`)
        .classList.remove("formulario__grupo-correcto");
      document
        .querySelector(`#grupo__password2 i`)
        .classList.add("fa-times-circle");
      document
        .querySelector(`#grupo__password2 i`)
        .classList.remove("fa-check-circle");
      document
        .querySelector(`#grupo__password2 .formulario__input-error`)
        .classList.add("formulario__input-error-activo");
      campos["password"] = false;
    } else {
      document
        .getElementById(`grupo__password2`)
        .classList.remove("formulario__grupo-incorrecto");
      document
        .getElementById(`grupo__password2`)
        .classList.add("formulario__grupo-correcto");
      document
        .querySelector(`#grupo__password2 i`)
        .classList.remove("fa-times-circle");
      document
        .querySelector(`#grupo__password2 i`)
        .classList.add("fa-check-circle");
      document
        .querySelector(`#grupo__password2 .formulario__input-error`)
        .classList.remove("formulario__input-error-activo");
      campos["password"] = true;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });

  formulario.addEventListener("submit", (e) => {

    e.preventDefault();
    
    const terminos = document.getElementById("terminos");
    if (
      campos.firstname &&
      campos.lastname &&
      campos.password &&
      campos.email &&
      terminos.checked
    ) {

	  const data = {
		  firstname:e.target[0].value.trim().toLowerCase(),
		  lastname:e.target[1].value.trim().toLowerCase(),
		  password:e.target[2].value,
		  email:e.target[4].value,
		  role:2
	  }

	  console.log('data:',data);

	  const url = `http://localhost:3000/register`;

	  fetch( url, {
		method:'POST',
		body: JSON.stringify(data),
		headers:{
			'Content-Type': 'application/json'
		  }
	  }).then(res => res.json())
	  .catch(error => console.error('Error:', error))
	  .then(response => console.log('Success:', response));

    
      formulario.reset();

      document
        .getElementById("formulario__mensaje-exito")
        .classList.add("formulario__mensaje-exito-activo");
      setTimeout(() => {
        document
          .getElementById("formulario__mensaje-exito")
          .classList.remove("formulario__mensaje-exito-activo");
      }, 5000);

      document
        .querySelectorAll(".formulario__grupo-correcto")
        .forEach((icono) => {
          icono.classList.remove("formulario__grupo-correcto");
        });
    } else {
      document
        .getElementById("formulario__mensaje")
        .classList.add("formulario__mensaje-activo");
    }
  });
});

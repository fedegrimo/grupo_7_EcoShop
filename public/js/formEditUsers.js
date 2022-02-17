window.addEventListener('load', () => {
    const inputs = document.querySelectorAll("#edit-form input");
    const formulario = document.querySelectorAll('#edit-form');
    const justNum = /(\d+)/g;
    const [ idUser ] = window.location.pathname.match(justNum);
    const url = `http://localhost:3000/users/${idUser}`
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

    
    inputs.forEach((input) => {
        input.addEventListener("keyup", validarFormulario);
        input.addEventListener("blur", validarFormulario);
    });


    const sendData = ( data ) => {

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }
    

    formulario.addEventListener("submit", (e) => {
    
        e.preventDefault();
    
        if (
          campos.firstname &&
          campos.lastname &&
          campos.password &&
          campos.email
        ) { 
          sendData(e);
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
window.addEventListener('load', function(){
    const formulario = document.querySelectorAll('#formulario');
    const inputs = document.querySelectorAll('#formulario input');
    const justNum = /(\d+)/g;
    const [ idUser ] = window.location.pathname.match(justNum);
    const url = `http://localhost:3000/products/${idUser}`
    const expresiones = {
        letras: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        precio: /^\d{1,10}$/, // 7 a 14 numeros.
        discount: /^\d{1,2}$/
    }
    const campos = {
        letras: false,
        numero: false
    }

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "title":
                validarCampo(expresiones.letras, e.target, 'title');
            break;
            case "price":
                validarCampo(expresiones.precio, e.target, 'price');
            break;
            case "discount":
                validarCampo(expresiones.discount, e.target, 'discount');
            break;

            case "description":
                validarCampo(expresiones.letras, e.target, 'description');
            break;
        }
    }

    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
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

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
    
        if(
        campos.title && 
        campos.price && 
        campos.discount && 
        campos.category && 
        campos.description && 
        campos.fileImage
        ){
            sendData(e);
            formulario.reset();
    
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);
    
            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        } else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }

    });
 
})
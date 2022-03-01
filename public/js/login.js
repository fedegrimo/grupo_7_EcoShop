window.addEventListener("load", function () {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const formulario = document.querySelector("form");

    email.focus();
    formulario.addEventListener("submit",(event) => {
        
        let errors =[]; 
    

        if (email){
            errors.push("Ingresar Email");
        }

        if (password){
            errors.push("Ingresar Contraseña");
        }
    });
   
  });
  
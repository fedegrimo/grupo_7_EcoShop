window.addEventListener('load',function(){


    /*declarar variables*/
    const toggle = document.querySelector('.toggle');
    const navigation = document.querySelector('.navigation');
    const main = document.querySelector('.main');



    /*definir funciones*/
    const toggleMenu = () => {
        toggle.classList.toggle('active');
        navigation.classList.toggle('active');
        main.classList.toggle('active');
    }



    


   
    /*definir eventos*/


    toggle.addEventListener('click', toggleMenu );


})
window.addEventListener("load", function () {
    const button = document.querySelector('#addCart');
    carrito = localStorage.getItem("cart");
    
    
    button.addEventListener("click",() => {
        const name = document.querySelector('#cartName');
        const price = document.querySelector('#cartPrice');
        const offer = document.querySelector('#cartOffer');
        const qty = document.querySelector('#cartQty');
        const id = document.querySelector('#cartId');
        let addObject=new Object();
        let cart =[];  
        let sesionCart  = sessionStorage.getItem("cart");

        if (parseInt(qty.value) > 0){
             addObject.name   = name.value;
             addObject.price   = price.value;
             addObject.offer   = offer.value;
             addObject.qty   = qty.value;
             cart.push(addObject);
    
            localStorage.setItem("cart",cart);
        
        } else {
            alert ("La cantidad debe ser mayor a 0")
        }

    });
    

});
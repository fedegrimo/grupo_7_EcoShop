window.addEventListener('load', () => {

    const editForm = document.querySelector('#edit-form');

    console.log(editForm);

    editForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log(e.target.value);
    })





});
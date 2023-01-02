const formInputName = document.querySelector('#name');
const formInputEmail = document.querySelector('#email');
const formInputPhone = document.querySelector('#phone');
const formInputMessage = document.querySelector('#message');
const formButton = document.querySelector('#buttonSubmitForm');

formButton.addEventListener('click', sendForm);

async function sendForm(event) {
    event.preventDefault();
    console.log("prueba");
    const name = formInputName.value;
    const email = formInputEmail.value;
    const phone = formInputPhone.value;
    const message = formInputMessage.value;
    const dataToSend = { 'name': `${name}`, 'email': `${email}`, 'phone': `${phone}`, 'message': `${message}` };
    formInputName.value = '';
    formInputEmail.value = '';
    formInputPhone.value = '';
    formInputMessage.value = '';
    const response = await fetch("http://152.67.43.92:3000/api/v1/sendForm", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend),
    });

    response.json().then(data => {
        console.log(data);
    });






}

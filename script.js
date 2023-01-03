const formInputName = document.querySelector('#name');
const formInputEmail = document.querySelector('#email');
const formInputPhone = document.querySelector('#phone');
const formInputMessage = document.querySelector('#message');
const formButton = document.querySelector('#buttonSubmitForm');
const messageForm = document.querySelector('.messageForm');
const messageFormBox = document.querySelector('.messageFormBox');
const formClass = document.querySelector('.formClass');
const p1ResponseForm = document.querySelector('#p1ResponseForm');
const p2ResponseForm = document.querySelector('#p2ResponseForm');


formButton.addEventListener('click', sendForm);

async function sendForm(event) {
    event.preventDefault();
    try {
        const name = formInputName.value;
        const email = formInputEmail.value;
        const phone = formInputPhone.value;
        const message = formInputMessage.value;
        const dataToSend = { 'name': `${name}`, 'email': `${email}`, 'phone': `${phone}`, 'message': `${message}` };
        const response = await fetch("https://152.67.43.92/sendForm", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend),
        });
        /* response.json().then(data => {
            console.log(data);
        }); */

        if (response.status == 200) {
            constructResponseFormMessage('Su mensaje se ha enviado correctamente', 'Nuestro equipo se contactará a la brevedad', true);
            toggleResponseForm();
            setTimeout(() => {
                toggleResponseForm();
            }, 3500);

        } else {
            constructResponseFormMessage('Hemos tenido un inconveniente al enviar el formulario', 'Por favor vuelva a intentarlo más tarde', false);
            toggleResponseForm();
            setTimeout(() => {
                toggleResponseForm();
            }, 3500);
        }

    } catch {
        constructResponseFormMessage('Hemos tenido un inconveniente al enviar el formulario', 'Por favor vuelva a intentarlo más tarde', false);
        toggleResponseForm();
        setTimeout(() => {
            toggleResponseForm();
        }, 3500);
    }


    formInputName.value = "";
    formInputEmail.value = "";
    formInputPhone.value = "";
    formInputMessage.value = "";



}

function toggleResponseForm() {
    messageForm.classList.toggle('inactive');
    formClass.classList.toggle('inactive');
}

function constructResponseFormMessage(p1, p2, success) {
    p1ResponseForm.innerText = p1;
    p2ResponseForm.innerText = p2;
    if (!success) {
        messageFormBox.style.border = "5px solid red";
    }
}









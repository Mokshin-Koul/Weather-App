//we use the fetch api on the frontend to get the data from the backend.

const weatherForm = document.querySelector('form');
const inputVal = document.querySelector('input');
const p1 = document.querySelector('.message-1');
const p2 = document.querySelector('.message-2');
const p3 = document.querySelector('.message-3');
weatherForm.addEventListener('submit',e => {
    e.preventDefault();
    p1.textContent = 'Loading....'
    p2.textContent = '';
    p3.textContent = '';
    fetch(`http://localhost:3000/weather?address=${inputVal.value}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
            p1.textContent = data.error;
        }
        else {
            console.log(data);
            p1.textContent = data.location;
            p2.textContent = 'Temp: ' + data.forecast.temperature + 'F';
            p3.textContent = 'Humidity: ' + data.forecast.humidity + ' %';
        }
    })
})
inputVal.value = '';
inputVal.focus();
})
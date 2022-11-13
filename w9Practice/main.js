// for the animation example in w9index.html:----------------------------
// const squareElement = document.getElementById('square');
// const squareElement2 = document.getElementById('square2');
// let angle = 0;

// setInterval( () => {
//     angle = (angle + 2) % 360;
//     squareElement.style.transform = `rotate(${angle}deg)`
// }, 1000/60);

// function rotate() {
//     angle = (angle + 2)%360;
//     squareElement2.style.transform = `rotate(${angle}deg)`
//     window.requestAnimationFrame(rotate);
// }

// const id = requestAnimationFrame(rotate);

//For factors.html example:------------------------------------------------

const btn = document.getElementById('rainbow');

const rainbow = ['red','orange','yellow','green','blue','rebeccapurple','violet'];

function change() {      
    document.body.style.background = rainbow[Math.floor(7*
    Math.random())];
}
btn.addEventListener('click', change);

const form = document.forms[0];
form.addEventListener('submit', factorize, false);

// function factorize(event) {
//     // prevent the form from being submitted
//     event.preventDefault();     

//     const number = Number(form.number.value);
//     document.getElementById('output').innerText = factorsOf(number);  
// }

function factorize(event) {
    // prevent the form from being submitted
    event.preventDefault();   
    document.getElementById('output').innerHTML = '<p>This could take a while ...</p>';
    const number = Number(form.number.value);

    if(window.Worker) {
        const worker = new Worker('factors.js');
        worker.postMessage(number);
        worker.addEventListener('message', (event) => {
        document.getElementById('output').innerHTML = event.data;
        }, false);
    }
}

// function factorsOf(n) {
//     if(Number.isNaN(Number(n))) {
//         throw new RangeError('Argument Error: Value must be an integer');
//     }
//     if(n < 0) {
//         throw new RangeError('Argument Error: Number must be positive');
//     }
//     if(!Number.isInteger(n)) {
//         throw new RangeError('Argument Error: Number must be an integer');
//     }
//     const factors = [];
//     for (let i=1 , max = Math.sqrt(n); i <= max ; i++) {
//         if (n%i === 0){
//         factors.push(i,n/i);
//         }
//     }
//     return factors.sort((a,b) =>  a - b);
// }



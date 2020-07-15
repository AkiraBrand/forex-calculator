/* VARIABLES */
const currencyElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');


/* FUNCTIONS */
// Fetch exchange rates and update DOM function
function calculate() {
    const currencyOne = currencyElementOne.value;
    const currencyTwo = currencyElementTwo.value;

    // Use exchange rate api
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const rate = data.rates[currencyTwo];
            rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
            amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
        });
}


/* EVENT LISTENERS */
// Element one event listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);

// Element two event listeners
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

// Swap event listener
swap.addEventListener('click', () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
});


// Call calculate function
calculate();


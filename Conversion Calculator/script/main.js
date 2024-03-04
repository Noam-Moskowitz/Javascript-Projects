const sellInpt = document.getElementById(`sell`);
const sellCurrencies = document.getElementById(`sellCurrencies`);
const buyInpt = document.getElementById(`buy`);
const buyCurrencies = document.getElementById(`buyCurrencies`);
const rateDisplay = document.getElementById(`rate`);
const feeDisplay = document.getElementById(`fee`);
buyCurrencies.value = `ILS`;

const getRate = async (currency) => {
    const response = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.statusText);
    }
}

const calculateFee = (amount) => {
    let fee;
    if (amount <= 999) {
        fee = .98;
    } else if (amount <= 1299 && amount >= 1000) {
        fee = .9825;
    } else if (amount <= 1699 && amount >= 1300) {
        fee = .985;
    } else if (amount <= 2000 && amount >= 1700) {
        fee = .9875;
    } else if (amount <= 2500 && amount >= 2001) {
        fee = 0.99;
    } else if (amount <= 2750 && amount >= 2501) {
        fee = 0.991;
    } else if (amount <= 3000 && amount >= 2751) {
        fee = 0.9917;
    } else if (amount <= 6000 && amount >= 3001) {
        fee = 0.992;
    } else if (amount <= 9000 && amount >= 6001) {
        fee = 0.9925;
    } else if (amount <= 9999 && amount >= 9001) {
        fee = 0.993;
    } else if (amount <= 12499 && amount >= 10000) {
        fee = 0.9931;
    } else if (amount <= 14999 && amount >= 12500) {
        fee = 0.9932;
    } else if (amount <= 17499 && amount >= 15000) {
        fee = 0.9933;
    } else if (amount <= 24999 && amount >= 17500) {
        fee = 0.9934;
    } else if (amount <= 59999 && amount >= 25000) {
        fee = 0.9935;
    } else if (amount >= 60000) {
        fee = 0.995;
    }
    return fee
}


const calculateExchange = (amount, rate) => {
    return Number((amount * rate).toFixed(3))
}
const getSpecificRate = (obj, specificRate) => {
    let ourRate;
    switch (specificRate) {
        case `ILS`:
            ourRate = obj.ILS
            break;
        case `USD`:
            ourRate = obj.USD
            break;
        case `AUD`:
            ourRate = obj.AUD
            break;
        case `CAD`:
            ourRate = obj.CAD
            break;
        case `CHF`:
            ourRate = obj.CHF
            break;
        case `EUR`:
            ourRate = obj.EUR
            break;
        case `GBP`:
            ourRate = obj.GBP
            break;
    }
    return Number(ourRate.toFixed(3))
}

const displayFee = (amount, fee) => {
    return Number((amount * (1 - fee).toFixed(3)));
}

const configureResult = (number) => {
    const numberWithComma = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numberWithComma;
}
const getResult = async (amount, soldCurrency, boughtCurrency, input) => {
    const rates = await getRate(soldCurrency);
    const specificRate = getSpecificRate(rates.rates, boughtCurrency)
    const fee = calculateFee(amount);
    const newRate = Number(specificRate * fee).toFixed(3);
    const displayedFee = displayFee(amount, fee)
    rateDisplay.textContent = newRate;
    feeDisplay.innerHTML = `${displayedFee} <span class='smaller'>${sellCurrencies.value}</span>`;
    const result = calculateExchange(amount, newRate);
    const configuredResult = configureResult(result)
    input.value = configuredResult;


}

sellInpt.addEventListener(`keyup`, () => {
    let sellAmount = sellInpt.value;
    let sellCurrency = sellCurrencies.value;
    let buyCurrency = buyCurrencies.value;

    getResult(sellAmount, sellCurrency, buyCurrency, buyInpt)
})
buyInpt.addEventListener(`keyup`, () => {
    let buyAmount = buyInpt.value;
    let sellCurrency = sellCurrencies.value;
    let buyCurrency = buyCurrencies.value;

    getResult(buyAmount, buyCurrency, sellCurrency, sellInpt)
})


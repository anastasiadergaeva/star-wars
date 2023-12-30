const search = document.querySelector('.search');
const numberInput = document.querySelector('.number-input');
const button = document.querySelector('.submit-button');
const resultError = document.querySelector('.result__error');
const loader = document.querySelector('.result__loader');
const result = document.querySelector('.result__search');
console.log(resultError);

function checkInputs() {
    try {
        if (numberInput.value > 10 || numberInput === ' ') {
            throw new Error('Введите число от 1 до 10.');
        } else if (search.value === 'choiseto') {
            throw new Error('Выберите категорию');
        }
        resultError.textContent = '';
        result.textContent = '';
        console.log(numberInput.value);
        loader.classList.add('active');
        setTimeout(() => {
            loader.classList.remove("active");
            loader.classList.add("hide");
        }, 600);
    } catch (error) {
        resultError.textContent = `${error.message}`;
        console.log(error.message);
        console.log(`${error.message} Вы ввели число ${numberInput.value}`);
    }
}

function cleanInputs() {
    numberInput.textContent = '';
    search.textContent = '';
}

function makeURL() {
    return `https://swapi.dev/api/${search.value}/${numberInput.value}/`;
}

async function takeAnswer() {
    const answer = await fetch(makeURL());
    const data = await answer.json();
    try {
        if (data.name === undefined) {
            result.textContent = `Результат поиска: ${data.title}`;
        } else {
            result.textContent = `Результат поиска: ${data.name}`;
        }
        console.log(data);
    } catch (error) {
        checkInputs();
    }
}

button.addEventListener('click', function () {
    checkInputs();
    takeAnswer();
})
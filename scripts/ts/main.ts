// {
//     // Task1 ===============================

//     let city: string = 'Kyiv';
//     city = 'Lviv';
//     let address: string = city;

//     console.log(address);


//     // Task 2 ==============================

//     let n: number = +prompt('Enter a number');
//     console.log( n === 0 
//         ? 'Zero' 
//         : n % 2 === 0 ? 'Even' : 'Odd');

//     // Task 3 ==============================

//     function max(...args: Array<number>): number {
//         return Math.max(...args);
//     }


//     console.log('max =>', max(1,2,3,5,5));

//     // Task 4 ==============================

//     function sqrt(n: any): any {
//         if(!isNaN(Number(n))) {
//             throw TypeError('Wrong argument type!');
//         } else {
//             return Math.sqrt(n);
//         }
//     }
// }

// Task 5 ==============================

let form: HTMLFormElement = document.forms[0];
let input: HTMLInputElement = form.badWord;
let addBtn: HTMLButtonElement = form.addWord;
let resetBtn: HTMLButtonElement = form.resetWords;
let censorBtn: HTMLButtonElement = form.censor;
let result: HTMLTextAreaElement = form.result;
let words: HTMLElement = document.querySelector('#bad-words span:nth-child(2)');
let originalText = result.value;
let censored = false;


form.addEventListener('submit', (event): void => {
    event.preventDefault()
    if(/^\w+$/.test(input.value)) {
        if(words.textContent) {
            words.textContent += ', ' + input.value;
        } else {
            words.textContent += input.value;
        }
        input.value = '';
    }
});

form.addEventListener('reset', (): void => {
    words.textContent = '';
});

censorBtn.addEventListener('click', () => {
    if(result.value) {
        let str = words.textContent.split(', ').join('|');
        str = `\\b(${str})\\b`;
        let regex: RegExp = new RegExp(str, 'gi');
        let replacer = (match: string): string => {
            return "*".repeat(match.length);
        }
        result.value = result.value.replace(regex, replacer);
        censored = true;
    }
});

result.addEventListener('blur', function() {
    if(!censored) {
        originalText = result.value;
    }
});

form.cancel.addEventListener('click', function() {
    result.value = originalText;
    censored = false;
});






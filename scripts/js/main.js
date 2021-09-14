let form = document.forms[0];
let input = form.badWord;
let addBtn = form.addWord;
let resetBtn = form.resetWords;
let censorBtn = form.censor;
let result = form.result;
let words = document.querySelector('#bad-words span:nth-child(2)');
let originalText = result.value;
let censored = false;
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (/^\w+$/.test(input.value)) {
        if (words.textContent) {
            words.textContent += ', ' + input.value;
        }
        else {
            words.textContent += input.value;
        }
        input.value = '';
    }
});
form.addEventListener('reset', () => {
    words.textContent = '';
});
censorBtn.addEventListener('click', () => {
    if (result.value) {
        let str = words.textContent.split(', ').join('|');
        str = `\\b(${str})\\b`;
        let regex = new RegExp(str, 'gi');
        let replacer = (match) => {
            return "*".repeat(match.length);
        };
        result.value = result.value.replace(regex, replacer);
        censored = true;
    }
});
result.addEventListener('blur', function () {
    if (!censored) {
        originalText = result.value;
    }
});
form.cancel.addEventListener('click', function () {
    result.value = originalText;
    censored = false;
});

const calcForm = document.querySelector('.calc');
const calcAddTime = document.querySelector('.calc__actions__add-time');
const calcReset = document.querySelector('.calc__actions__reset');
const calcList = document.querySelector('#calc-list');
const modal = document.querySelector('.modal');
const modalContentsText = document.querySelector('.modal__contents__text');

let timeInputCount = 0;

const calcAddTimeClickHandler = (e) => {
    if (e) e.preventDefault();
    calcList.insertAdjacentHTML(
        'beforeend',
        `
            <div class="calc__input-form-wrapper">
                <div class="calc__input-form">
                    <label class="calc__input-form__label" for="time${++timeInputCount}">稼働開始</label>
                    <input placeholder="hh:mm" class="calc__input-form__input" id="time${timeInputCount}" type="time" name="time[]">
                </div>
                <div class="calc__input-form">
                    <label class="calc__input-form__label" for="time${++timeInputCount}">稼働終了</label>
                    <input placeholder="hh:mm" class="calc__input-form__input" id="time${timeInputCount}" type="time" name="time[]">
                </div>
            </div>
        `,
    );
}

calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    modal.style.display = "block";
    let sum = '00:00:00';
    for (let i = 2; i <= timeInputCount; i += 2) {
        sum = timeMath.sum(
            sum,
            timeMath.sub(
                `${document.querySelector(`#time${timeInputCount < i + 1 ? i : i + 1}`).value}:00`,
                `${document.querySelector(`#time${i}`).value}:00`,
            ),
        );
    }
    modalContentsText.innerHTML = sum;
});
calcReset.addEventListener('click', (e) => {
    e.preventDefault();
    calcList.innerHTML = '';
    timeInputCount = 0;
    calcAddTimeClickHandler(undefined);
});
modal.addEventListener('click', (e) => {
    modal.style.display = "none";
});
calcAddTime.addEventListener('click', calcAddTimeClickHandler);
calcAddTimeClickHandler(undefined);
import { calculateTotal, formatCurrency, calculateTip, isNumber } from './utils';

let tipBtns: NodeListOf<HTMLDivElement>;
let tipMessage: HTMLDivElement;
let clickedTipBtn: HTMLDivElement;
let billAmtInput: HTMLInputElement;
let billAmtText: HTMLDivElement;
let tipPercentText: HTMLDivElement;
let amtOfTipText: HTMLDivElement;
let totalPaid: HTMLDivElement;
let customTipForm: HTMLDivElement;
let customTipAmtInput: HTMLInputElement;

let tipString: string;
let billAmt: number;
let customTipAmt: number;

export function runApp() {
    tipBtns = document.querySelectorAll('.tip-btn') as NodeListOf<HTMLDivElement>;
    tipMessage = document.querySelector('#tip-message') as HTMLDivElement;
    billAmtInput = document.querySelector('#bill-amt-input') as HTMLInputElement;
    billAmtText = document.querySelector('#bill-amt-text') as HTMLDivElement;
    tipPercentText = document.querySelector('#tip-percent-text') as HTMLDivElement;
    amtOfTipText = document.querySelector('#amt-of-tip-text') as HTMLDivElement;
    totalPaid = document.querySelector('#total-paid') as HTMLDivElement;
    customTipForm = document.querySelector('#customTipForm') as HTMLDivElement;
    customTipAmtInput = document.querySelector('#customTipAmt') as HTMLInputElement;
    billAmt = 0;
    customTipAmt = 0;
    tipString = '0';
    customTipForm.hidden = true;

    billAmtInput.addEventListener('keyup', handleTextChange);
    customTipAmtInput.addEventListener('keyup', handleCustomTipChange);

    const storedTipAmt = localStorage.getItem('selected-tip-amt');
    if (storedTipAmt) {
        tipBtns.forEach((tipBtn) => {
            if (tipBtn.dataset.amt === storedTipAmt) {
                clickedTipBtn = tipBtn;
                selectButton();
            }
        });
    } else {
        clickedTipBtn = tipBtns[0];
    }

    tipBtns.forEach((tipBtn, index) => {
        tipBtn.addEventListener('click', handleClick);
    });
    updateMessageText();
}

function handleTextChange(e: any) {
    const billAmtInputVal = billAmtInput.value;
    if (isNumber(billAmtInputVal)) {
        if (billAmtInput.classList.contains('is-invalid')) {
            billAmtInput.classList.toggle('is-invalid');
        }
        billAmt = parseFloat(billAmtInputVal);
        updateMessageText();
    } else {
        if (!billAmtInput.classList.contains('is-invalid')) {
            billAmtInput.classList.toggle('is-invalid');
        }
        clearCalculatedValues();
    }
}

function handleCustomTipChange(e: any) {
    tipString = customTipAmtInput.value;
    if (isNumber(tipString)) {
        if (customTipAmtInput.classList.contains('is-invalid')) {
            customTipAmtInput.classList.toggle('is-invalid');
        }
        updateMessageText();
    } else {
        if (!customTipAmtInput.classList.contains('is-invalid')) {
            customTipAmtInput.classList.toggle('is-invalid');
        }
        clearCalculatedValues();
    }
}

function handleClick(e: any) {
    // clickedTipBtn.classList.toggle('disabled');
    clickedTipBtn = this as HTMLDivElement;
    selectButton();
    updateMessageText();
}

function selectButton() {
    tipBtns.forEach(btn => {
        if (btn.classList.contains('disabled')) {
            btn.classList.toggle('disabled');
        }
    });
    clickedTipBtn.classList.toggle('disabled');

    localStorage.setItem('selected-tip-amt', clickedTipBtn.dataset.amt);

    if (clickedTipBtn.dataset.amt === 'custom') {
        customTipForm.hidden = false;
        customTipAmtInput.value = '';
        tipString = '0';
    } else {
        customTipForm.hidden = true;
        tipString = clickedTipBtn.dataset.amt;
    }
}

function updateMessageText() {
    if (clickedTipBtn.dataset.amt !== 'custom') {
        tipString = clickedTipBtn.dataset.amt;
    }
    tipMessage.innerText = tipString;
    tipPercentText.innerText = tipString;

    billAmtText.innerText = formatCurrency(billAmt);

    const tipPercent = parseInt(tipString);
    const tipAmt = calculateTip(billAmt, tipPercent);
    amtOfTipText.innerText = formatCurrency(tipAmt);

    const totalAmt = calculateTotal(billAmt, tipAmt);
    totalPaid.innerText = formatCurrency(totalAmt);
}

function clearCalculatedValues() {
    // billAmt = 0;
    tipMessage.innerText = '0';
    tipPercentText.innerText = '0';
    billAmtText.innerText = formatCurrency(0);
    amtOfTipText.innerText = formatCurrency(0);
    totalPaid.innerText = formatCurrency(0);
}

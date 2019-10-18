export function ready(cb: () => void) {
    document.onreadystatechange = function () {
        if (document.readyState === 'interactive') {
            cb();
        }
    };
}

export function isNumber(value: string | number): boolean {
    const valuesAsNum = Number(value.toString());
    return ((value !== '') && (value != null) && !isNaN(valuesAsNum) && (valuesAsNum > 0));
}

export function formatCurrency(num: number) {
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function calculateTip(billAmt: number, tipPercent: number) {
    return billAmt * tipPercent * 0.01;
}

export function calculateTotal(billAmt: number, tipAmt: number) {
    return billAmt + tipAmt;
}



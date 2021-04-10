input.onButtonPressed(Button.A, function () {
    basic.clearScreen();
    if (minutes === 0) {
        minutes = 1;
    }
    let seconds = minutes * 60;
    isRunning = true;
    while (seconds > 0 && isRunning) {
        renderSeconds(seconds);
        renderMinutes(seconds);
        renderSubSeconds();
        basic.pause(100);
        seconds = seconds - 0.1;
    }

    for(let i = 0; i < 5; i++) {
        basic.showIcon(IconNames.Heart, 1000);
        basic.showIcon(IconNames.Skull, 1000);
    }
    basic.clearScreen();
})

input.onButtonPressed(Button.AB, function () {
    isRunning = false;
    minutes = 0;
})

input.onButtonPressed(Button.B, function () {
    isRunning = false;
    minutes++;
    minutes = minutes % 21;
    if (minutes === 0) {
        minutes = 1;
    }
    basic.showNumber(minutes);
})

let minutes = 0;
let isRunning = false;

const padPartial = (n: string): string => {
    if (n.length === 1) {
        return `0${n}`;
    }
    return n;
}

const renderSeconds = (seconds: number): void => {
    const m = padPartial(Math.trunc(seconds % 60).toString());
    getArray(m[0], 2);
    getArray(m[1], 3);
}

const renderMinutes = (seconds: number): void => {
    const m: string = padPartial(Math.trunc(seconds / 60).toString());
    getArray(m[0], 0);
    getArray(m[1], 1);
}

const getArray = (numString: string, pIndex: number): void => {
    let num: number = parseInt(numString, 10);
    for(let i = 4; i >= 0; i--) {
        const rem = num % 2;
        rem ? led.plot(pIndex, i) : led.unplot(pIndex, i);
        num = Math.trunc(num / 2);
    }
}
let quickIndex = 0;
const renderSubSeconds = () => {
    for(let i = 0; i < 5; i++) {
        led.unplot(4, i);
    }
    led.plotBrightness(4, quickIndex, 25);
    quickIndex++;
    quickIndex = quickIndex % 5;
}

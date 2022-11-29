export const randNumRange = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const getXPosition = (width, divisor) => {
    let x = randNumRange(0, (width / divisor));

    return x
}

export const getYPosition = (height, divisor) => {
    let y = randNumRange(0, (height / divisor));

    return y
}
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

export function getImgSize(imgName) {
    let parts = imgName.split('-');
    let width = parseInt(parts[2])
    let height = parseInt(parts[3])

    return [width, height]
}
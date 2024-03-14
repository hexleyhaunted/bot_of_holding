const isBohCommand = (text) => {
    return text.startsWith("boh");
}

const isConvertCommand = (commandArray) => {
    return commandArray.includes("convert");
}

const normaliseText = (text) => {
    return text.toLowerCase();
}

const getCommandArray = (text) => {
    return normaliseText(text)?.split(" ");
}

const askedNicely = (commandArray) => {
    return commandArray.includes("please") || commandArray.includes("kindly")
}

module.exports = {
    isBohCommand,
    isConvertCommand,
    normaliseText,
    getCommandArray,
    askedNicely
}
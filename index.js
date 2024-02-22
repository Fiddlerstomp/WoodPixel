const tools = {
    pencil: "pencil",
    eraser: "eraser",
    color_picker: "color-picker"
};

const state = {
    currentTool: tools.pencil,
    color: `rgb(${255}, ${0}, ${0})`
}

function newFileClickHandler() {
    console.log("new file hadler");

    makeCreateImageWindow();
}

function makeCreateImageWindow() {
    console.log("make new window");

    const newWindow = document.createElement("div");
    newWindow.classList.add("new-file-window");

    const heightInput = document.createElement("input");
    heightInput.id = "height"
    heightInput.setAttribute("type", "number");
    heightInput.setAttribute("placeholder", "Height");

    const widthInput = document.createElement("input");
    widthInput.id = "width"
    widthInput.setAttribute("type", "number");
    widthInput.setAttribute("placeholder", "Width");

    const submit = document.createElement("button");
    submit.innerText = "Create";
    submit.addEventListener("click", createPictureClickHandler);

    newWindow.appendChild(heightInput);
    newWindow.appendChild(widthInput);
    newWindow.appendChild(submit);
    document.body.appendChild(newWindow);
}

function createPictureClickHandler() {
    console.log("create picture hadler");

    const pictureSize = getHeightAndWidth();
    if (pictureSize) {
        document.querySelector(".new-file-window").remove();
        const matrix = document.querySelector("#matrix");
        if (matrix) {
            matrix.remove();
        }
        makeGrid(pictureSize.width, pictureSize.height);
    }
}

function getHeightAndWidth() {
    console.log("get params");

    const heightInput = document.querySelector("#height");
    const widthInput = document.querySelector("#width");
    const height = parseInt(heightInput.value);
    const width = parseInt(widthInput.value);
    if (isNaN(height) || isNaN(width)) {
        alert("Height and width must be number");
        return false;
    }

    return { height: height, width: width };
}

function makeGrid(width, height) {
    console.log("make grid");

    const totalCountPixels = width * height;

    const matrix = document.createElement("div");
    matrix.id = "matrix";
    matrix.style.gridTemplateColumns = `repeat(${width}, 35px)`;
    matrix.style.gridTemplateRows = `repeat(${height}, 35px)`;
    document.querySelector("#container").appendChild(matrix);

    for (let i = 0; i < totalCountPixels; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.index = i;
        pixel.addEventListener("click", pixelClickHandler);
        matrix.appendChild(pixel)
    }
}

function pencilButtonClickHandler() {
    console.log("pencil click");
    document.getElementById(state.currentTool + "-button").classList.remove("active-tool");
    document.getElementById("pencil-button").classList.add("active-tool");
    state.currentTool = tools.pencil;
}

function eraserButtonClickHandler() {
    console.log("eraser click");
    document.getElementById(state.currentTool + "-button").classList.remove("active-tool");
    document.getElementById("eraser-button").classList.add("active-tool");
    state.currentTool = tools.eraser;
}

function pixelClickHandler(event) {
    console.log("pixel hadler");

    const pixel = event.target;
    switch (state.currentTool) {
        case tools.pencil:
            pixel.style.backgroundColor = state.color;
            break;
        case tools.eraser:
            pixel.style.backgroundColor = "white";
            break;
    }
}

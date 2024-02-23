const tools = {
    pencil: "pencil",
    eraser: "eraser",
    color_picker: "color-picker"
};

const state = {
    currentTool: tools.pencil,
    color: `rgb(${255}, ${0}, ${0})`,
    isMousedown: false,
    defaultColors: [
        "black",
        "red",
        "blue",
        "yellow",
        "pink"
    ],
    activeColorElement: null
};

window.onload = function() {
    makeColorMenu();
}

function makeColorMenu() {
    state.defaultColors.forEach(color => {
        const colorElement = document.createElement("div");
        colorElement.classList.add("color");
        colorElement.style.backgroundColor = color;
        colorElement.addEventListener("click", colorClickHandler);
        document.querySelector(".color-menu").appendChild(colorElement);
    });
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
    heightInput.id = "height";
    heightInput.setAttribute("type", "number");
    heightInput.setAttribute("placeholder", "Height");

    const widthInput = document.createElement("input");
    widthInput.id = "width";
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
        pixel.addEventListener("mousedown", pixelMousedownHandler);
        pixel.addEventListener("mouseup", pixelMouseupHandler);
        pixel.addEventListener("mouseover", pixelMouseoverHandler);
        matrix.appendChild(pixel);
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

function colorClickHandler(event) {
    console.log("color click");
    const colorElement = event.target;
    colorElement.classList.add(colorElement.style.backgroundColor !== "black" ? "color-active" : "color-active-black");
    state.color = colorElement.style.backgroundColor;
    if (state.activeColorElement) {
        state.activeColorElement.classList.remove(state.activeColorElement.style.backgroundColor !== "black" ? "color-active" : "color-active-black");
    }
    state.activeColorElement = colorElement;
    console.log(colorElement.style.backgroundColor);
}

function workWithPixel(pixel) {
    console.log("pixel hadler");

    switch (state.currentTool) {
        case tools.pencil:
            pixel.style.backgroundColor = state.color;
            break;
        case tools.eraser:
            pixel.style.backgroundColor = "white";
            break;
    }
}

function pixelMousedownHandler(event) {
    state.isMousedown = true;
    workWithPixel(event.target);
}

function pixelMouseupHandler() {
    state.isMousedown = false;
}

function pixelMouseoverHandler(event) {
    if (state.isMousedown) {
        workWithPixel(event.target);
    }
}

function newFileClickHandler() {
    makeCreateImageWindow();
}

function makeCreateImageWindow() {
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
        matrix.appendChild(pixel)
    }
}

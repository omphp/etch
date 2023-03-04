const gridContainer = document.getElementById("gridContainer");

for (let index = 0; index < 16; index++) {
    const element = document.createElement("div");
    gridContainer.appendChild(element);
    console.log(index)
}
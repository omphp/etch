const gridContainer = document.getElementById("gridContainer");

for (let indexM = 1; indexM <= 16; indexM++) {
    for (let indexS = 1; indexS <= 16; indexS++) {
            const element = document.createElement("div");
            element.className = "properties";
            element.addEventListener("mouseover", rainbow);
            gridContainer.appendChild(element);
        }
    }

function makeGrid()
{
    gridContainer.innerHTML = "";
    const nGrids = Number(document.getElementById("quantity").value);
    for (let indexM = 1; indexM <= nGrids; indexM++) {
        for (let indexS = 1; indexS <= nGrids; indexS++) {
                const element = document.createElement("div");
                element.className = "properties";
                element.style.width = 100/nGrids + "%";
                element.style.height = 100/nGrids + "%";
                element.addEventListener("mouseover", rainbow);
                gridContainer.appendChild(element);
            }
    }
}

function darken(e)
{
    e.target.style.backgroundColor = "black";
}

function shade(e)
{
    let currentColor = window.getComputedStyle(e.target).backgroundColor;
    let rgb = currentColor.substring(4, currentColor.length-1).replaceAll(' ','').split(',');
    let r,g,b;
    r = ((Number(rgb[0])/255) * 100) - 10;
    g = ((Number(rgb[1])/255) * 100) - 10;
    b = ((Number(rgb[0]/255)) * 100) - 10;
    e.target.style.backgroundColor = "rgb(" + r + "%," + g + "%," + b+ "%)";
}

function rainbow(e)
{   
    let r,g,b;
    r = getRandomInt(256);
    g = getRandomInt(256);
    b = getRandomInt(256);
    e.target.style.backgroundColor = "rgb(" + r + "," + g + "," + b+ ")";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
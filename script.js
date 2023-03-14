const gridContainer = document.getElementById("gridContainer");
const body = document.getElementById("body");
const popup = document.getElementById("popup");
const rBtn = document.getElementById("rainbowBtn");
const darkenBtn = document.getElementById("darkenBtn")
const shadeBtn = document.getElementById("shadeBtn")
body.addEventListener("keydown", togglePop);
darkenBtn.disabled = true;

function togglePop(e){
    if (e.keyCode === 27)
    {
        if (popup.style.display === 'flex')
        {
            popup.style.display = 'none';
        }
        else
        {
            popup.style.display = 'flex';
            document.getElementById("quantity").focus();
        }
    }
}

function closePop(){
    if (popup.style.display === 'flex')
    {
        popup.style.display = 'none'
    }
    else
    {
        popup.style.display = 'flex'
    } 
}

for (let indexM = 1; indexM <= 16; indexM++) {
    for (let indexS = 1; indexS <= 16; indexS++) {
            const element = document.createElement("div");
            element.className = "properties";
            element.addEventListener("mousedown",darken);
            element.addEventListener("mousedown",addOverLstnr);
            element.addEventListener("mouseup", removeOverLstnr);
            element.ondragstart = function() { return false; }
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
                element.addEventListener("mousedown", shadeBtn.disabled?shade:rainbowBtn.disabled?rainbow:darken);
                element.addEventListener("mousedown",addOverLstnr);
                element.addEventListener("mouseup", removeOverLstnr);
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


function validate() {
    const input = document.getElementById("quantity");
    const nGrids = Number(document.getElementById("quantity").value);
    const reflect = document.getElementById("reflect");
    if (isNumeric(nGrids))
    {
        if (nGrids < 1)
        {
            input.style.borderBottomColor = 'red';
            input.style.color = 'red';
            reflect.innerText = 1;
        }
        else if (nGrids > 100)
        {
            input.style.borderBottomColor = 'red';
            input.style.color = 'red';
            reflect.innerText = 100;
        }
        else
        {
            input.style.borderBottomColor = 'black';
            input.style.color = 'black';
            reflect.innerText = nGrids;
            makeGrid()
        }
    }
}

function addLstnr(mode, name){
    if (name === "rainbow")
    {
        rBtn.disabled = true;
        darkenBtn.disabled = false;
        shadeBtn.disabled = false;
        addLstnrHelper(mode, darken, shade);
    }
    else if (name === "darken")
    {
        darkenBtn.disabled = true;
        rBtn.disabled = false;
        shadeBtn.disabled = false;
        addLstnrHelper(mode, rainbow, shade);
        
    }
    else if (name === "shade")
    {
        shadeBtn.disabled = true;
        darkenBtn.disabled = false;
        rBtn.disabled = false;
        addLstnrHelper(mode, rainbow, darken);
    }
}

function addLstnrHelper(mode, f1, f2) {
    const elements = document.getElementsByClassName("properties")
    Array.prototype.forEach.call(elements, element => {
        element.addEventListener("mousedown",mode);
        element.addEventListener("mousedown",addOverLstnr);
        element.addEventListener("mouseup", removeOverLstnr);
        element.removeEventListener("mousedown", f1);
        element.removeEventListener("mousedown", f2);
    });
}

function addOverLstnr() {
    const elements = document.getElementsByClassName("properties")
    Array.prototype.forEach.call(elements, element => {
        element.addEventListener("mouseover", shadeBtn.disabled?shade:rainbowBtn.disabled?rainbow:darken);
    });
}

function removeOverLstnr() {
    const elements = document.getElementsByClassName("properties")
    Array.prototype.forEach.call(elements, element => {
        element.removeEventListener("mouseover", shadeBtn.disabled?shade:rainbowBtn.disabled?rainbow:darken);
    });
}

function clear1() {
    const elements = document.getElementsByClassName("properties")
    Array.prototype.forEach.call(elements, element => 
        {
            element.style.backgroundColor = "white";
        });
}

function isNumeric(str) {
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
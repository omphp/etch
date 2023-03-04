const gridContainer = document.getElementById("gridContainer");

for (let indexM = 1; indexM <= 16; indexM++) {
    for (let indexS = 1; indexS <= 16; indexS++) {
            const element = document.createElement("div");
            element.className = "properties";
            gridContainer.appendChild(element);
            console.log(indexS);
        }
    console.log(indexM);
    }
//Function to save operations into session storage
    export let saveIntoSessionStorage = (operation) => {

        //get all the previous calculations 
            let calculationHistory = JSON.parse(sessionStorage.getItem(history));
        //save operation into array
            calculationHistory.push(String(operation));
        //save array into sessionStorage
            sessionStorage.setItem(history, JSON.stringify(calculationHistory));
    }

//History button
    let btnHistory = document.getElementById("btnHistory");
    let historyPane = document.getElementById("historyPane");
    let historyPaneOpen = false;

    //Event Listener for btnHistory
    btnHistory.addEventListener("click", () => {
        //retrieve history array from sessionStorage
        let historyValues = JSON.parse(sessionStorage.getItem(history));
        let historyInfo =`<div>
                          <img src="./assets/images/copy.png" id="btnCopyAll" style="height: 2rem; margin-right: 0.5rem;" alt="copy icon" title="Copiar historial"></img>
                          <h3> Operaciones realizadas: </h3>
                          </div>`;

        let idCounter = 1;

        //iterate history array values
        for (const operation of historyValues) {
            historyInfo += `<article>
                            <img src="./assets/images/copy.png" class="btnCopy" id="btnCopy${idCounter}" style="height: 1.5rem; margin-right: 0.2rem;" title="Copiar operacion" alt="copy icon"></img>
                            <p id="result${idCounter}">${operation}</p>
                            </article>`;
                
            ++idCounter;
        }
        
        //Place array values in history Pane
        historyPane.innerHTML = historyInfo;

        //EventListener for btnCopyAll
        (document.getElementById("btnCopyAll")).addEventListener("click", () => {
            navigator.clipboard.writeText(historyValues);
        });

        //Event Listener for each copy operation button 
        if (historyValues.length > 0) {
            let groupBtnCopy = document.querySelectorAll(".btnCopy");
            let onlyOperation;

            //iterate through group of btnCopy
            groupBtnCopy.forEach( (btn, index) => {
                btn.addEventListener("click", () => {;
                    try {
                        //trim result, so only the operation are copied for re use
                        onlyOperation = ((document.getElementById(`result${index+1}`)).textContent).substring(0, ((document.getElementById(`result${index+1}`)).textContent).indexOf("=")); 
                        //copy operation into clipboard
                        navigator.clipboard.writeText(onlyOperation);
                    } catch (error) {
                        console.log("¡No se pudo copiar el valor!");
                    }
                });
            });
        };

        //toggle function for historyPane
        if (!historyPaneOpen) {
            historyPane.style = "display: block;";
            historyPaneOpen = true;
        } else {
            historyPane.style = "display: none;"
            historyPaneOpen = false;
        }
    });
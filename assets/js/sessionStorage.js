//HistoryPane
    let historyPane = document.getElementById("historyPane");

//Function for displaying sessionStorage data into historyPane
    let displayData = () => {

        let historyValues;
        
        // Check if the sessionStorage data exists
            if (sessionStorage.getItem("history") !== null) {
                //retrieve history array from sessionStorage
                historyValues = JSON.parse(sessionStorage.getItem("history"));
            } else {
                // Initialize history array if it doesn't exist
                historyValues = [];
            }

        let historyInfo =`<div>
                            <img src="./assets/images/copy.png" id="btnCopyAll" style="height: 2rem; margin-right: 0.5rem; cursor: pointer;" alt="copy icon" title="Copiar historial"></img>
                            <h3> Operaciones realizadas: </h3>
                        </div>`;

        //placeholder to indicate no operation was made yet
        if (historyValues.length === 0) {
            historyInfo += `<div>
                                <p style="color: rgba(83, 85, 85, 0.5); margin: 0px auto;"> Aún no has realizado ninguna operación. </p>
                            </div>`;
        }
                        
        let idCounter = 1;

        //iterate history array values
        for (const operation of historyValues) {
            historyInfo += `<article>
                                <img src="./assets/images/copy.png" class="btnCopy" id="btnCopy${idCounter}" style="height: 1.5rem; margin-right: 0.4rem; cursor: pointer;" title="Copiar operacion" alt="copy icon"></img>
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
    };

//Function to save operations into session storage
    export let saveIntoSessionStorage = (operation) => {

        //get all the previous calculations 
            let calculationHistory = JSON.parse(sessionStorage.getItem("history"));
        //save operation into array
            calculationHistory.push(String(operation));
        //save array into sessionStorage
            sessionStorage.setItem("history", JSON.stringify(calculationHistory));
        //Update data in HistoryPane
            displayData();
    }

//Event Listener for btnHistory
    let historyPaneOpen = false;

    btnHistory.addEventListener("click", () => {

        displayData();

        //toggle function for historyPane

        if (!historyPaneOpen) {
            historyPane.style = "display: block;";
            historyPaneOpen = true;
        } else {
            historyPane.style = "display: none;"
            historyPaneOpen = false;
        }
    });
//Create sessionStorage array for operations history
    sessionStorage.setItem(history, "[]");

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

    btnHistory.addEventListener("click", () => {
        let historyValues = JSON.parse(sessionStorage.getItem(history));
        let historyInfo =`<h3> Operaciones realizadas: </h3>`;

        for (const operation of historyValues) {
            historyInfo += `<p>${operation}</p>`;
        }

        historyPane.innerHTML = historyInfo;


        if (!historyPaneOpen) {
            historyPane.style = "display: block;";
            historyPaneOpen = true;
        } else {
            historyPane.style = "display: none;"
            historyPaneOpen = false;
        }
    });
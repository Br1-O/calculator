import { saveIntoSessionStorage } from "./sessionStorage.js";

//Display
    export let display = document.getElementById("display");
    let operationsDisplay = document.getElementById("secondaryDisplay");

//function to take off focus from element
    export let undoFocus = (btn) => {
        //Take off Focus on Element
            setTimeout(() => {
                btn.blur();
            }, 150);
    }
    
//Reset Btn
    let btnReset = document.getElementById("btnReset");
    btnReset.addEventListener("click", () => {
            display.value= "0";
            operationsDisplay.innerHTML ="";
            display.style = "padding: 1rem";
        });

//Delete Btn
    let btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", () => {
        //check if there is a pending operation
            //if not, erase display's last number
            if (operationsDisplay.innerHTML == "") {
                //get display value
                    let displayOriginalValue = display.value;
                //create substring with last char deleted 
                    let valueWLastCharDeleted = displayOriginalValue.substr(0, displayOriginalValue.length-1);
                //check if all digits where deleted
                if (valueWLastCharDeleted.length!==0) {
                    //update display value
                    display.value = valueWLastCharDeleted;
                } else {
                    //update display value to zero is no digit remains
                    display.value = 0;
                }
            //if there is a pending operation, cancel that operation
            } else {
                // Get the value inside the <p> tag of operationsDisplay
                    let operationsDisplayValue = operationsDisplay.querySelector('p').textContent;
                //remove last sign added at the end
                    // let operationsDisplayLastSign = operationsDisplayValue.charAt(operationsDisplayValue.length-1);
                    operationsDisplayValue = operationsDisplayValue.slice(0,-1);
                //erase operationsDisplay value and change display value
                    operationsDisplay.innerHTML = "";
                    display.style = "padding: 1rem";
                    display.value= operationsDisplayValue;

            }
    });

//Change Sign Btn
    let btnChangeSign = document.getElementById("btn+-");
    btnChangeSign.addEventListener("click", () => {
        //get display value
            let displayOriginalValue = display.value;

        //Not taking 0 into account
            if (displayOriginalValue=="0" || displayOriginalValue==".") {
                display.value=displayOriginalValue;
            }else{
                //regex for ONLY numbers
                    const numberRegex = /[-.]|\d+|\d*\.\d+/g;
                let isOnlyNumber;

                for (const char of displayOriginalValue) {
                    //Refresh the last index so the iteration starts the test() always at index 0
                        numberRegex.lastIndex = 0;
                    //check if is only numbers in the display
                        isOnlyNumber = numberRegex.test(char);
                    //if not, break loop so isOnlyNumber remains false
                    if (!isOnlyNumber) {
                        break;
                    }
                }
                
                //if they are only numbers, change/remove the sign
                    if(isOnlyNumber){
                        if(displayOriginalValue.charAt(0) !== "-"){
                            display.value= "-" + displayOriginalValue;
                        }else{
                            display.value= displayOriginalValue.substr(1, displayOriginalValue.length);
                        }
                    }
            }
        //Take off Focus on Element
            undoFocus(btnChangeSign);
    });


//Restriction to only number characters function for display
    display.addEventListener("keydown", () => {
        //get original display value
            let displayOriginalValue = display.value;
        //get key from event
            let key = event.key;
        //regex for numbers/operations
            const numberRegex = /[-+*/.]|\d+|\d*\.\d+/g;
        //test if key is in regex for numbers/signs allowed
            let isOnlyNumber = numberRegex.test(key);

        //if not a number nor another allowed key, prevent input
        if (!isOnlyNumber && key!="Backspace") {
                event.preventDefault();
                display.value=displayOriginalValue;
            }
    });



//Input Function for dot button
    btnDot.addEventListener("click", () => {
        //check if there is not already 1 dot in display value
        if (!((display.value).includes("."))) {
            //Display Value
                let displayValue = display.value;
            //concatenate btnValue to displayValue 
                displayValue += ".";
                display.value = displayValue;
        }
        //Take off Focus on Element
            undoFocus(btnDot);
    });


//Operation Btns
    let btnAdd = document.getElementById("btnPlus");
    let btnMinus = document.getElementById("btnMinus");
    let btnMult = document.getElementById("btnMult");
    let btnDiv = document.getElementById("btnDiv");

    let btnPercent = document.getElementById("btnPercent");
    let btnSquare = document.getElementById("btnSquare");
    let btnCube = document.getElementById("btnCube");
    let btnSqRoot = document.getElementById("btnSqRoot");

    let btnEqual = document.getElementById("btnEqual");

//Operation functions
    //Single value operations
    
        //Square
            btnSquare.addEventListener("click", () => {
                let value = parseFloat(display.value);
                let result = value*value;
                if (!isNaN(result)) {
                    saveIntoSessionStorage(display.value+"²"+"="+result);
                    display.value=result;
                }
                //Take off Focus on Element
                    undoFocus(btnSquare);
            });
        //Cube
            btnCube.addEventListener("click", () => {
                let value = parseFloat(display.value);
                let result = value*value*value;
                if (!isNaN(result)) {
                    saveIntoSessionStorage(display.value+"³"+"="+result);
                    display.value=result;
                }
                //Take off Focus on Element
                    undoFocus(btnCube);
            });
        //Square root
            btnSqRoot.addEventListener("click", () => {
                let value = parseFloat(display.value);
                let result = Math.sqrt(value);
                if (isNaN(result)) {
                    display.value = "Entrada no válida"; 
                    setTimeout(() => {
                        display.value = "0";
                    }, 800);
                } else {
                    saveIntoSessionStorage("√"+display.value+"="+result);
                    display.value=result;
                }
                //Take off Focus on Element
                    undoFocus(btnSqRoot);  
            });
    
    //multiple value operations
        //Operations function
            let doOperation = (btnOperation, signOperation) => {
                btnOperation.addEventListener("click", () => {
                //check if a sum was already made before clicking "="
                    if (operationsDisplay.innerHTML == "") {
                        display.value += signOperation;
                        operationsDisplay.innerHTML = `<p>${display.value}</p>`;
                        display.style = "padding: 2rem 1rem 0.5rem 1rem";
                        display.value = "";
                    } else {
                        // Get the value inside the <p> tag of operationsDisplay
                            let operationsDisplayValue = operationsDisplay.querySelector('p').textContent;
                        //remove last sign added at the end
                            let operationsDisplayLastSign = operationsDisplayValue.charAt(operationsDisplayValue.length-1);
                            operationsDisplayValue = operationsDisplayValue.slice(0,-1);
                        //add new display value to the already existent (eval() evaluates an expression in string format), checking if value is not NaN
                            operationsDisplay.innerHTML = `<p>${eval(operationsDisplayValue+operationsDisplayLastSign+(display.value))+signOperation}</p>`;
                        //save into sessionStorage for calculations history
                            saveIntoSessionStorage(operationsDisplayValue+operationsDisplayLastSign+(display.value)+"="+eval(operationsDisplayValue+operationsDisplayLastSign+(display.value)));
                        //change display text position and value
                            display.style = "padding: 2rem 1rem 0.5rem 1rem";
                            display.value = "";
                    }
                    //Take off Focus on Element
                        undoFocus(btnOperation);
                });
            }

        //Adding function
            doOperation(btnAdd, "+");
            
        //Minus function
            doOperation(btnMinus, "-");

        //Multiplication function
            doOperation(btnMult, "*");

        //Division function
            doOperation(btnDiv, "/");

        //Percent function
            btnPercent.addEventListener("click", () => {
            //check if there is an operation made before
                if (operationsDisplay.innerHTML == "") {
                    display.value += "%";
                    operationsDisplay.innerHTML = `<p>${display.value}</p>`;
                    display.style = "padding: 2rem 1rem 0.5rem 1rem";
                    display.value = "";

                }else if(operationsDisplay.innerHTML !== "" && ["+","-","*","/"].includes((operationsDisplay.querySelector('p').textContent).charAt((operationsDisplay.querySelector('p').textContent).length-1))){
                    //Take off Focus on Element
                        undoFocus(btnPercent);
                    return null;
                } else {
                    // Get the value inside the <p> tag of operationsDisplay
                        let operationsDisplayValue = operationsDisplay.querySelector('p').textContent;
                    //remove last sign added at the end
                        operationsDisplayValue = operationsDisplayValue.slice(0,-1);
                    //save into sessionStorage for calculation history
                        saveIntoSessionStorage(operationsDisplayValue+"%"+display.value+"="+((display.value/operationsDisplayValue)*100));
                    //change display value
                        operationsDisplay.innerHTML = `<p>${((display.value/operationsDisplayValue)*100)+"%"}</p>`;
                        display.value = "";
                }
                //Take off Focus on Element
                    undoFocus(btnPercent);
            });
    
    //Equal function
        btnEqual.addEventListener("click", () => {

            let operationsDisplayValue;

            //check if there is a previous operation done
            if (operationsDisplay.innerHTML !== "") {

                // Get the value inside the <p> tag of operationsDisplay
                operationsDisplayValue = operationsDisplay.querySelector('p').textContent;

                //check if % is the operation
                if (operationsDisplayValue.includes("%")) {
                    // Get the value inside the <p> tag of operationsDisplay
                    let operationsDisplayValue = operationsDisplay.querySelector('p').textContent;
                    //remove last sign added at the end
                        operationsDisplayValue = operationsDisplayValue.slice(0,-1);
                    //save into sessionStorage for calculation history
                        saveIntoSessionStorage(operationsDisplayValue+"%"+display.value+"="+((display.value/operationsDisplayValue)*100));
                    //change display value
                        operationsDisplay.innerHTML = "";
                        display.style = "padding: 1rem";
                        display.value = (display.value/operationsDisplayValue)*100;
                    //Take off Focus on Element
                        undoFocus(btnPercent);
                } else if(operationsDisplayValue !== "" && !(operationsDisplayValue.includes("%"))) {
                //remove last sign added at the end
                    let operationsDisplayLastSign = operationsDisplayValue.charAt(operationsDisplayValue.length-1);
                    operationsDisplayValue = operationsDisplayValue.slice(0,-1);
                //add new display value to the already existent (eval() evaluates an expression in string format)
                    if (!(isNaN(eval(operationsDisplayValue+operationsDisplayLastSign+display.value)))) {
                        //save into sessionStorage for calculation history
                            saveIntoSessionStorage(operationsDisplayValue+operationsDisplayLastSign+display.value+"="+eval(operationsDisplayValue+operationsDisplayLastSign+display.value));
                        //change display value
                            display.value = eval(operationsDisplayValue+operationsDisplayLastSign+display.value);
                    } else {
                        display.value = "Entrada no válida."
                        setTimeout(() => {
                            display.value = "0";
                        }, 800);
                    }
                    operationsDisplay.innerHTML="";
                    display.style = "padding: 1rem";
                }

            } else {
                // Check if there is an expression in display to evaluate
                if (display.value !== "") {

                    //I created a new String, since strings are immutable in Js
                    let correctedDisplayValue = "";

                    //replace power signs for their operational equivalent, so when copying operations from history pane they can be re used
                    for (let i = 0; i < (display.value).length; i++) {

                        if (display.value[i] == "²") {
                            correctedDisplayValue += "**2";
                        } else if (display.value[i] == "³"){
                            correctedDisplayValue += "**3";
                        } else if (display.value[i] == "√"){

                            //add the next character after the sign before, so "**(1/2)"" can be add at the end
                            correctedDisplayValue += display.value[i+1];

                            //use flag variable to add counter to i at the end of second for loop, so its value is not affected during the second loop
                            let addToI=1;

                            //check if the next character is also a number, if so, add it at after the last number but before the sign
                            for (let index = 2; index-2 < ((display.value).substr(i+2, ((display.value).length)-(i+1)).length); index++) {
                        
                                if (!isNaN(display.value[i+index])) {
                                    correctedDisplayValue += display.value[i+index];
                                    ++addToI;
                                } else {
                                    break;
                                }
                            }
                            
                            correctedDisplayValue += "**(1/2)";
                            i+=addToI;
                        }else{
                            correctedDisplayValue += display.value[i];
                        }
                    }
                    //if the calculation is invalid, it will don't perfom it. Otherwise, it will proceed as usual.
                    if (isNaN(eval(correctedDisplayValue))) {
                        return;
                    } else {
                        //save into sessionStorage for calculation history
                        saveIntoSessionStorage(display.value + "=" + eval(correctedDisplayValue));
                        //show result into display
                        display.value = eval(correctedDisplayValue);
                    }
                }
            }

        });


//Event Listener for keyboard
    document.addEventListener('keydown', (event) => {
        // Check if the pressed key is a number/operation key
            if (/^[+\-*/.=\d]+$/.test(event.key)) {

                //Erase initial zero value
                if (display.value === "0") {
                    display.value = "";
                }
                // Focus display
                display.focus();
                // Put cursor at the end of values
                display.setSelectionRange((display.value).length, (display.value).length);

            }else if(event.key === "Backspace"){

                //avoid backspace key to be able to erase base zero on display
                if ((display.value).length === 1) {
                    if (display.value !== "0") {
                        event.preventDefault();
                        display.value = "0";
                    }else{
                        event.preventDefault();
                    }
                }
            } else if(event.key === "Enter"){
                //trigger event for btnEqual when either Enter key is pressed
                btnEqual.click();
            }
    });

//Event Listener for paste event
    display.addEventListener('paste', (event) => {

        //Erase initial zero value
        if (display.value === "0") {
            display.value = "";
        }

        // Focus display
        display.focus();

    });  
import { display, undoFocus } from "./operations.js";

//Input Function
    let inputFunction = (element, event, btnValue, shownValue) => {
        element.addEventListener(event, () => {
            //Display Value
                let displayValue = shownValue.value;
            //Not taking left 0 into account
                if (displayValue=="0") {
                    displayValue="";
                }
            //concatenate btnValue to displayValue 
                displayValue += btnValue;
                shownValue.value = displayValue;

            //Take off Focus on Element
                undoFocus(element);
        });
    }

//Number Btns
    let btn9 = document.getElementById("btn9");
    let btn8 = document.getElementById("btn8");
    let btn7 = document.getElementById("btn7");
    let btn6 = document.getElementById("btn6");
    let btn5 = document.getElementById("btn5");
    let btn4 = document.getElementById("btn4");
    let btn3 = document.getElementById("btn3");
    let btn2 = document.getElementById("btn2");
    let btn1 = document.getElementById("btn1");
    let btn0 = document.getElementById("btn0");
    let btnDot = document.getElementById("btnDot");

//Number input functions assignation
    inputFunction(btn9, "click", "9", display);
    inputFunction(btn8, "click", "8", display);
    inputFunction(btn7, "click", "7", display);
    inputFunction(btn6, "click", "6", display);
    inputFunction(btn5, "click", "5", display);
    inputFunction(btn4, "click", "4", display);
    inputFunction(btn3, "click", "3", display);
    inputFunction(btn2, "click", "2", display);
    inputFunction(btn1, "click", "1", display);
    inputFunction(btn0, "click", "0", display);





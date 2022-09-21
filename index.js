/**
 * File: index.js
 * Name: Samuel Claflin
 * Email: samuel_claflin@student.uml.edu
 * Date: 9/21/2022
 */

/**
 * Globals
 */

// Numerical Values
const argMin = -50;
const argMax = 50;

// CSS Classes
const invalidInputClass = "invalid-input";

// HTML Elements
const form = document.getElementById("main-form");
const table = document.getElementById("main-table");
const errorBox = document.getElementById("error-box");
const multiplierMinimumInput = document.getElementById("multiplier-minimum");
const multiplierMaximumInput = document.getElementById("multiplier-maximum");
const multiplicandMinimumInput = document.getElementById("multiplicand-minimum");
const multiplicandMaximumInput = document.getElementById("multiplicand-maximum");

/**
 * Classes
 */

class Range {
    constructor(min, max) {
        this.arr = [];
        for (let i = min; i <= max; i++) {
            this.arr.push(i);
        }
        this.length = this.arr.length;
    }
}

/**
 * Functions
 */

// Entry point
const main = () => {
    // Add event listeners
    form.addEventListener("submit", handleSubmitButtonClicked);
};

// Submit button on-click event handler
const handleSubmitButtonClicked = (e) => {
    // Prevent the page from reloading upon form submission
    e.preventDefault();

    // Retrieve form data
    const multiplierMinimum = +multiplierMinimumInput.value
    const multiplierMaximum = +multiplierMaximumInput.value;
    const multiplicandMinimum = +multiplicandMinimumInput.value;
    const multiplicandMaximum = +multiplicandMaximumInput.value;

    // Validate the form data
    if (!isFormDataValid(multiplierMinimum, multiplierMaximum, multiplicandMinimum, multiplicandMaximum)) {
        return;
    }
    removeErrorIndicators();

    // Generate the ranges of values from the form data
    const multiplierRange = new Range(multiplierMinimum, multiplierMaximum);
    const multiplicandRange = new Range(multiplicandMinimum, multiplicandMaximum);

    // Generate the HTML table
    generateTable(multiplierRange, multiplicandRange);
};

const isFormDataValid = (min1, max1, min2, max2) => {
    // Helpers
    const handleInvalidValueError = (element) => {
        element.classList.add(invalidInputClass);
        errorBox.innerHTML += "<p>Ensure that all values are integers.</p><br>";
    };
    const handleOutOfRangeError = (element) => {
        element.classList.add(invalidInputClass);
        errorBox.innerHTML += "<p>Ensure that all values are in the range [-50, 50].</p><br>";
    };
    const handleInvalidRangeError = (element1, element2) => {
        element1.classList.add(invalidInputClass);
        element2.classList.add(invalidInputClass);
        errorBox.innerHTML += "<p>Invalid range provided.</p><br>";
    };

    // Success flag
    let isValid = true;

    // Remove existing error indicators
    removeErrorIndicators();

    // Validate all values
    if (Number.isNaN(min1)) {
        handleInvalidValueError(multiplierMinimumInput);
        isValid = false;
    } else if (min1 < argMin) {
        handleOutOfRangeError(multiplierMinimumInput);
        isValid = false;
    }
    if (Number.isNaN(max1)) {
        handleInvalidValueError(multiplierMaximumInput);
        isValid = false;
    } else if (max1 > argMax) {
        handleOutOfRangeError(multiplierMaximumInput);
        isValid = false;
    }
    if (Number.isNaN(min2)) {
        handleInvalidValueError(multiplicandMinimumInput);
        isValid = false;
    } else if (min2 < argMin) {
        handleOutOfRangeError(multiplicandMinimumInput);
        isValid = false;
    }
    if (Number.isNaN(max2)) {
        handleInvalidValueError(multiplicandMaximumInput);
        isValid = false;
    } else if (max2 > argMax) {
        handleOutOfRangeError(multiplicandMaximumInput);
        isValid = false;
    }
    if (min1 >= max1) {
        handleInvalidRangeError(multiplierMinimumInput, multiplierMaximumInput);
        isValid = false;
    }
    if (min2 >= max2) {
        handleInvalidRangeError(multiplicandMinimumInput, multiplicandMaximumInput);
        isValid = false;
    }

    return isValid;
};

const removeErrorIndicators = () => {
    // Remove all red borders and error messages from elements
    multiplierMinimumInput.classList.remove(invalidInputClass);
    multiplierMaximumInput.classList.remove(invalidInputClass);
    multiplicandMinimumInput.classList.remove(invalidInputClass);
    multiplicandMaximumInput.classList.remove(invalidInputClass);
    errorBox.innerHTML = "";
};

const generateTable = (multiplierRange, multiplicandRange) => {
    // Initialization
    let newHtml = `<tr><td></td>`;

    // Generate the header row
    multiplierRange.arr.forEach((multiplier, idx) => {
        // Add the current cell to the table
        let currMultiplier = `<td>${multiplier}</td>`;
        newHtml += currMultiplier;
    });

    // Iterate over all multiplicands 
    multiplicandRange.arr.forEach(multiplicand => {
        // Initialize the current row
        let currRow = "<tr>";

        // Append each multiplicand to the leftmost column
        currRow += `<td>${multiplicand}</td>`;

        // Iterate over all multiplicands
        multiplierRange.arr.forEach(multiplier => {
            // Perform the multiplication and append the result to the current row 
            currRow += `<td>${multiplier * multiplicand}</td>`;
        });

        // Add the current row to the new HTML 
        currRow += "</tr>";
        newHtml += currRow
    });

    // Render the new HTML 
    table.innerHTML = newHtml;
};

/**
 * Initial Call
 */

main();

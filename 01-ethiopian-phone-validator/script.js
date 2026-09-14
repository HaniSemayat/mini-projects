const phoneForm = document.querySelector("#phoneForm");
const phoneInput = document.querySelector("#phone");
const result = document.querySelector("#result");
const clearBtn = document.querySelector("#clearBtn");
const counter = document.querySelector("#counter");
const exampleButtons = document.querySelectorAll(".example-btn");

// Ethiopian mobile phone pattern
const ethiopianPhonePattern = /^(?:0|251|\+251)9\d{8}$/;

// Check phone number
phoneForm.addEventListener("submit", function (event) {


event.preventDefault();

const phoneNumber = phoneInput.value
    .trim()
    .replace(/\s+/g, "");


// Empty input
if (phoneNumber === "") {

    showResult(
        false,
        "Please enter a phone number.",
        ""
    );

    return;
}


// Check the number
if (ethiopianPhonePattern.test(phoneNumber)) {

    let format;

    if (phoneNumber.startsWith("09")) {
        format = "Local format";
    }
    else if (phoneNumber.startsWith("+251")) {
        format = "International format";
    }
    else {
        format = "International format without +";
    }


    showResult(
        true,
        "Valid Ethiopian phone number!",
        `Format: ${format}`
    );

}
else {

    showResult(
        false,
        "Invalid Ethiopian phone number.",
        "Example: 0912345678 or +251912345678"
    );

}


});

// Display result
function showResult(isValid, title, message) {

result.className = "result";

if (isValid) {

    result.classList.add("valid");

    result.innerHTML = `
        <div class="result-title">✅ ${title}</div>
        <p class="result-message">${message}</p>
    `;

}
else {

    result.classList.add("invalid");

    result.innerHTML = `
        <div class="result-title">❌ ${title}</div>
        <p class="result-message">${message}</p>
    `;

}


}

// Clear everything
clearBtn.addEventListener("click", function () {


phoneInput.value = "";

result.innerHTML = "";
result.className = "result";

updateCounter();

phoneInput.focus();


});

// Character counter
phoneInput.addEventListener("input", updateCounter);

function updateCounter() {

const length = phoneInput.value.length;

counter.textContent = `${length}/13`;


}

// Example number buttons
exampleButtons.forEach(function (button) {


button.addEventListener("click", function () {

    phoneInput.value = button.dataset.number;

    updateCounter();

    phoneInput.focus();

});


});

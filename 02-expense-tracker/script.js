const expenseForm = document.querySelector("#expenseForm");

const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseCategory = document.querySelector("#expenseCategory");
const expenseDate = document.querySelector("#expenseDate");

const expenseList = document.querySelector("#expenseList");

const totalAmount = document.querySelector("#totalAmount");
const expenseCount = document.querySelector("#expenseCount");

const filterCategory = document.querySelector("#filterCategory");

// Get saved expenses from localStorage

let expenses = JSON.parse(
localStorage.getItem("expenses")
) || [];

// Set today's date

expenseDate.value = new Date()
.toISOString()
.split("T")[0];

// Add expense

expenseForm.addEventListener("submit", function (event) {


event.preventDefault();

const name = expenseName.value.trim();
const amount = Number(expenseAmount.value);
const category = expenseCategory.value;
const date = expenseDate.value;


// Validate input

if (name === "") {

    alert("Please enter an expense name.");

    return;
}

if (amount <= 0 || isNaN(amount)) {

    alert("Please enter a valid amount.");

    return;
}

if (date === "") {

    alert("Please select a date.");

    return;
}


// Create expense object

const newExpense = {

    id: Date.now(),

    name: name,

    amount: amount,

    category: category,

    date: date

};


// Add to array

expenses.push(newExpense);


// Save to localStorage

saveExpenses();


// Update screen

displayExpenses();


// Reset form

expenseForm.reset();

expenseDate.value = new Date()
    .toISOString()
    .split("T")[0];


});

// Save expenses

function saveExpenses() {


localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
);


}

// Display expenses

function displayExpenses() {


const selectedCategory = filterCategory.value;


let filteredExpenses = expenses;


if (selectedCategory !== "All") {

    filteredExpenses = expenses.filter(function (expense) {

        return expense.category === selectedCategory;

    });

}


expenseList.innerHTML = "";


// No expenses

if (filteredExpenses.length === 0) {

    expenseList.innerHTML = `
        <p class="empty-message">
            No expenses found.
        </p>
    `;

    updateSummary();

    return;
}


// Display each expense

filteredExpenses
    .slice()
    .reverse()
    .forEach(function (expense) {

        const expenseElement =
            document.createElement("div");

        expenseElement.className = "expense-item";


        expenseElement.innerHTML = `

            <div class="expense-info">

                <p class="expense-name">
                    ${expense.name}
                </p>

                <p class="expense-details">
                    ${expense.category} · ${formatDate(expense.date)}
                </p>

            </div>


            <div class="expense-right">

                <span class="expense-amount">
                    ${expense.amount.toLocaleString()} ETB
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})"
                >
                    Delete
                </button>

            </div>

        `;


        expenseList.appendChild(expenseElement);

    });


updateSummary();


}

// Delete expense

function deleteExpense(id) {


expenses = expenses.filter(function (expense) {

    return expense.id !== id;

});


saveExpenses();

displayExpenses();


}

// Update summary

function updateSummary() {


const total = expenses.reduce(function (sum, expense) {

    return sum + expense.amount;

}, 0);


totalAmount.textContent =
    `${total.toLocaleString()} ETB`;

expenseCount.textContent =
    expenses.length;


}

// Format date

function formatDate(date) {


const dateObject = new Date(date + "T00:00:00");

return dateObject.toLocaleDateString(
    "en-GB",
    {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }
);


}

// Filter expenses

filterCategory.addEventListener("change", function () {


displayExpenses();


});

// Display saved expenses when page loads

displayExpenses();

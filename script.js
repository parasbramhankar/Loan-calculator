// Global Variables
let GInputs = document.querySelectorAll(".amount-year-interest");
let GContainer = document.getElementById("container");

// Constant Variables
const CLEARBUTTON = document.getElementById("clearBtn");
const EMIELEMENT = document.getElementById("emi");

// Event Listeners
document.getElementById("btn").addEventListener("click", handleClick);
CLEARBUTTON.addEventListener("click", handleClearButtonClick);
GInputs.forEach((input) => input.addEventListener("input", handleInputChange));
GInputs.forEach((input) => input.addEventListener("focus", handleFocus));

/* -------Event listener handler functions-------*/

// Function to handle click on Calculate button
function handleClick() {
  let LAmount = getAmount();
  let LYears = getYears();
  let LInterest = getInterest();

  if (isValid(LAmount, LYears, LInterest)) {
    calculateAndDisplayEMI(LAmount, LYears, LInterest);
  }
}

// Function to handle Clear button click
function handleClearButtonClick() {
  resetForm();
  resetEMI();
  toggleClearButton(false);
}

// Function to handle input change and enable/disable the Clear button
function handleInputChange() {
  let LAllFilled = isAllInputsFilled();
  toggleClearButton(LAllFilled);
}

// Function to handle focus on input fields to clear error messages
function handleFocus(event) {
  clearError(event.target);
}

/*-------------Getter & Setter functions-----------*/

// Getter Functions
function getAmount() {
  return document.getElementById("amount").value;
}

function getYears() {
  return document.getElementById("years").value;
}

function getInterest() {
  return document.getElementById("interest").value;
}

// Setter Functions

// set the amount error if the value is not proper inserted
function setAmountError(p_strMessage) {
  document.getElementById("amountError").textContent = p_strMessage;
  document.getElementById("amount").classList.add("error");
}

//Set year error if the year proper not inserted
function setYearsError(p_strMessage) {
  document.getElementById("yearsError").textContent = p_strMessage;
  document.getElementById("years").classList.add("error");
}

function setInterestError(p_strMessage) {
  document.getElementById("interestError").textContent = p_strMessage;
  document.getElementById("interest").classList.add("error");
}

//set EMI amount to display
function setEMI(p_doubleValue) {
  EMIELEMENT.textContent = "Monthly EMI: ₹. " + p_doubleValue;
}

//Set the container height if the input field show error
function setContainerHeight(p_intHeight) {
  GContainer.style.height = p_intHeight;
}

function toggleClearButton(p_boolEnabled) {
  CLEARBUTTON.disabled = !p_boolEnabled;
}

function clearError(p_htmlInputElementInputField) {
  document.getElementById(
    p_htmlInputElementInputField.id + "Error"
  ).textContent = "";
  p_htmlInputElementInputField.classList.remove("error");
}

// Utility Functions:Utility functions in JavaScript are functions that help perform common,
// repetitive tasks or simplify complex operations

function isAllInputsFilled() {
  return Array.from(GInputs).some((input) => input.value !== "");
}

//function to check the input is correctly inserted or not
function isValid(p_doubleAmount, p_intYears, p_doubleInterest) {
  let LIsValid = true;

  // Reset error messages and input styles
  resetErrors();

  // Validation
  if (!p_doubleAmount) {
    setAmountError("Field must be filled");
    LIsValid = false;
  }
  if (!p_intYears) {
    setYearsError("Field must be filled");
    LIsValid = false;
  }
  if (!p_doubleInterest) {
    setInterestError("Field must be filled");
    LIsValid = false;
  }

  if (!LIsValid) {
    setContainerHeight("550px");
  }

  return LIsValid;
}



//function to calculate and display the EMI, calculated and to display call the setEMI method
function calculateAndDisplayEMI(p_doubleAmount, p_intYears, p_doubleInterest) {
  let LPrincipal = parseFloat(p_doubleAmount);
  let LRate = parseFloat(p_doubleInterest) / 100 / 12;
  let LTime = parseFloat(p_intYears) * 12;

  let LEmi =
    (LPrincipal * LRate * Math.pow(1 + LRate, LTime)) /
    (Math.pow(1 + LRate, LTime) - 1);
  LEmi = LEmi.toFixed(2);

  setEMI(LEmi); //calling this method to set EMI to display
}

// Reset all errors
function resetErrors() {
  GInputs.forEach((input) => {
    input.classList.remove("error");
    document.getElementById(input.id + "Error").textContent = "";
  });
}

//reset the Complete form after clear button click
function resetForm() {
  document.getElementById("loanForm").reset();
}
//reset the monthly EMI after clicking on clear button
function resetEMI() {
  EMIELEMENT.textContent = "Monthly EMI: ₹. 00";
}

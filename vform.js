const form = document.getElementById("donationForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const qualification = document.getElementById("qualification");
const city = document.getElementById("city");
const nationality = document.getElementById("nationality");
const phone = document.getElementById("phone");
const aadhar = document.getElementById("aadhar");
const submitBtn = document.querySelector("button");

// Regular Expressions
const nameRegex = /^[A-Za-z]+$/;
const ageRegex = /^[0-9]{1,2}$/; // Validates age to be 1 or 2 digits
const phoneRegex = /^[6-9][0-9]{9}$/; // Validates Indian phone numbers
const aadharRegex = /^[0-9]{12}$/;

// Function to validate input fields
function validateInput(input, regex, errorElement, errorMessage) {
    const error = document.getElementById(errorElement);
    if (!regex.test(input.value.trim())) {
        error.textContent = errorMessage;
        input.style.borderColor = "red";
        return false;
    } else {
        error.textContent = "";
        input.style.borderColor = "green";
        return true;
    }
}

// Live Validation Events
firstName.addEventListener("input", () =>
    validateInput(firstName, nameRegex, "firstNameError", "Only letters allowed!")
);
lastName.addEventListener("input", () =>
    validateInput(lastName, nameRegex, "lastNameError", "Only letters allowed!")
);
age.addEventListener("input", () =>
    validateInput(age, ageRegex, "ageError", "Enter a valid age!")
);
qualification.addEventListener("input", () =>
    validateInput(qualification, nameRegex, "qualificationError", "Only letters allowed!")
);
city.addEventListener("input", () =>
    validateInput(city, nameRegex, "cityError", "Only letters allowed!")
);
nationality.addEventListener("input", () =>
    validateInput(nationality, nameRegex, "nationalityError", "Only letters allowed!")
);
phone.addEventListener("input", () =>
    validateInput(phone, phoneRegex, "phoneError", "Must be a valid 10-digit number starting with 6-9!")
);
aadhar.addEventListener("input", () =>
    validateInput(aadhar, aadharRegex, "aadharError", "Must be a valid 12-digit Aadhar number!")
);

// Function to check form validity
function checkFormValidity() {
    if (
        validateInput(firstName, nameRegex, "firstNameError", "Only letters allowed!") &&
        validateInput(lastName, nameRegex, "lastNameError", "Only letters allowed!") &&
        validateInput(age, ageRegex, "ageError", "Enter a valid age!") &&
        validateInput(qualification, nameRegex, "qualificationError", "Only letters allowed!") &&
        validateInput(city, nameRegex, "cityError", "Only letters allowed!") &&
        validateInput(nationality, nameRegex, "nationalityError", "Only letters allowed!") &&
        validateInput(phone, phoneRegex, "phoneError", "Must be a valid 10-digit number starting with 6-9!") &&
        validateInput(aadhar, aadharRegex, "aadharError", "Must be a valid 12-digit Aadhar number!")
    ) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Attach the validity check to all inputs
document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", checkFormValidity);
});

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    alert("Form submitted successfully!");
    form.reset(); // Reset the form fields
    document.querySelectorAll(".error").forEach((error) => (error.textContent = ""));
    submitBtn.disabled = true; // Disable button after form reset
});

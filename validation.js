document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("volunteerForm");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const age = document.getElementById("age");
    const department = document.getElementById("department");
    const skills = document.getElementById("skills");
    const availability = document.getElementById("availability");
    const submitBtn = document.querySelector("button");

    // Regular Expressions
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters & spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
    const phoneRegex = /^[6-9][0-9]{9}$/; // Indian phone number validation
    const ageRegex = /^(1[89]|[2-9][0-9])$/; // Age must be 18 or older

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
    name.addEventListener("input", () =>
        validateInput(name, nameRegex, "nameError", "Only letters allowed!")
    );
    email.addEventListener("input", () =>
        validateInput(email, emailRegex, "emailError", "Enter a valid email address!")
    );
    phone.addEventListener("input", () =>
        validateInput(phone, phoneRegex, "phoneError", "Enter a valid 10-digit phone number!")
    );
    age.addEventListener("input", () =>
        validateInput(age, ageRegex, "ageError", "Must be 18 or older!")
    );

    // Function to check dropdown selections
    function validateDropdown(input, errorElement, errorMessage) {
        const error = document.getElementById(errorElement);
        if (!input.value) {
            error.textContent = errorMessage;
            input.style.borderColor = "red";
            return false;
        } else {
            error.textContent = "";
            input.style.borderColor = "green";
            return true;
        }
    }

    department.addEventListener("change", () =>
        validateDropdown(department, "departmentError", "Select a department!")
    );
    availability.addEventListener("change", () =>
        validateDropdown(availability, "availabilityError", "Select availability!")
    );

    // Function to check form validity
    function checkFormValidity() {
        if (
            validateInput(name, nameRegex, "nameError", "Only letters allowed!") &&
            validateInput(email, emailRegex, "emailError", "Enter a valid email!") &&
            validateInput(phone, phoneRegex, "phoneError", "Enter a valid phone number!") &&
            validateInput(age, ageRegex, "ageError", "Must be 18 or older!") &&
            validateDropdown(department, "departmentError", "Select a department!") &&
            validateDropdown(availability, "availabilityError", "Select availability!")
        ) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Attach the validity check to all inputs
    document.querySelectorAll("input, select").forEach((input) => {
        input.addEventListener("input", checkFormValidity);
        input.addEventListener("change", checkFormValidity);
    });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default submission

        if (checkFormValidity()) {
            alert("Form submitted successfully!");
            form.reset(); // Reset the form
            document.querySelectorAll(".error").forEach((error) => (error.textContent = ""));
            submitBtn.disabled = true; // Disable button after form reset
        }
    });
});

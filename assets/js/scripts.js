document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-btn");
    const globalError = document.querySelector(".form-error--global");
    const togglePasswordBtn = document.getElementById("toggle-password-btn");
    const togglePasswordIcon = document.getElementById("toggle-password-icon");
    const rememberMeCheckbox = document.getElementById("remember-me");

    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = false;
    }

    const showError = (input, errorMessage) => {
        const formGroup = input.closest(".form-group");
        const errorElement = formGroup.querySelector(".form-error__text");
        errorElement.textContent = errorMessage;
        formGroup.classList.add("has-error");
    };

    const hideError = (input) => {
        const formGroup = input.closest(".form-group");
        formGroup.classList.remove("has-error");
    };

    const validateInput = (input, errorMessage) => {
        if (!input.value.trim()) {
            showError(input, errorMessage);
            return false;
        } else {
            hideError(input);
            return true;
        }
    };

    togglePasswordBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordIcon.innerHTML = `
            <path d="M6.703 7.382A6.073 6.073 0 0 0 6.113 10c0 3.292 2.614 6 5.887 6 3.273 0 5.886-2.708 5.886-6 0-.936-.211-1.825-.589-2.618.573.341 1.115.744 1.634 1.204.674.596 1.77 1.793 2.683 3.414-.913 1.62-2.01 2.818-2.683 3.414C17.037 17.093 14.833 18 12 18s-5.037-.907-6.931-2.586c-.674-.596-1.77-1.793-2.683-3.414.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204zM12 4C8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453C5.996 18.908 8.672 20 12 20c3.329 0 6.004-1.091 8.258-3.089.896-.794 2.3-2.353 3.38-4.453l.237-.458-.236-.458c-1.082-2.1-2.485-3.659-3.381-4.453C18.004 5.09 15.328 4 12 4zm0 2c2.125 0 3.886 1.77 3.886 4S14.125 14 12 14s-3.886-1.77-3.886-4S9.875 6 12 6z"></path>
        `;
        } else {
            passwordInput.type = "password";
            togglePasswordIcon.innerHTML = `
            <path d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453.278.246.562.479.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002 3.248-3.248zM14.884 7.32l-5.57 5.57A4.035 4.035 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11.319 11.319 0 0 1-.957-.763C4.396 14.818 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.073 6.073 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.503 16.503 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.22 13.22 0 0 1-3.08-.348l1.726-1.726c.435.05.886.074 1.354.074 2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.515 14.515 0 0 0-2.146-2.896z"></path>
            <path d="M17.843 10.729c-.328 2.755-2.494 4.956-5.24 5.24l5.24-5.24z"></path>
        `;
        }
    });

    emailInput.addEventListener("input", () => {
        validateInput(emailInput, "Please enter your email.");
    });

    passwordInput.addEventListener("input", () => {
        validateInput(passwordInput, "Please enter your password.");
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const isEmailValid = validateInput(
            emailInput,
            "Please enter your email."
        );
        const isPasswordValid = validateInput(
            passwordInput,
            "Please enter your password."
        );

        if (isEmailValid && isPasswordValid) {
            if (rememberMeCheckbox.checked) {
                localStorage.setItem("rememberedEmail", emailInput.value.trim());
            } else {
                localStorage.removeItem("rememberedEmail");
            }
            globalError.classList.add("active");
        } else {
            globalError.classList.remove("active");
        }
    });
});

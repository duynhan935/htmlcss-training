document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-btn");
    const globalError = document.querySelector(".form-error--global");
    const togglePasswordBtn = document.getElementById("toggle-password-btn");
    const togglePasswordIcon = document.getElementById("toggle-password-icon");
    const rememberMeCheckbox = document.getElementById("remember-me");

    const fakeUsers = [
        { email: "user1", password: "pass1" },
        { email: "user2", password: "pass2" },
        { email: "user3", password: "pass3" },
    ];

    const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    if (rememberedUser) {
        emailInput.value = rememberedUser.email;
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
        } else {
            passwordInput.type = "password";
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
            const enteredEmail = emailInput.value.trim();
            const enteredPassword = passwordInput.value.trim();

            const matchingUser = fakeUsers.find(
                (user) =>
                    user.email === enteredEmail &&
                    user.password === enteredPassword
            );

            if (matchingUser) {
                globalError.classList.remove("active");

                if (rememberMeCheckbox.checked) {
                    localStorage.setItem(
                        "rememberedUser",
                        JSON.stringify({
                            email: enteredEmail,
                            password: enteredPassword,
                        })
                    );
                } else {
                    localStorage.removeItem("rememberedUser");
                }

                alert("Login successful!");
            } else {
                globalError.classList.add("active");
            }
        } else {
            globalError.classList.remove("active");
        }
    });

    emailInput.addEventListener("focus", () => {
        if (rememberedUser) {
            emailInput.value = rememberedUser.email;
        }
    });
});

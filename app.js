// Client-side validation for the login form.
// Checks: fields aren't empty, email contains "@", password is at least 8 characters.
function validateLogin(email, password) {
  const errors = { email: "", password: "" };

  if (!email || email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Email must contain '@'.";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  const isValid = errors.email === "" && errors.password === "";
  return { isValid, errors };
}

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailErrorEl = document.getElementById("emailError");
  const passwordErrorEl = document.getElementById("passwordError");
  const formMessageEl = document.getElementById("formMessage");

  // Reset messages
  emailErrorEl.textContent = "";
  passwordErrorEl.textContent = "";
  formMessageEl.textContent = "";
  formMessageEl.className = "";

  const { isValid, errors } = validateLogin(email, password);

  if (!isValid) {
    emailErrorEl.textContent = errors.email;
    passwordErrorEl.textContent = errors.password;
    return; // block submission — nothing is sent to the server
  }

  // Client-side checks passed — send to backend, which re-validates server-side.
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      formMessageEl.textContent = data.message || "Login successful.";
      formMessageEl.className = "success";
    } else {
      formMessageEl.textContent = data.message || "Login failed.";
      formMessageEl.className = "failure";
    }
  } catch (err) {
    formMessageEl.textContent = "Could not reach server.";
    formMessageEl.className = "failure";
  }
});

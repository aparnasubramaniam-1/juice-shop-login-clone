const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(__dirname)); // serves index.html, app.js, style

const bcrypt = require("bcryptjs");

// In a real app this would be a database lookup with a hashed password compare.
// Here it's a single demo user so the form has something to validate against.
// The hash is generated at startup (rather than hardcoded) so it's always
// guaranteed to match DEMO_PASSWORD below — never store plaintext in a real app.
const DEMO_PASSWORD = "password123";
const DEMO_USER = {
  email: "demo@example.com",
  passwordHash: bcrypt.hashSync(DEMO_PASSWORD, 10)
};

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};

  // Server-side validation — mirrors client checks but can't be bypassed
  // by disabling JS or hitting the endpoint directly (e.g. via curl/Postman).
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email." });
  }
  if (!password || typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  if (email !== DEMO_USER.email) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const match = await bcrypt.compare(password, DEMO_USER.passwordHash);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  return res.status(200).json({ message: "Login successful." });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

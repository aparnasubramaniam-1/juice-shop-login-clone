# Juice Shop Login Clone

A simple login form, built to mimic OWASP Juice Shop's login page, as part of a web
security course assignment. Demonstrates both client-side and server-side input
validation, and secure password storage with bcrypt.

## What this project does

- Renders an email + password login form (`index.html`).
- Validates on the client (`app.js`): blocks empty submissions, requires the email to
  contain `@`, and requires the password to be at least 8 characters, before anything
  is sent to the server.
- Re-validates on the server (`server.js`), since client-side checks can be bypassed
  (disabled JS, direct API calls via curl/Postman, etc.) and should never be trusted
  alone.
- Compares the submitted password against a bcrypt hash rather than storing or
  comparing plaintext.

## Demo credentials

- Email: `demo@example.com`
- Password: `password123`

(These exist only to demonstrate a successful login against the server-side check —
not meant to represent a real account.)

## How to run it

1. Clone this repo and move into it:
   ```bash
   git clone <your-repo-url>
   cd juice-shop-login-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3001` in your browser.

## Project structure

```
index.html   — the login form markup + styling
app.js       — client-side validation logic
server.js    — Express backend with server-side validation + bcrypt check
package.json — dependencies and start script
```

## Security notes

This project was intentionally built with secure practices as a point of comparison
for a companion exercise where the same type of form was tested for SQL Injection
and XSS vulnerabilities. Key choices:

- **No raw SQL / string concatenation** — there's no database here, but in a real
  implementation, parameterized queries (not string-built queries) are required to
  prevent SQL Injection.
- **Server-side validation is authoritative** — client-side validation is a UX
  convenience only, never a security boundary.
- **Passwords are hashed with bcrypt**, never stored or compared in plaintext.

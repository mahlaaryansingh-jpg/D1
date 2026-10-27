# DEV@Deakin React project

## Requirements
- Node.js compatible with the Vite version in `package.json`
- A Firebase project with Email/Password Authentication enabled and Cloud Firestore created
- Optional: a SendGrid account/API key for the newsletter backend

## Frontend setup
1. Open a terminal in the `p4` folder (the folder containing the frontend `package.json`).
2. Copy `.env.example` to `.env` and enter your own Firebase web-app configuration values. Do not share `.env` or commit it to source control.
3. Install dependencies and start the frontend:

   ```bash
   npm install
   npm run dev
   ```

4. For a production build, run `npm run build`.

## Firebase setup
- Enable Email/Password under Firebase Authentication > Sign-in method.
- Create a Cloud Firestore database.
- Registration creates a document at `users/{uid}` with the user's name, email, creation timestamp, and initial `plan: "Free"`.
- The Pricing page submits an upgrade request to the `upgradeRequests` collection. It intentionally does not claim a payment has been taken or automatically activate a paid plan because no payment provider is configured.
- Configure Firestore Security Rules for your project. At minimum, users should only be able to read/update their own user document, and upgrade requests should be tied to the authenticated UID. Never rely on frontend checks alone to authorize a paid subscription. A real paid plan should only be activated by trusted server-side code after verified payment.

## Optional newsletter backend
1. Open a second terminal in `p4/backend`.
2. Copy `.env.example` to `.env` and set `SENDGRID_API_KEY` to a newly generated key. Never put this key in the frontend `.env`.
3. Install and start the backend:

   ```bash
   npm install
   npm start
   ```

The backend listens on port 5000 by default. Ensure the sender email in `backend/server.js` is verified in SendGrid before testing email delivery.

## Notes
- `.env` files and `node_modules` are intentionally excluded from the shared ZIP.
- Existing newsletter functionality is retained; successful delivery depends on valid SendGrid credentials, a verified sender, and correct local configuration.

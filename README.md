# Creating a .env File

To set up the environment variables for the backend, follow these steps:

## Step 1: Create a .env File

1. In the root directory of your project, create a file named `.env` in `Parkbuddy_baskend`.
2. Obtain the required Admin SDK credentials from your Firebase project.
3. Add the following variables to the `.env` file:

```env
TYPE=
PROJECT_ID=
PRIVATE_KEY_ID=
PRIVATE_KEY=
CLIENT_EMAIL=
CLIENT_ID=
AUTH_URI=
TOKEN_URI=
AUTH_PROVIDER_X509_CERT_URL=
CLIENT_X509_CERT_URL=
UNIVERSE_DOMAIN=
```

### Notes

- **Do not share** the contents of your `.env` file publicly.
- **Do not commit** the `.env` file to version control. To ensure this:
  1. Open or create a `.gitignore` file in the root directory.
  2. Add `.env` to the `.gitignore` file to exclude it from version control.

By following these steps, you ensure the security and proper configuration of your environment variables.

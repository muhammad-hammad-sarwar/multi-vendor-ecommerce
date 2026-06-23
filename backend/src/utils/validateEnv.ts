export default function validateEnv() {
  const required = [
    "JWT_SECRET",
    // "RESEND_API_KEY",
    "DB_URL",
    "APP_EMAIL",
    "APP_PASSWORD",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
}

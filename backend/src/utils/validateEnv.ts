export default function validateEnv() {
  const required = [
    "JWT_SECRET",
    "DB_URL",
    "APP_EMAIL",
    "APP_PASSWORD",
    "STRIPE_SECRET_KEY",
    "STRIPE_API_KEY",
    "CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
}

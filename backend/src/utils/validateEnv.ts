export default function validateEnv() {
  const required = ["JWT_SECRET", "DB_URL", "APP_EMAIL", "APP_PASSWORD"];

  for (const key of required) {
    console.log("Validate ENV ", process.env[key]);
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
}

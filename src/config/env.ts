import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  CORSAIR_KEK: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.format()
  );

  process.exit(1);
}

export const env = parsed.data;
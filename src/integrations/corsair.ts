import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { gmail } from '@corsair-dev/gmail';
import { googlecalendar } from '@corsair-dev/googlecalendar';
import { createCorsair } from 'corsair';
import { env } from '../config/env';

const pool = new Pool({ connectionString: env.DATABASE_URL });
const db = drizzle(pool);

export const corsair = createCorsair({
    plugins: [gmail(), googlecalendar()],
    database: pool,
    multiTenancy: true,
    kek:env.CORSAIR_KEK!,
});


console.log("Corsair server is running...")
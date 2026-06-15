import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { gmail } from '@corsair-dev/gmail';
import { googlecalendar } from '@corsair-dev/googlecalendar';
import { createCorsair } from 'corsair';


const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export const corsair = createCorsair({
    plugins: [gmail(), googlecalendar()],
    database: pool,
    multiTenancy: true,
    kek: process.env.CORSAIR_KEK!,
});


console.log("Corsair server is running...")
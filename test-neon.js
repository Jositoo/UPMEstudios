const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

const dbUrl = "postgresql://neondb_owner:npg_bz0qtvO8uciR@ep-shiny-block-asqyed6j-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({ connectionString: dbUrl });

pool.query('SELECT 1 as result').then(res => {
  console.log("Success:", res.rows);
  process.exit(0);
}).catch(err => {
  console.error("Failed:", err);
  process.exit(1);
});

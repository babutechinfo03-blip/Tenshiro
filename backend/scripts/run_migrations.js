const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const sqlFiles = [
  { type: 'schema', file: '../database/schema.sql' },
  { type: 'schema', file: '../database/schema_jobs.sql' },
  { type: 'schema', file: '../database/aptitude_schema.sql' },
  { type: 'schema', file: '../database/migrations/20240307_master_upgrade.sql' },
  { type: 'schema', file: '../database/migrations/create_resume_analyses.sql' },
  { type: 'alter', file: '../database/migrations/add_user_language_support.sql' },
  { type: 'alter', file: '../database/migrations/add_chat_language_support.sql' },
  { type: 'seed', file: '../database/seed.sql' },
  { type: 'seed', file: '../database/seed_domains_roles_v2.sql' },
  { type: 'seed', file: '../database/seed_jobs_complete.sql' }
];

async function runMigrations() {
  console.log('Connecting to MySQL database...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });
  console.log('Connected successfully.');

  for (const item of sqlFiles) {
    const filePath = path.join(__dirname, item.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found, skipping: ${item.file}`);
      continue;
    }

    console.log(`Executing ${item.file}...`);
    const sql = fs.readFileSync(filePath, 'utf8');

    if (item.type === 'alter') {
      // Split by semicolon and run queries individually to catch errors on duplicate columns
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      for (const stmt of statements) {
        try {
          await connection.query(stmt);
        } catch (err) {
          if (err.code === 'ER_DUP_FIELDNAME' || err.code === 'ER_DUP_KEYNAME') {
            console.log(`  [Ignored] Column or index already exists: "${stmt.substring(0, 50)}..."`);
          } else {
            console.warn(`  [Warning] Statement failed: "${stmt.substring(0, 50)}...". Error: ${err.message}`);
          }
        }
      }
    } else {
      try {
        await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
        await connection.query(sql);
        await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.log(`✅ Applied successfully: ${item.file}`);
      } catch (err) {
        console.error(`❌ Failed to apply ${item.file}:`, err.message);
      }
    }
  }

  await connection.end();
  console.log('Database migration runner completed.');
}

runMigrations().catch(err => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');
const pool = require('../db');

const migrate = async () => {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(sql);
  console.log('Schema applied.');
};

migrate()
  .then(() => pool.end())
  .catch((error) => {
    console.error('Migration failed:', error.message);
    pool.end();
    process.exit(1);
  });

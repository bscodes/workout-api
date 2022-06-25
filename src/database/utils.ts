export {};
const fs = require('fs');
// The fs module enables interacting
//with the file system in a way modeled on standard POSIX functions.

const saveToDatabase = (DB: any) => {
  fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2), {
    encoding: 'utf-8',
  });
};

module.exports = { saveToDatabase };

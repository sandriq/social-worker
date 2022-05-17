const fs = require('fs');
const path = require('path');
const util = require('util');
const dateformat = require('dateformat');

const logPath = path.join(__dirname, '..', '..', 'log');

const log_file = fs.createWriteStream(path.join(logPath, 'app.log'), {
  flags: 'a',
});
const log_stdout = process.stdout;

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}

module.exports = (d) => {
  log_file.write(`${util.format(`${dateformat(Date.now(), 'isoDateTime')}  ${d}`)}\n`);
  log_stdout.write(`${util.format(d)}\n`);
};

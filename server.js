#!/usr/bin/env node

const chalk = require('chalk');
const PORT = process.env.PORT;

require('./app').listen(PORT, _ => {
  console.log(`${chalk.green('✓')} app listening on port ${PORT} in ${process.env.NODE_ENV} mode!`);
});

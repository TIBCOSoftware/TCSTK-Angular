const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/tc-liveapps/runtime-es2015.js',
    './dist/tc-liveapps/polyfills-es2015.js',
    './dist/tc-liveapps/main-es2015.js',
    './dist/tc-liveapps/scripts.js'
  ]
  await fs.ensureDir('elements')
  await concat(files, 'src/tcstk-elements.js');
  await fs.copyFile('./dist/tc-liveapps/styles.css', 'src/tcstk-elements.css')
})()

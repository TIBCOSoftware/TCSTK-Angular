const execSync = require('child_process').execSync;
const fs = require('fs-extra');

function main(){
  // console.log('Running: ' );
  var task = '';
  var region = '';
  for (arg in process.argv) {
    // console.log(process.argv[arg]);
    if (process.argv[arg] == '-task') {
      if (process.argv.length - 1 > arg) {
        var temp = parseInt(arg) + 1;
        task = process.argv[temp];
      }
    }
    if (process.argv[arg] == '-region') {
      if (process.argv.length - 1 > arg) {
        var temp = parseInt(arg) + 1;
        region = process.argv[temp];
      }
    }
  }
  console.log('Running) TASK: ' + task + ' REGION:' + region);
  if(task == 'run'){
    fs.copyFileSync('./src/app/app.module.dev', './src/app/app.module.ts');
    run('ng serve --proxy-config proxy.conf.prod.'+region+'.json --ssl true --source-map --aot');
  }
  if(task == 'build'){
     //cp ./src/app/app.module.build ./src/app/app.module.ts; ng build custom-form-app --prod --output-hashing=none && node build-elements.js; cp ./src/app/app.module.dev ./src/app/app.module.ts
    run('npm run build_all_libs');
    fs.copyFileSync('./tsconfig.build.json', './tsconfig.json');
    fs.copyFileSync('./src/app/app.module.build', './src/app/app.module.ts');
    run('ng build tc-liveapps --prod --output-hashing=none');
    run('node build-elements.js');
    // cp ./src/app/app.module.dev ./src/app/app.module.ts
    fs.copyFileSync('./src/app/app.module.dev', './src/app/app.module.ts');
    fs.copyFileSync('./tsconfig.debug.json', './tsconfig.json');
  }
}

// Run an OS Command
run = function (command) {
  return new Promise(function (resolve, reject) {
    console.log('Executing Command: ' + command);
    try {
      execSync(
        command,
        {stdio: 'inherit'}
      );
    } catch (err) {
      reject(err);
    }
    resolve();
  }).catch(
    (reason => {
      console.error('ERROR', reason);
      process.exit(1);
    })
  );
}

main();

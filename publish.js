'use strict';

const exec = require('child_process').execSync;
const gitUrl = `git@github.com:marko-js/markojs-website-v3.git`;
const gitBranch = 'gh-pages';
const buildDir = __dirname + '/build';
const publishDir = buildDir + '/__publish';

exec('markoc . --clean');
exec('rm -rf .cache');
exec('NODE_ENV=production npm run build --silent');

exec(`mkdir ${publishDir}`);

// clone the repo that is the publish target
exec(`cd ${publishDir} && git init && git remote add origin ${gitUrl} && git fetch`);

// switch to the target branch
try {
  exec(`cd ${publishDir} && git checkout -t origin/${gitBranch}`);
} catch(e) {
  exec(`cd ${publishDir} && git checkout -b ${gitBranch}`);
}

// steal the .git directory
exec(`mv ${publishDir+'/.git'} ${buildDir}`);
exec(`rm -rf ${publishDir}`);

// commit and push up the changes
try {
  exec(`cd ${buildDir} && git add . --all && git commit -m "updated static site"`);
  exec(`cd ${buildDir} && git push origin ${gitBranch}`);
  console.log('Static site successfully built and pushed to remote repository.');
} catch(e) {
  if(e.cmd && e.cmd.indexOf('git commit')) {
    console.log('Static site successfully built. No changes to push.');
  }
}
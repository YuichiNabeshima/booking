import child_process from 'child_process';
const { exec } = child_process;

(function() {
  const args = process.argv.slice(2);
  const file = args.shift();
  const otherArgs = args.join(' ');
  exec(`npm run exec-batch ./app/batch/${file}.ts ${otherArgs}`, (error, stdout, stderr) => {
    console.log('error: ',error);
    console.log('stdout: ',stdout);
    console.log('stderr: ',stderr);
  });
})();
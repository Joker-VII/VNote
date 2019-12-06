var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream(__dirname + '/VueNote.zip');
var archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function() {
  console.log('Data has been drained');
});

archive.pipe(output);

archive.directory('dist', true, { date: new Date() });

archive.finalize();
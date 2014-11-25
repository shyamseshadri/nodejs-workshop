
var fs = require('fs'),
  filename = process.argv[2];

var readStream = fs.createReadStream(filename);

readStream.on('data', function(data) {
  console.log("Reading file data event : ", data.toString());
});
readStream.on('end', function() {
  console.log('file ended');
});

readStream.on('error', function(e) {
  console.log('error found', e);
});



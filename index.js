
var fs = require('fs'),
  filename = process.argv[2];

var fileContent = fs.readFileSync(filename).toString();
console.log("File contents are", fileContent);

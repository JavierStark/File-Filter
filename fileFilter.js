const fs = require('fs');
const path = require('path');

const rulePath = "./rules.json";
const rules = JSON.parse(fs.readFileSync(rulePath, 'utf8'));
const filesInDir = fs.readdirSync(path.join(process.cwd(),"../"));

filterFiles(filesInDir, rules);

function filterFiles(f, r) {

  f.forEach(function(file){
    r.forEach(function(rule){
      var filter = new RegExp(rule.filter);
      
      if(filter.test(file)){
        var currentPath = "../"+file;        
        var newPath = path.join("../",rule.folderName, file);
        
        moveFile(currentPath,newPath);
      }
    });
  });
}


function moveFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
      });
}
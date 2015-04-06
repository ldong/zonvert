#!/usr/bin/env node

var program = require('commander');
var VERSION = require('./package.json').version;

// file management
var fs = require('fs-extra');
var path = require('path');
var recursive = require('recursive-readdir');

// utility packages
var ranma = require('zranma');
var fixmyjs = require('fixmyjs');

program
    .version(VERSION)
    .option('-c, --config <jshint path>', 'your own jshintrc config file path')
    .option('-d, --directory <path>', 'input directory to convert')
    .option('-o, --output directory <path>', 'output directory for converted files')
    .parse(process.argv);


var example = function(){
  console.log('\n  All options are rquired');
  console.log('\n  Example:');
  console.log('\n  zonvert -c ~/.jshintrc -d ./src/ -o ./build/');
  console.log('\n  -d and -o must be directory');
}

var parse = function(config, directory, output){
    try {
        if(fs.statSync(config).isFile() && fs.statSync(directory).isDirectory()){
            // var jshintConfig = fs.readJsonSync(config, { throws: false });
            var jshintConfig = fs.readJsonSync(config, { throws: false });
            if(!jshintConfig){
                throw new Error('Jshint config must be a valid json file');
            } else if(fs.existsSync(output) && fs.statSync(output).isDirectory()){
                throw new Error("Output directory already exists, please use one empty folder");
                convertAMDtoCMD(directory, output);
            } else {
                fs.mkdirSync(output);
                console.log('Directory ', output,' created.');
                convertAMDtoCMD(directory, output);
            }
        }
    } catch (e){
      console.log(e);
      example();
    }
};


var convertAMDtoCMD = function(directory, output){
    // files is an array of file paths that does not inclue directories path
    recursive(directory, function (err, files) {
      for(var i=0; i< files.length; ++i){
          var filePath = files[i];
          var basename = path.basename(filePath);
          var dirname = path.dirname(filePath);
          var relative = path.relative(directory, dirname);
          // console.log(directory);
          // console.log(dirname);
          // console.log(relative);

          if(path.extname(filePath) === '.js') {
              // create directory
              var targetDirectoryPath = path.resolve(output, relative);
              fs.mkdirp(targetDirectoryPath);
              // console.log('Directory: ', targetDirectoryPath, ' created');

              // copy file
              var targetFilePath = path.resolve(targetDirectoryPath, basename);
              fs.copySync(filePath, targetFilePath);
              // console.log('File: ', targetFilePath, 'created');


              // ensure it is a file
              if (fs.statSync(targetFilePath).isFile()) {
                  // console.log('It is file');
                  // console.log('TargetFilePath: ', targetFilePath);
                  convertFileFromAMDtoCMD(targetFilePath);
              } else {
                  console.log('It is directory');
              }

          }
      }
    });
};

var convertFileFromAMDtoCMD = function(filePath){
    try{
        var data = fs.readFileSync(filePath);
        var newData = ranma.cjsify(data.toString());
        fs.writeFileSync(filePath, newData.toString());
    } catch (e) {
        console.log('filepath: ', filePath);
        console.log('Please fix it manually');
        console.log(e);
    }
};

var fixFormatUsingFixmyjs = function(){

    var fixmyjs = require('fixmyjs');
    var stringFixedCode = fixmyjs.fix(stringOfCode, objectOfOptions);
}


if(!(program.config && program.directory && program.output)){
    example();
    program.help();
} else {
    parse(program.config, program.directory, program.output);
}



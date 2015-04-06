#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var VERSION = require('./package.json').version;

var ranma = require('ranma');
var fixmyjs = require('fixmyjs');

program
    .version(VERSION)
    .option('-c, --config <jshint path>', 'your own jshintrc config file path')
    .option('-d, --directory <path>', 'input directory to convert')
    .option('-o, --output directory <path>', 'output directory for converted files')
    .parse(process.argv);


var example = function(){
  console.log('\n  All options are rquired');
  console.log('\n  Example:')
  console.log('\n  zonvert -c ~/.jshintrc -d ./src/ -o ./build/');
}

if(!(program.config && program.directory && program.output)){
    example();
    program.help();
} else {
    console.log(program.config);
    console.log(program.directory);
    console.log(program.output);

}



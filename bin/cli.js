#!/usr/bin/env node

'use strict';

const exec = require('child_process').exec;
const path = require('path');
const modulePath = path.dirname(__filename);
const os = require('os');
const fs = require('fs-extra');
const commandLineCommands = require('command-line-commands');
const commandLineUsage = require('command-line-usage');
const validCommands = [null, 'pack', 'run'];
const packageJson = require('../package.json');
var parsedCommands;

try {
  parsedCommands = commandLineCommands(validCommands);
}
catch (error) {
  if (error.name === 'INVALID_COMMAND') {
    displayHelp();
    process.exit(1);
  }
  else {
    throw error;
  }
}

var command = parsedCommands.command === null ? 'run' : parsedCommands.command;
const aframeAppPath = parsedCommands.argv[0];

// Make tmp dir
fs.mkdtemp(os.tmpdir(), (err, dir) => {
  if (err) { throw err; }
  console.log('Created Temp Directory:', dir);
  console.log('Copying A-Frame application:', aframeAppPath);
  fs.copySync(aframeAppPath, dir, {filter: filterNodeModules});
  fs.copySync(modulePath + '/main.js', dir + '/main.js');
  fs.ensureFileSync(dir + '/package.json');
  fs.writeJsonSync(dir + '/package.json', {"main": "./main.js"}, {flags: 'w'});
  checkPreferences();
  command = command === 'pack' ? 'package' : command;
  const child = exec('"' + modulePath + '\\..\\node_modules\\.bin\\qbrt" ' + command + ' ' + dir,
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) { console.log(`exec error: ${error}`); }
    });
});

function checkPreferences () {
  var preferencesFileName = modulePath + '/../node_modules/qbrt/defaults/preferences/prefs.js';
  var data = fs.readFileSync(preferencesFileName, 'utf-8');
  if(data.indexOf('dom.vr.require-gesture') < 0) {
    data += '\r\n' + 'pref("dom.vr.require-gesture", false);'
    fs.writeFileSync(preferencesFileName, data);
  }
}

function filterNodeModules(src, dest) {
  if (src.indexOf('node_modules') !== -1) { return false; }
  return true;
}

function displayHelp() {
  const sections = [
    {
      header: 'aframe-packer',
      content: 'aframe-packer packs your aframe app so you can publish it on Steam. '
    },
    {
      header: 'Synopsis',
      content: '$ aframe-packer <command> <path to a-frame app>',
    },
    {
      header: 'Command List',
      content: [
        { name: 'run', summary: 'Run an app. For testing' },
        { name: 'package', summary: 'Package an app for distribution.' },
      ],
    },
    {
      header: 'Examples',
      content: [
        {
          desc: '1. Run an app at the passed directory.',
          example: '$ aframe-packer run aframe-packer',
        },
        {
          desc: '2. Package an app at a path.',
          example: '$ aframe-packer package path/to/my/app/',
        }
      ],
    },
    {
      content: `Project home: [underline]{${packageJson.homepage}}`,
    },
  ];

  const usage = commandLineUsage(sections);
  console.log(usage);
}
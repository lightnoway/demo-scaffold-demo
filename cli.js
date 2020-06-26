#!/usr/bin / env node
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const templatesDir = path.join(__dirname, 'templates');
const templates = fs.readdirSync(templatesDir);

let answers;
inquirer.prompt([
  { name: 'fileName', type: 'input', default: 'index.html' },
  {
    name: 'template', type: "rawlist", choices: templates
  }
]).then(makeFile);

function makeFile({ fileName, template }) {
  const toCopy = path.join(templatesDir, template);
  const destPath = path.resolve(fileName);
  fs.createReadStream(toCopy).pipe(fs.createWriteStream(destPath));
}

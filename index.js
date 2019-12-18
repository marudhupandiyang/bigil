const fs = require('fs');

const htmlparser = require('htmlparser2').parseDOM;
const DomUtils = require('htmlparser2').DomUtils;
const jsparser = require('acron');
const estreewalker = require('estree-walker');

function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
}

function parseFile(filePath) {
  console.log(`Starting to process ${filePath}`);
  const filecontent = readFile(filePath);
  const rootElm = htmlparser(filecontent);
  return rootElm;
}


function processScriptsInHTML(parsedContent) {
  console.log('Processing Scripts...!');
  const scriptTags = DomUtils.findAll(function (e) {
    if (e.tagName === 'script' && (!e.attribs['type'] || e.attribs['type'] == 'text/javascript')) {
      if (e.children.length > 1) {
        return console.log('Unknown. Script has more than 1 child!!');
      }

      e.children[0].data += "\nconsole.log('Added by Bigil');\n";
    }
  }, parsedContent);
  return parsedContent;
}


const fileToProcess = process.argv[2];
const parsedContent = parseFile(fileToProcess);
processScriptsInHTML(parsedContent);

const finalOutput = DomUtils.getOuterHTML(parsedContent);
if (finalOutput) {
  fs.writeFileSync(`${fileToProcess}.processed`, finalOutput);
} else {
  console.info('We did not find anything');
}


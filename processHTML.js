const DomUtils = require('htmlparser2').DomUtils;

function parse(parsedContent, options = {}) {
  const textNodes = DomUtils.findAll(e => {
    // console.log(e.type, e.name, e.children.length, e.children[0] && e.children[0].type);
    for (let i = 0; i < e.children.length; i += 1) {
      if (e.children[i].type === 'text') {
        return true;
      }
    }
    return false;
  }, parsedContent);

  textNodes.forEach(function (e) {
    for (let i = 0; i < e.children.length; i += 1) {
      const child = e.children[i];
      if (child.type === 'text' && child.data) {
        let newData = child.data;
        const matchRegex = new RegExp(/(?<!\\){name}/gi);
        let res = null;
        while((res = matchRegex.exec(child.data)) !== null) {
          debugger;
          console.log(res[0]);
        }
      }
    }
  });
}

module.exports = parse;

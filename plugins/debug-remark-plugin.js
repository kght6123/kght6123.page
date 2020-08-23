const visit = require('unist-util-visit')
function debug() {
  function visitor(node) {
    // node.value = node.value.replace(emojiRegex(), match => {
    //   node.type = 'html';
    //   const description = gemoji.unicode[match]
    //     ? gemoji.unicode[match].description
    //     : '';
    //   return `<span role="img" aria-label="${description}">${match}</span>`;
    // });
    // console.log(`plugins/debug-remark-plugin.js:debug`, node.value)
  }
  function transform(markdownAST) {
    visit(markdownAST, 'text', visitor)
  }
  return transform
}

module.exports = debug;
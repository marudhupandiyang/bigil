var babel = require("@babel/core");

function processScript(content, passedOptions = {}) {
  const options = {
    presets: [
      [
        "@babel/preset-env",
        {
          "targets": {
            "esmodules": true
          }
        }
      ],
    ],
    babelrc: false,
    configFile: false,
  };

  if (passedOptions.mode === 'production' || passedOptions.minify) {
    options.presets.push('minify');
  }

  const { code } = babel.transformSync(content, options);
  return code;
};

module.exports = processScript;

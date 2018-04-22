const fs = require('fs');

function _get_brands(path) {
  var brands = {};
  fs.readdirSync(path).filter(function (file) {
    return fs.statSync(`${path}/${file}`).isDirectory();
  }).forEach(function (brand) {
    var auth = JSON.parse(fs.readFileSync(`./${path}/${brand}/auth.json`, 'utf8'));
    brands[brand] = {
      auth
    };
  });
  return brands;
}

function _get_scripts(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(`${path}/${file}`).isFile();
  }).map(function (element) { 
    return element.split('.')[0];
  });
}

module.exports = {
  get_brands: _get_brands,
  get_scripts: _get_scripts
}

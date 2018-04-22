const express = require('express');
const concat = require('concat');
const utils = require('./utils/utils');

const brands = utils.get_brands('./brands');
const scripts = utils.get_scripts('./scripts');

console.log(JSON.stringify(brands, undefined, 2), '\n');
console.log(JSON.stringify(scripts, undefined, 2), '\n');

const app = express();

app.get('/:script/:brand/:env/:token', function (req, res, next) {
  if (scripts.indexOf(req.params.script) < 0)
    return res.sendStatus(404);
  if (!brands[req.params.brand])
    return res.sendStatus(404);
  if (['dev', 'qa', 'prod'].indexOf(req.params.env) < 0)
    return res.sendStatus(404);
  if (brands[req.params.brand].auth.token != req.params.token)
    return res.sendStatus(401);
  next();
});

app.get('/:script/:brand/:env/:token', function (req, res) {
  concat([
    `./brands/${req.params.brand}/envs.js`,
    `./utils/set_${req.params.env}.js`,
    `./scripts/${req.params.script}.js`
  ]).then(result => {
    res.set({
      'Content-Disposition': `attachment; filename="${req.params.brand}_${req.params.env}_${req.params.script}.js"`}
    );
    res.send(result);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('PORT:', port);
});

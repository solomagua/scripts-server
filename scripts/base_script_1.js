// Start of base_script_1 ----
setInterval(function () { 
  console.error('base_script_1');
  console.log(`TS: ${Date.now()}`);
  console.log(JSON.stringify(envs, undefined, 2));
}, 3000);

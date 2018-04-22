// Start of base_script_2 ----
setInterval(function () { 
  console.error('base_script_2');
  console.log(`TS: ${Date.now()}`);
  console.log(JSON.stringify(envs, undefined, 2));
}, 3000);

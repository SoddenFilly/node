function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dotdotdot() {
  await sleep(800);
  document.write(".");
  await sleep(800);
  document.write(".");
  await sleep(800);
  document.write(".");
}
  
async function Testing() {
  
  document.write("Initializing");
  await sleep(1);
  document.write("Initializing");
  dotdotdot();
  await sleep(3400);
  document.write("<br>");
  document.write("Starting booting sequence");
  dotdotdot();
}

Testing();
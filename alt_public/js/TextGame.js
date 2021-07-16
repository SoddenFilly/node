function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dotdotdot() {
  await sleep(800);
  document.write(".");
  await sleep(800);
  document.write(".");
  await sleep(800);
  document.write(".");
}
  
  async function Testing() {
    document.write("Initializing");
    document.write("Initializing");
    dotdotdot();
    await sleep(1000);
    document.write("<br>");
    document.write("Starting booting sequence");
    dotdotdot();
  }
  
  Testing();
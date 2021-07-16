function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function Testing() {
    document.write("Initializing");
    await sleep(1);
    document.write("Initializing");
    await sleep(800);
    document.write(".");
    await sleep(800);
    document.write(".");
    await sleep(800);
    document.write(".");
    await sleep(1000);
    document.write("<br>");
    document.write("Starting booting sequence");
  }
  
  Testing();
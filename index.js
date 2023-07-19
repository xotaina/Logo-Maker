const readline = require('readline');
const { generateSvg, saveSvg } = require('./lib/shapes');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Convert the question function into a promise
const question = (query) => {
  return new Promise(resolve => {
    read.question(query, (answer) => {
      resolve(answer);
    });
  });
}

const run = async () => {
  try {
    const text = await question("Enter Text for logo (Up to 3 characters): ");
    const textColor = await question("Enter text color (text or hexadecimal): ");
    const shape = await question("Choose shape for logo (Circle, Square Or Triangle): ");
    const shapeColor = await question("Enter shape color (text or hexadecimal): ");
  
    const svg = generateSvg(text, textColor, shape, shapeColor);
  
    saveSvg(svg, `${text}.svg`, (err) => {
      if(err){
        console.error(`Failed to generate SVG File: ${err}`);
      } else{
        console.log(`SVG File (${text}.svg) has been generated`);
      }
      read.close();
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    read.close();
  }
};

run();

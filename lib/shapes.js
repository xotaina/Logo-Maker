const fs = require("fs");
const path = require("path");

const shapes = {
  circle: (shapeColor, textColor, text) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <circle cx="150" cy="100" r="80" fill="${shapeColor}" />
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>`,
  triangle: (shapeColor, textColor, text) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <polygon points="150, 18 244, 182 56, 182" fill="${shapeColor}" />
      <text x="150" y="150" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>`,
  square: (shapeColor, textColor, text) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <rect width="200" height="200" fill="${shapeColor}" />
      <text x="100" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>`
};

const generateSvg = (text, textColor, shape, shapeColor) => {
  const shapeFunc = shapes[shape.toLowerCase()];
  if (!shapeFunc) {
    throw new Error(`Invalid shape: ${shape}`);
  }
  return shapeFunc(shapeColor, textColor, text);
};

const saveSvg = (svgData, fileName, callback) => {
  const filePath = path.join(__dirname, '..', 'examples', fileName);
  fs.writeFile(filePath, svgData, callback);
};

module.exports = {
  generateSvg,
  saveSvg,
};

const fileSystem = require('fs');
const pathModule = require('path');
const { createSvg, storeSvg } = require('./shapes');

jest.mock('fs', () => ({
    writeFile: jest.fn((filePath, data, callback) => callback(null))
}));

function createExpectedSVG(text, textColor, shapeColor) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        <circle cx="150" cy="100" r="80" fill="${shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
    `;
}

describe('Module for Handling SVG Shapes', () => {
    describe('Creating SVG with createSvg()', () => {
        it('creates SVG string with provided input', () => {
            const svgString = createSvg('User Text', 'red', 'circle', 'green');
            const expectedSvg = createExpectedSVG('User Text', 'red', 'green');
            expect(svgString).toEqual(expectedSvg);
        });
    });

    describe('Storing SVG using storeSvg()', () => {
        const svgString = '<svg></svg>';
        const fileName ='test.svg';

        it('successfully stores the SVG string into a file', done => {
             storeSvg(svgString, fileName, error => {
                expect(error).toBeNull();
                expect(fileSystem.writeFile).toHaveBeenCalledWith(
                    pathModule.join(__dirname, '..', 'examples', fileName),
                    svgString,
                    expect.any(Function)
                );
                done();
            });
        });

        it('handles errors when storing the SVG string to a file', done => {
            fileSystem.writeFile.mockImplementationOnce((filePath, data, callback) => {
                const error = new Error("Failed to save file");
                callback(error);
            });

            storeSvg(svgString, fileName, error => {
                expect(error).toEqual(expect.any(Error));
                expect(fileSystem.writeFile).toHaveBeenCalledWith(
                    pathModule.join(__dirname, "..", "examples", fileName),
                    svgString,
                    expect.any(Function)
                );
                done();
            });
        });
    });
});

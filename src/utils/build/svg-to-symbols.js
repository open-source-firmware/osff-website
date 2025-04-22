import fs from "fs";
import path from "path";
import { promisify } from "util";
import { JSDOM } from "jsdom";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const inputDir = "src/assets/icons";
const outputFile = "dist/assets/icons.svg";

export async function svgToSymbols() {
  console.log("SVG to Symbols running...");

  try {
    const files = await fs.promises.readdir(inputDir);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    if (svgFiles.length === 0) {
      console.log("No SVG files found in the input directory.");
      return;
    }

    const symbols = await Promise.all(
      svgFiles.map(async (file) => {
        const filePath = path.join(inputDir, file);
        const data = await readFile(filePath, "utf8");
        const dom = new JSDOM(data);
        const svg = dom.window.document.querySelector("svg");

        if (!svg) {
          console.warn(`No <svg> element found in ${file}. Skipping.`);
          return "";
        }

        // Replace black color with currentColor
        const svgContent = svg.innerHTML
          .replace(/fill="black"/gi, 'fill="currentColor"')
          .replace(/fill="#000"/gi, 'fill="currentColor"')
          .replace(/fill="#000000"/gi, 'fill="currentColor"')
          .replace(/stroke="black"/gi, 'stroke="currentColor"')
          .replace(/stroke="#000"/gi, 'stroke="currentColor"')
          .replace(/stroke="#000000"/gi, 'stroke="currentColor"');

        const viewBox = svg.getAttribute("viewBox") || "0 0 32 32";
        const id = `svg-${path.basename(file, ".svg")}`;

        // Check if the SVG uses the sketch namespace
        const usesSketch = svgContent.includes('sketch:');

        // Add the sketch namespace if needed
        const namespaces = usesSketch ?
          'xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"' :
          'xmlns="http://www.w3.org/2000/svg"';

        const symbol = `<symbol viewBox="${viewBox}" id="${id}" ${namespaces}>${svgContent}</symbol>`;
        return symbol;
      })
    );

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  ${symbols.join("\n  ")}
</svg>`;

    await writeFile(outputFile, svgContent);
    console.log("SVG to Symbols completed successfully.");
  } catch (error) {
    console.error("Error processing SVG files:", error);
  }
}
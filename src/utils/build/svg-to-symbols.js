import fs from "fs";
import path from "path";
import { promisify } from "util";
import { JSDOM } from "jsdom";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const inputDir = "src/assets/icons";
const outputFile = "dist/assets/icons.svg";

// Function to recursively find all SVG files in a directory and its subdirectories
async function findSvgFiles(dir) {
  let results = [];
  const items = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const subDirResults = await findSvgFiles(itemPath);
      results = [...results, ...subDirResults];
    } else if (item.name.endsWith('.svg')) {
      results.push(itemPath);
    }
  }

  return results;
}

export async function svgToSymbols() {
  console.log("SVG to Symbols running...");

  try {
    // Find all SVG files in the input directory and subdirectories
    const svgFilePaths = await findSvgFiles(inputDir);

    if (svgFilePaths.length === 0) {
      console.log("No SVG files found in the input directory or subdirectories.");
      return;
    }

    const symbols = await Promise.all(
      svgFilePaths.map(async (filePath) => {
        const data = await readFile(filePath, "utf8");
        const dom = new JSDOM(data);
        const svg = dom.window.document.querySelector("svg");
        const fileName = path.basename(filePath);

        if (!svg) {
          console.warn(`No <svg> element found in ${fileName}. Skipping.`);
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

        // Create simple ID without folder path
        const id = `svg-${path.basename(fileName, ".svg")}`;

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
    console.log(`Processed ${symbols.filter(s => s !== "").length} SVG files.`);
  } catch (error) {
    console.error("Error processing SVG files:", error);
  }
}
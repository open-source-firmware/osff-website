// @ts-nocheck

// Build Script
import { svgToSymbols } from "./src/utils/build/svg-to-symbols.js";

// Filters
import { markdownFilter } from "./src/utils/filters/markdown.js";
import { readableDateFilter } from "./src/utils/filters/readable-date.js";
import { toISODate } from "./src/utils/filters/to-iso-date.js";

// Plugins
import fs from "node:fs";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// Transforms
import { purgeCSS } from "./src/utils/transforms/css-purge-inline.js";

// Shortcodes
import { iconShortcode } from "./src/utils/shortcodes/icon.js";
import { scriptShortcode } from "./src/utils/shortcodes/script.js";

// Other
import buildSystem from "@cagov/11ty-build-system";
import { globPlugin } from "esbuild-plugin-glob";
import path from "path";
import util from "util";

// Get the current directory
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === "production";

/** @param {import("./node_modules/@11ty/eleventy/src/UserConfig.js").default} config */
export default function EleventyConfig(config) {
  const cssDir = path.join(__dirname, "/dist/assets/css/");
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, {
      recursive: true,
    });
  }

  config.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
    await svgToSymbols();
  });

  config.setServerOptions({
    watch: ["dist/assets/css/**/*.css"],
  });

  // config.addWatchTarget("./dist/assets/css/");

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy({ public: "/" });
  config.addPassthroughCopy("./src/assets/images/");
  config.addPassthroughCopy("./src/assets/fonts/");
  config.addPassthroughCopy("./src/assets/downloads/");

  // Add filters
  config.addFilter("readableDate", readableDateFilter);
  config.addFilter("toISODate", toISODate);
  config.addFilter("markdownFilter", markdownFilter);
  config.addFilter("limit", (arr, limit) => arr.slice(0, limit));

  // Add capitalize filter
  config.addFilter("capitalize", function (str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  // Event filters
  config.addFilter("filterUpcomingEvents", (events) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 00:00 heute

    return events
      .filter((event) => {
        const dateStr = event.data.date;

        // Extra check: Datum parsen
        const eventDate = new Date(dateStr);

        if (isNaN(eventDate)) {
          console.warn("Invalid event date:", event.data.title, dateStr);
          return false;
        }

        const eventDateOnly = new Date(
          eventDate.getFullYear(),
          eventDate.getMonth(),
          eventDate.getDate()
        );

        return eventDateOnly >= today;
      })
      .sort((a, b) => {
        return new Date(a.data.date) - new Date(b.data.date);
      });
  });

  config.addFilter("filterPastEvents", (events, today) => {
    if (!today) {
      today = new Date();
    }
    return events
      .filter((event) => {
        const eventDate = new Date(event.data.date);
        return eventDate < today;
      })
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });

  config.addFilter("filterHotEvent", (events) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Heute um Mitternacht

    return events
      .filter((event) => {
        const eventDate = new Date(event.data.date);

        // Event muss in der Zukunft liegen und hotEvent muss true sein
        if (isNaN(eventDate) || eventDate < today || !event.data.hotEvent) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(a.data.date) - new Date(b.data.date)); // nach Datum sortieren
  });

  // Add a date filter to format dates
  config.addFilter("date", function (date, format) {
    if (!date) return "";
    const d = new Date(date);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (format === "YYYY") {
      return d.getFullYear();
    }

    if (format === "MMMM DD") {
      return `${monthNames[d.getMonth()]} ${d
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    }

    if (format === "MMMM DD, YYYY") {
      return `${monthNames[d.getMonth()]} ${d
        .getDate()
        .toString()
        .padStart(2, "0")}, ${d.getFullYear()}`;
    }

    return date;
  });

  config.addFilter("console", function (value) {
    return util.inspect(value);
  });

  // Add Shortcodes
  config.addShortcode("icon", iconShortcode);
  config.addShortcode("script", scriptShortcode);

  // Plugins
  config.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: "html",

    outputDir: "./dist/assets/images/",
    urlPath: "/assets/images/",

    // Add any other Image utility options here:

    // optional, output image formats
    formats: ["webp", "jpeg"],

    // optional, output image widths
    widths: ["auto"],
    sizes: "(max-width: 600px) 100vw, 50vw", // Responsive sizes

    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  config.addPlugin(buildSystem, {
    processors: {
      esbuild: {
        watch: ["src/assets/scripts/**/*"],
        options: {
          entryPoints: [path.resolve(__dirname, "src/assets/scripts/**/*")],
          bundle: true,
          minify: isProduction,
          outdir: "dist/assets/scripts",
          splitting: true,
          format: "esm",
          plugins: [globPlugin()],
        },
      },
      postcss: {
        file: "postcss.config.cjs",
        watch: [
          "src/assets/css/**/*",
          "src/assets/design-tokens/**/*",
          "tailwind.config.js",
          "node_modules/tailwindcss/*.css",
          "src/**/*.njk",
        ],
      },
    },
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform("purgeCSS", purgeCSS);
  }

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist"
    },
    // Ignore the events directory for page generation
    templateFormats: ["njk", "md"]
  };
}

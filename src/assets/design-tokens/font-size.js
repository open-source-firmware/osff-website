// import { calculateTypeScale } from "utopia-core";
import { interpolate } from "../../utils/css/interpolate";

/**
 * Define your font-size scale here
 * You can use the `calculateTypeScale` function from `utopia-core` to generate a scale, visually customizable on https://utopia.fyi/type/calculator/ and copyable to your project in the "PostCSS" tab on the site
 */
export const fontSize = {
  "step--2": "0.75rem",
  "step--1": interpolate({ min: 15, max: 20 }),
  "step-0": interpolate({ min: 17, max: 24 }),
  "step-1": interpolate({ min: 20, max: 30 }),
  "step-2": interpolate({ min: 22, max: 38 }),
  "step-3": interpolate({ min: 30, max: 54 }),
  "step-4": interpolate({ min: 30, max: 70 }),
};

/**
 * Example of using `calculateTypeScale` to generate a scale
 */

// calculateTypeScale({
//   minWidth: 320,
//   maxWidth: 1140,
//   minFontSize: 16,
//   maxFontSize: 20,
//   minTypeScale: 1.2,
//   maxTypeScale: 1.25,
//   positiveSteps: 5,
//   negativeSteps: 2,
//   prefix: "step",
// }).reduce(
//   (obj, item) => ({
//     ...obj,
//     ...{ [`step-${item.step}`]: item.clamp },
//   }),
//   {}
// );

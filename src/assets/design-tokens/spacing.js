// import { calculateSpaceScale } from "utopia-core";

import { interpolate } from "../../utils/css/interpolate";

/**
 * Define your spacing scale here
 * You can use the `calculateSpaceScale` function from `utopia-core` to generate a scale, visually customizable on https://utopia.fyi/space/calculator/ and copyable to your project in the "PostCSS" tab on the site
 * Or you can write your own scale manually with the `interpolate` function
 */
export const spacing = {
  xxs: interpolate({ min: 5, max: 10, vwMin: 480, vwMax: 1440 }),
  xs: interpolate({ min: 10, max: 20, vwMin: 480, vwMax: 1440 }),
  s: interpolate({ min: 20, max: 35, vwMin: 480, vwMax: 1440 }),
  m: interpolate({ min: 30, max: 50, vwMin: 480, vwMax: 1440 }),
  l: interpolate({ min: 40, max: 80, vwMin: 480, vwMax: 1440 }),
  xl: interpolate({ min: 70, max: 120, vwMin: 480, vwMax: 1440 }),
  "2xl": interpolate({ min: 100, max: 280, vwMin: 480, vwMax: 1440 }),
  "3xl": interpolate({ min: 150, max: 400, vwMin: 480, vwMax: 1440 }),
};

/**
 * Example of using `calculateSpaceScale` to generate a scale
 */

// const spaceScale = calculateSpaceScale({
//   minWidth: 320,
//   maxWidth: 1140,
//   minSize: 16,
//   maxSize: 20,
//   positiveSteps: [1.5, 2, 3, 4, 6],
//   negativeSteps: [0.75, 0.5, 0.25],
//   // customSizes: ["m-xl"],
//   prefix: "space",
// });

// export const spacing = [
//   ...spaceScale.sizes,
//   ...spaceScale.oneUpPairs,
//   ...spaceScale.customPairs,
// ].reduce(
//   (obj, item) => ({
//     ...obj,
//     ...{ [item.label]: item.clamp },
//   }),
//   {}
// );
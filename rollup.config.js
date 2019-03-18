"use strict";

import clear from "rollup-plugin-clear";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import screeps from "rollup-plugin-screeps";

let cfg = require('./screeps.json');
if (!cfg) {
  throw new Error("Please specify a screeps.json file");
}

export default {
  input: "src/main.ts",
  output: {
    file: `${cfg.output_directory}/main.js`,
    format: "cjs",
    sourcemap: true
  },

  plugins: [
    clear({ targets: [cfg.output_directory] }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    screeps({ dryRun: true })
  ]
}

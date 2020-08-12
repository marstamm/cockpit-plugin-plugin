import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";

export default {
  input: "src/index.js",
  output: {
    file: "/home/stamm/Develop/camunda-bpm-webapp/ui/cockpit/public/custom/index.js"
  },
  plugins: [
    resolve(),
    babel(),
    commonjs({
      include: "node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    scss()
  ]
};
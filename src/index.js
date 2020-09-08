import { require, define } from "./lib/require";
// import config from './original-config';

import angular from "angular";
import "./lib/setup_compiled";
import { startLoading, stopLoading, reload } from "./loadingScreen";

window.define = define;

window.loadedPlugins = [];
let deps;

const setup = window.legacyPluginSetup.default;

startLoading();

(async () => {
  const config = (await import("" + "./config.js")).default.legacyScripts;
  console.log(config);
  for (const [key, value] of Object.entries(config.paths)) {
    if (value.includes("http")) continue;
    config.paths[key] = "../" + value;
  }
  require.config({ paths: config.paths });

  define("angular", function () {
    return angular;
  });

  require(config.deps, function (..._deps) {
    deps = _deps;

    deps.forEach((el) => {
      setup(el);
    });

    bootstrapPlugin("a", document.createElement("div"), 0);

    // console.log(window.loadedPlugins);

    const loadedPluginJson = JSON.stringify(window.loadedPlugins);
    const oldLoadedPlugins = localStorage.getItem("loadedPlugins");

    localStorage.setItem("loadedPlugins", JSON.stringify(window.loadedPlugins));

    if (loadedPluginJson != oldLoadedPlugins) {
      reload();
    } else {
      stopLoading();
    }

    console.log("you are here", deps, window.loadedPlugins);
  });

  require(["angular"], function (angular) {
    console.log(angular);
  });
})();

function bootstrapPlugin(pluginPoint, node, id) {
  //   deps;

  var controller = [
    "$scope",
    "Views",
    function (scope, views) {
      scope.plugin = views.getProviders({ component: pluginPoint })[id];
    },
  ];

  const module = angular.module(
    "myModule",
    deps.map((el) => el.name)
  );

  module.controller("myViewController", controller);

  node.innerHTML = `
  <div ng-controller="myViewController">
        <view provider="plugin"></view>
  </div>`;
  angular.bootstrap(node, [module.name]);

  return module;
}

const lastPlugins = JSON.parse(localStorage.getItem("loadedPlugins"));
let counter = {};

let pluginDefs = lastPlugins.map(({ key, definition }) => {
  if (counter[key]) counter[key]++;
  else counter[key] = 1;

  return {
    id: definition.id,
    pluginPoint: key,
    priority: definition.priority,
    label: definition.label,
    render: (node) => {
      bootstrapPlugin(key, node, counter[key] - 1);
    },
  };
});

console.log("pluginDefs", pluginDefs);

export default pluginDefs;

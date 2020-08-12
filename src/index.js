import {require, define} from "./lib/require"
import config from './original-config';

import angular from "angular";
import setup from "./lib/setup";

// console.log(window.legacyPluginSetup);

// var angular = window.legacyPluginSetup.angular
// var setup = window.legacyPluginSetup.setup

require.config({paths: config.paths});

window.define = define;



console.log(setup, angular);

require.config({paths: config.paths});

window.define = define;

define('angular', function() {
    return angular;
  }
);

let moduleName;

require(['cats'], function(cats) {
    var controller = [ '$scope', 'Views', function(scope, views) {
        console.log(scope, views);
        scope.plugins = views.getProviders({component: 'cockpit.dashboard'});
    }];

    const module = angular.module('myModule', [cats.name]);
    setup(cats);

    module.controller(
        "myViewController",
        controller
    );

    moduleName = module;
    console.log(moduleName);
    console.log('cats', cats);
})

require(['angular'], function(angular) {
    console.log(angular);
});

export default {
    id: "cockpit.cats",
    pluginPoint: "cockpit.dashboard",
    priority: 9,
    label: "Cats!",
    render: node => {
        console.log(moduleName);

        node.innerHTML = `
        <div ng-controller="myViewController">
            <div ng-repeat="plugin in plugins"
                class="deprecate-dashboard-view row"
                data-plugin-id="{{ plugin.id }}">
                <view vars="dashboardVars"
                    provider="plugin"></view>
            </div>
        </div>`
        angular.bootstrap(node, [moduleName.name])
    }  
}
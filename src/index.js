import {require, define} from "./lib/require"
import angular from 'angular'
import config from './original-config';

import setup from "./lib/setup"


// console.log(require, define);

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
    }];

    const module = angular.module('myModule', [cats.name]);
    module.controller(
        "myViewController",
        controller
    );

    moduleName = module;
    console.log(moduleName);
    console.log('cats', cats);
})

export default {
    id: "cockpit.cats",
    pluginPoint: "cockpit.dashboard",
    priority: 9,
    label: "Cats!",
    render: node => {
        console.log(moduleName);

        node.innerHTML = '<div ng-controller="myViewController"></div>'
        angular.bootstrap(node, [moduleName.name])
    }  
}

require(['angular'], function(angular) {
    console.log(angular);
});


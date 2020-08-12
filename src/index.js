import {require, define} from "./lib/require"
import angular from 'angular'
import config from './original-config';
// console.log(require, define);

require.config({paths: config.paths});

window.define = define;

define('angular', function() {
    return angular;
  }
);

// let moduleName;

require(['cats'], function(cats) {
    var controller = [ '$scope', 'Views', function(sope, views) {
        console.log(scope, views);
    }];

    const module = angular.module('myModule', [cats.name]);
    ngModule.controller(
        "myViewController",
        controller
    );


    console.log('cats', cats);
})

// export default {
//     id: "cockpit.cats",
//     pluginPoint: "cockpit.dashboard",
//     priority: 9,
//     label: "Cats!",
//     render: node => {}  
// }

require(['angular'], function(angular) {
    console.log(angular);
});


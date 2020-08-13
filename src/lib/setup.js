import angular from "angular";
import viewsProvider from "./viewsProvider"
import viewDirective from "./viewDirective"
// var camCommonsModule = require( "./angularModules/legacy/camunda-commons-ui/lib");
// var pluginsModule = require( "./angularModules/legacy/plugins");
// var services = require( "./angularModules/legacy/client/scripts/services/main");
// var resources = require( "./angularModules/legacy/client/scripts/resources/main");
// var filters = require( "./angularModules/legacy/client/scripts/filters/main");
// var directives = require( "./angularModules/legacy/client/scripts/directives/main");
// var eePlugins = require( "./angularModules/enterprise/cockpit/cockpitPluginsEE");


export default function setup(module) {
    // module.requires.push(
    //     camCommonsModule.name,
    //     dataDepend.name,
    //     pluginsModule.name,
    //     services.name,
    //     resources.name,
    //     filters.name,
    //     directives.name,
    //     eePlugins.name
    //   );
    
    var ngModule = angular.module('cockpit.setup.stuff', []);

    
    viewDirective(ngModule);
    viewsProvider(ngModule);

    module.requires.push(ngModule.name);
    return module;
}
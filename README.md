# cockpit-plugin-plugin
The Plugin to run Camunda 7.13 Plugins in 7.14.
Tested on Camunda-BPM 7.14.0-alpha2

## Building the Project
Install the project with `npm i` and build the plugin with `npm run build`. Your plugin will be created in `dist/plugin.js`.

## Integrate into Camunda Webapp
Copy the `plugin.js` file into the `app/cockpit/scripts/` folder in your Camunda webapp distribution. For the Tomcat distribution, this would be `server/apache-tomcat-X.X.XX/webapps/camunda/app/cockpit/scripts/`.

Add the following content to the `app/cockpit/scripts/config.js` file:
```
// …
  customScripts: [
    'scripts/plugin.js'
  ]
// …
```

Add append the content of `dist/plugin.css` to `app/cockpit/styles/user-styles.css`.

You can now add old Plugins to Cockpit, e.g. `cats.js` plugin from `/example`. Add the old `customScripts` configuration th the `app/cockpit/scripts/config.js` file as `legacyScripts`:

```
// …
  legacyScripts: {
    ngDeps: ['cockpit.cats'],
    deps: ['cats'],
    // RequreJS path definitions
    paths: {
        'cats': 'scripts/cats'
    }
  }
// …
```

## Limitations
- Camunda Services/Directives. Currently a work in progress on the `directives` branch.
- Routes
- Any plugin using DataDepend

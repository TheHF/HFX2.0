# HFX2.0
> Enhance your HackForums experience - rewritten from the ground up with the community in mind

 ![HFX Logo](https://github.com/xadamxk/HFX2.0/blob/develop/extension/assets/images/banner-large.png)


## Getting Started (Development)
### Docker
- Build and tag the container:
```bash
docker build -t hfx:develop
```
- Interacting with the container
```
docker run hfx:0001 gulp libs
[22:26:04] Using gulpfile /app/gulpfile.js
[22:26:04] Starting 'libs'...
[22:26:04] Finished 'libs' after 17 ms
```
- `/app` Is the working directory
```bash
docker run hfx:develop ls -lsa
```

### Manual
- Install Node.js >=v11.0
- Install Yarn >=v1.13.0
- Clone this project and navigate to the project directory
- Install dependencies: ```yarn```
- Install gulp globally: ```yarn global add gulp```
- Build the project: ```gulp build```
- Copy library assets: ```gulp libs```
- Watch code for changes: ```gulp watch```

### Development Tools & Features
- **ESLint**: Linter to catch warnings and format code
- **Gulp**: Task runner to build project and watch for changes
- **Hot-Reload**: Automatically reload applicable tabs on code change
- **Husky**: Commit hook to lint code changes and run unit tests
- **Mustache**: Add new modules via templating system
- **Jest**: Framework for unit testing
- **Sinon-Chrome**: Mock chrome extensions API (unit testing)

## Features, Modules, and More
### Adding Features
- Create feature using template: ```yarn template```
- Choose a template type: ```Feature```
- Provide feature meta data:
  - Name: The name of the feature (label in settings)
  - Section: The section this feature will be grouped into
  - Description: Additional feature information found in settings
  - Default Settings: Enabled by default (yes,no)
- Code your feature in the run function: ```src/features/{section}/{your_feature_name}.js```
- Test by side loading HFX and load a page that matches the feature's section path

### Adding Sections
- Create section using template: ```yarn template```
- Choose a template type: ```Section```
- Provide section meta data:
  - Name: The name of the section (referenced by features)
  - Paths: An array of URL paths that features of this section will trigger on (ex. /index.php, /game.php)
- Add a new feature (above) and select the newly created section

### Feature Configuration & Customization
Some features need more options beyond the default enabled/disabled and that is possible using configurables in the feature's constructor. The snippet below adds each of the available configurables: checkbox, textbox, and color. Each configurable requires a unique id, a label for settings, and a default value appropriate to the configurable type.

```javascript
// Import Configurables
const ConfigurableArray = require("../../core/ConfigurableArray");
const Checkbox = require("../../configurables/Checkbox");
const Text = require("../../configurables/Text");
const Color = require("../../configurables/Color");
const Stepper = require("../../configurables/Stepper");
const Dropdown = require("../../configurables/Dropdown");
const Option = require("../../models/option.js");

// Util helper to get configurable values
const Util = require("../../core/Util");

class MyFeature extends Feature {
    constructor() {
        super({
            section: MySection,
            name: "My Feature",
            default: true,
            description: "Does something cool",
            configurables: new ConfigurableArray(
                new Checkbox({ id: "myCheckbox", label: "Enable sub-option", default: true }),
                new Text({ id: "myTextbox", label: "Sub-option value", default: "Secret Setting" }),
                new Color({id: "myColor", label: "Sub-option color", default: "#ffffff"}),
                new Stepper({id: "myStepper", label: "Sub-option stepper", step: 2, default: 3}),
                new Dropdown({id: "myDropdown", label: "Sub-option dropdown", default: 0, dropdownOptions: [
                    new Option(0, "Option 0"),
                    new Option(1, "Option 1")
                ]})
            )
        });
    }

    run(settings){
        Util.getConfigurableValue("myCheckbox", this, settings) // returns true
        Util.getConfigurableValue("myTextbox", this, settings) // returns "Secret Setting"
        Util.getConfigurableValue("myColor", this, settings) // returns "#ffffff"
        Util.getConfigurableValue("myStepper", this, settings) // returns "3"
        Util.getConfigurableValue("myDropdown", this, settings) // returns "0"
    }
}
```

Accessing the configurable options is as easy as passing the settings as a parameter and using the Util.getConfigurableValue() to access values.

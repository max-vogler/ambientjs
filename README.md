# ambientjs
A simple ambient light detection library, using the ambient light sensor.

# Usage
```html
<script src="ambientjs/ambient-compiled.js"></script>
```

The library adds a class to the ```<html>``` element, depening on the ambient brightness.

| Brightness | Effect |
| ---------- | ------ |
| > 30 lux | ```<html class="ambient-bright">``` |
| < 30 lux | ```<html class="ambient-dark">``` |

# Compatibility
The library requires a device with an ambient light sensor and a browser with [support for the HTML5 Ambient Light API](http://caniuse.com/#feat=ambient-light). It has been tested on the following devices/browsers.

| Device | Browser | Compatibility |
| ------ | ------- | :-----------: |
| MacBook Pro | Chrome Canary (1) | :white_check_mark: |
| MacBook Pro | Firefox | :white_check_mark: |
| Android | Firefox | :white_check_mark: |

<sup>(1) Chrome Canary requires Experimental Web Platform Features to be enabled in ```about://flags```</sup>



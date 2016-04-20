# ambientjs
A simple ambient light detection library, using the ambient light sensor.

# Installation

```
bower install ambientjs
```

# Usage
```html
<script src="bower_components/ambientjs/ambient-compiled.js"></script>
```

The library adds a class to the ```<html>``` element, depening on the ambient brightness.

| Brightness | Effect |
| ---------- | ------ |
| > 5 lux    | ```<html class="ambient-bright">``` |
| < 5 lux    | ```<html class="ambient-dark">``` |

# Compatibility
The library requires a device with an ambient light sensor and a browser with [support for the HTML5 Ambient Light API](http://caniuse.com/#feat=ambient-light). It has been tested on the following devices/browsers.

| Device | Browser | Compatibility |
| ------ | ------- | :-----------: |
| MacBook Pro | Chrome (1) | :white_check_mark: |
| MacBook Pro | Firefox | :white_check_mark: |
| Android | Chrome (1) | :white_check_mark: |
| Android | Firefox | :white_check_mark: |

<sup>(1) Chrome Canary requires Experimental Web Platform Features to be enabled in ```about://flags```</sup>

# License

> The MIT License (MIT)
> 
> Copyright (c) 2016 [Max Vogler](https://www.maxvogler.de/)
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

'use strict';

function AmbientLightJS() {
    var _this = this;

    this.brightClass = 'ambient-bright';
    this.darkClass = 'ambient-dark';
    this.threshold = 5;
    this.automatic = true;
    this.transitionTime = 1.5;
    this.darkenFactor = 0.3;

    if (AmbientLightJS) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(AmbientLightJS)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                this[key] = AmbientLightJS[key];
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    var html = document.querySelector('html');
    var debugElement = document.querySelector('#ambient-debug');
    var toggles = [].slice.call(document.querySelectorAll('input[data-ambient=ambient]'));
    var automaticToggles = [].slice.call(document.querySelectorAll('button[data-ambient=automatic]'));

    var defaultState = true;
    var currentState = defaultState;

    var svgFilter = '\n            <svg xmlns="http://www.w3.org/2000/svg">\n                <filter id="ambientjs-darken">\n                    <feComponentTransfer>\n                        <feFuncR type="linear" slope="' + this.darkenFactor + '" />\n                        <feFuncG type="linear" slope="' + this.darkenFactor + '" />\n                        <feFuncB type="linear" slope="' + this.darkenFactor + '" />\n                    </feComponentTransfer>\n                </filter>\n            </svg>';

    var css = '\n            body {\n                transition: background-color ' + this.transitionTime + 's ease-in-out, color ' + this.transitionTime + 's ease-in-out;\n                -webkit-transition: background-color ' + this.transitionTime + 's ease-in-out, color ' + this.transitionTime + 's ease-in-out;\n            }\n\n            .ambient-dark body {\n                background-color: black;\n                color: #ccc;\n            }\n\n            .ambient-dark img.ambient {\n                -webkit-filter: url(\'#ambientjs-darken\');\n                filter: url(\'#ambientjs-darken\');\n            }\n        ';

    this.isBright = function () {
        return this.brightness >= this.threshold;
    };

    this.setState = function (isBright) {
        var element = arguments.length <= 1 || arguments[1] === undefined ? html : arguments[1];

        if (isBright === currentState) {
            return;
        }

        element.classList.add(isBright ? this.brightClass : this.darkClass);
        element.classList.remove(isBright ? this.darkClass : this.brightClass);

        toggles.forEach(function (toggle) {
            toggle.checked = !isBright;
            toggle.dispatchEvent(new Event('change', { bubbles: true }));
        });

        currentState = isBright;
        this.debug();
    };

    this.setAutomatic = function (isAutomatic) {
        this.automatic = isAutomatic;

        automaticToggles.forEach(function (toggle) {
            if (isAutomatic) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        });
    };

    this.debug = function () {
        if (!debugElement) {
            return;
        }

        var context = this.isBright() ? 'day' : 'night';
        debugElement.innerHTML = '{ context: <span>' + context + '</span>, ambient light: <span>' + this.brightness + ' lux</span>, threshold: <span>' + this.threshold + ' lux</span>, automatic: <span>' + (this.automatic ? 'yes' : 'no') + '</span> }';
    };

    // Initialize the page to day/night mode
    this.setState(defaultState);

    // Add styles and svg filters to the document
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    document.write(svgFilter);

    // Listen for changes in ambient light
    window.addEventListener('devicelight', function (event) {
        _this.brightness = event.value;
        _this.debug();

        if (_this.automatic) {
            _this.setState(_this.isBright());
        }
    });

    // Listen for changes made by the user
    toggles.forEach(function (toggle) {
        // TODO replace with addEventListener()
        toggle.onchange = function (event) {
            var isBright = !event.target.checked;

            if (_this.isBright() !== isBright) {
                _this.setAutomatic(false);
                _this.setState(isBright);
            }
        };
    });

    automaticToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function (event) {
            _this.setAutomatic(!_this.automatic);
            _this.debug();
        });
    });
}

window.AmbientLightJS = new AmbientLightJS();

//# sourceMappingURL=ambient-compiled.js.map
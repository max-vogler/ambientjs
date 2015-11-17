'use strict';

(function () {
    var html = document.getElementsByTagName('html')[0],
        brightClass = 'ambient-bright',
        darkClass = 'ambient-dark',
        threshold = 30,
        lastValue = undefined,
        lastState = undefined,
        automatic = true,
        defaultState = true,
        debugElement = document.querySelector("#ambient-debug"),
        toggles = [].slice.call(document.querySelectorAll("input[data-ambient=ambient]")),
        transition = 1.5,
        darkenFactor = 0.3,
        svgFilter = '\n            <svg xmlns="http://www.w3.org/2000/svg">\n                <filter id="ambientjs-darken">\n                    <feComponentTransfer>\n                        <feFuncR type="linear" slope="' + darkenFactor + '" />\n                        <feFuncG type="linear" slope="' + darkenFactor + '" />\n                        <feFuncB type="linear" slope="' + darkenFactor + '" />\n                    </feComponentTransfer>\n                </filter>\n            </svg>',
        css = '\n            body {\n                transition: background-color ' + transition + 's ease-in-out, color ' + transition + 's ease-in-out;\n                -webkit-transition: background-color ' + transition + 's ease-in-out, color ' + transition + 's ease-in-out;\n            }\n\n            .ambient-dark body {\n                background-color: black;\n                color: #ccc;\n            }\n\n            .ambient-dark img.ambient {\n                -webkit-filter: url(\'#ambientjs-darken\');\n                filter: url(\'#ambientjs-darken\');\n            }\n        ';

    function isBright() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? lastValue : arguments[0];

        return value >= threshold;
    }

    function setState(isBright) {
        var element = arguments.length <= 1 || arguments[1] === undefined ? html : arguments[1];

        if (isBright === lastState) {
            return;
        }

        lastState = isBright;
        element.classList.add(isBright ? brightClass : darkClass);
        element.classList.remove(isBright ? darkClass : brightClass);

        toggles.forEach(function (toggle) {
            toggle.checked = !isBright;
            toggle.dispatchEvent(new Event('change', { bubbles: true }));
        });

        debug();
    }

    function debug() {
        if (!debugElement) {
            return;
        }

        debugElement.innerHTML = '{ ambient light: <span>' + lastValue + ' lux</span>, mode: <span>' + (lastState ? 'day' : 'night') + '</span>, threshold: <span>' + threshold + ' lux</span>, automatic: <span>' + (automatic ? 'yes' : 'no') + '</span> }';
    }

    // Initialize the page to day/night mode
    setState(defaultState);

    // Add styles and svg filters to the document
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    document.write(svgFilter);

    // Listen for changes in ambient light
    window.addEventListener("devicelight", function (event) {
        lastValue = event.value;
        debug();

        if (automatic) {
            setState(isBright());
        }
    });

    // Listen for changes made by the user
    toggles.forEach(function (toggle) {
        // TODO replace with addEventListener()
        toggle.onchange = function (event) {
            var isBright = !event.target.checked;

            if (lastState !== isBright) {
                automatic = false;
                setState(isBright);
            }
        };
    });
})();

//# sourceMappingURL=ambient-compiled.js.map
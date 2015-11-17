'use strict';

(() => {
    var html = document.getElementsByTagName('html')[0],
        brightClass = 'ambient-bright',
        darkClass = 'ambient-dark',
        threshold = 30,
        lastValue = undefined,
        lastState = undefined,
        automatic = true,
        defaultState = true,
        debugElement = document.querySelector("#ambient-debug"),
        toggles = [].slice.call(document.querySelectorAll("input[data-ambient=ambient]"));

    function isBright(value = lastValue) {
        return value >= threshold;
    }

    function setState(isBright, element = html) {
        if (isBright === lastState) {
            return;
        }

        lastState = isBright;
        element.classList.add(isBright ? brightClass : darkClass);
        element.classList.remove(isBright ? darkClass : brightClass);

        toggles.forEach(toggle => {
            toggle.checked = !isBright;
            toggle.dispatchEvent(new Event('change', {bubbles: true}));
        });

        debug();
    }

    function debug() {
        if (!debugElement) {
            return;
        }

        debugElement.innerHTML = `{ ambient light: <span>${lastValue} lux</span>, mode: <span>${lastState ? 'day' : 'night'}</span>, threshold: <span>${threshold} lux</span>, automatic: <span>${automatic ? 'yes' : 'no'}</span> }`;
    }

    // Initialize the page to day/night mode
    setState(defaultState);

    // Listen for changes in ambient light
    window.addEventListener("devicelight", event => {
        lastValue = event.value;
        debug();

        if (automatic) {
            setState(isBright());
        }
    });

    // Listen for changes made by the user
    toggles.forEach(toggle => {
        toggle.addEventListener("change", event => {
            var isBright = !event.target.checked;

            if (lastState !== isBright) {
                automatic = false;
                setState(isBright);
            }
        };
    });
})();

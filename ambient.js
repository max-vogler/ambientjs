'use strict';

function AmbientLightJS() {
    this.brightClass = 'ambient-bright';
    this.darkClass = 'ambient-dark';
    this.threshold = 5;
    this.automatic = true;
    this.transitionTime = 1.5;
    this.darkenFactor = 0.3;

    if(AmbientLightJS) {
        for(var key of Object.keys(AmbientLightJS)) {
            this[key] = AmbientLightJS[key];
        }
    }

    var html = document.querySelector('html');
    var debugElement = document.querySelector('#ambient-debug');
    var toggles = [].slice.call(document.querySelectorAll('input[data-ambient=ambient]'));
    var automaticToggles = [].slice.call(document.querySelectorAll('button[data-ambient=automatic]'));

    var defaultState = true;
    var currentState = defaultState;

    var svgFilter = `
            <svg xmlns="http://www.w3.org/2000/svg">
                <filter id="ambientjs-darken">
                    <feComponentTransfer>
                        <feFuncR type="linear" slope="${this.darkenFactor}" />
                        <feFuncG type="linear" slope="${this.darkenFactor}" />
                        <feFuncB type="linear" slope="${this.darkenFactor}" />
                    </feComponentTransfer>
                </filter>
            </svg>`;

    var css = `
            body {
                transition: background-color ${this.transitionTime}s ease-in-out, color ${this.transitionTime}s ease-in-out;
                -webkit-transition: background-color ${this.transitionTime}s ease-in-out, color ${this.transitionTime}s ease-in-out;
            }

            .ambient-dark body {
                background-color: black;
                color: #ccc;
            }

            .ambient-dark img.ambient {
                -webkit-filter: url('#ambientjs-darken');
                filter: url('#ambientjs-darken');
            }
        `;

    this.isBright = function () {
        return this.brightness >= this.threshold;
    };

    this.setState = function (isBright, element = html) {
        if (isBright === currentState) {
            return;
        }
        currentState = isBright;

        element.classList.add(isBright ? this.brightClass : this.darkClass);
        element.classList.remove(isBright ? this.darkClass : this.brightClass);

        toggles.forEach(toggle => {
            toggle.checked = !isBright;
            toggle.dispatchEvent(new Event('change', {bubbles: true}));
        });

        this.debug();
    };

    this.setAutomatic = function (isAutomatic) {
        this.automatic = isAutomatic;

        automaticToggles.forEach((toggle) => {
            if(isAutomatic) {
                this.setState(this.isBright());
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
        debugElement.innerHTML = `{ context: <span>${context}</span>, ambient light: <span>${this.brightness} lux</span>, threshold: <span>${this.threshold} lux</span>, automatic: <span>${this.automatic ? 'yes' : 'no'}</span> }`;
    };

    // Initialize the page to day/night mode
    this.setState(defaultState);

    // Add styles and svg filters to the document
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    document.write(svgFilter);

    // Listen for changes in ambient light
    window.addEventListener('devicelight', (event) => {
        this.brightness = event.value;
        this.debug();

        if (this.automatic) {
            this.setState(this.isBright());
        }
    });

    // Listen for changes made by the user
    toggles.forEach((toggle) => {
        // TODO replace with addEventListener()
        toggle.onchange = event => {
            var isBright = !event.target.checked;

            if (currentState !== isBright) {
                this.setAutomatic(false);
                this.setState(isBright);
            }
        };
    });

    automaticToggles.forEach((toggle) => {
        toggle.addEventListener("click", (event) => {
            this.setAutomatic(!this.automatic);
            this.debug();
        });
    });
}

window.AmbientLightJS = new AmbientLightJS();

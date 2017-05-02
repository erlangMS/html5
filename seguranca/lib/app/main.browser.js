"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
var core_1 = require('@angular/core');
exports.platformRef = platform_browser_dynamic_1.platformBrowserDynamic();
core_1.enableProdMode();
function main() {
    return exports.platformRef.bootstrapModule(app_module_1.AppModule);
}
exports.main = main;
// support async tag or hmr
switch (document.readyState) {
    case 'interactive':
    case 'complete':
        main();
        break;
    case 'loading':
    default:
        document.addEventListener('DOMContentLoaded', function () { return main(); });
}
//# sourceMappingURL=main.browser.js.map
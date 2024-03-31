/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SVG_ICON: () => (/* binding */ SVG_ICON)\n/* harmony export */ });\nconst SVG_ICON = `<svg fill=\"#000000\" viewBox=\"0 0 35 35\" data-name=\"Layer 2\" id=\"bfab7229-f4bd-4fb9-b4e2-5cc957a1c57b\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><path d=\"M30.559,33.936H4.441A4.2,4.2,0,0,1,.25,29.744V12.059A4.2,4.2,0,0,1,4.441,7.867H30.559a4.2,4.2,0,0,1,4.191,4.192V29.744A4.2,4.2,0,0,1,30.559,33.936ZM4.441,10.367A1.694,1.694,0,0,0,2.75,12.059V29.744a1.694,1.694,0,0,0,1.691,1.692H30.559a1.694,1.694,0,0,0,1.691-1.692V12.059a1.694,1.694,0,0,0-1.691-1.692Z\"></path><path d=\"M23.323,27.829H11.677a1.25,1.25,0,0,1,0-2.5H23.323a1.25,1.25,0,0,1,0,2.5Z\"></path><path d=\"M9.966,16.564a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M14.989,16.474a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M20.011,16.474a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M25.034,16.474a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M7.455,22.047a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M12.477,21.957a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M17.5,21.957a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M22.523,21.957a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M27.545,21.957a1.251,1.251,0,0,0,0-2.5,1.251,1.251,0,0,0,0,2.5Z\"></path><path d=\"M18.533,8.487a1.852,1.852,0,0,1,.847-2.478,5.376,5.376,0,0,1,3.935-.181,8.62,8.62,0,0,0,4.848.151,3.838,3.838,0,0,0,2.663-3.665c-.085-1.6-2.585-1.61-2.5,0,.075,1.408-1.734,1.551-2.763,1.426-1.668-.2-3.233-.84-4.943-.655a5.432,5.432,0,0,0-4.1,2.284,4.163,4.163,0,0,0-.146,4.38c.837,1.371,3,.116,2.159-1.262Z\"></path></g></svg>`;\r\n\n\n//# sourceURL=webpack://lss-hotkeys/./src/const.js?");

/***/ }),

/***/ "./src/editBtn.js":
/*!************************!*\
  !*** ./src/editBtn.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   placeEditButton: () => (/* binding */ placeEditButton)\n/* harmony export */ });\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ \"./src/const.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ \"./src/modal.js\");\n\r\n\r\n\r\nfunction placeEditButton() {\r\n    const aaoButtons = document.querySelectorAll('.aao_btn_group');\r\n\r\n    aaoButtons.forEach(group => {\r\n        const editButton = group.querySelector('a[href$=\"/edit\"]');\r\n        if (editButton) {\r\n            const aaoId = editButton.href.split('/').pop();\r\n            const name = editButton.textContent.trim();\r\n            const configButton = addHotkeyConfigButton(group, aaoId, name, editButton.style.cssText);\r\n            editButton.after(configButton);\r\n        }\r\n    });\r\n}\r\n\r\nfunction addHotkeyConfigButton(group, aaoId, name, style) {\r\n    // Erstelle den Button\r\n    const configButton = document.createElement('button');\r\n\r\n    configButton.innerHTML = _const__WEBPACK_IMPORTED_MODULE_0__.SVG_ICON;\r\n    const svgElement = configButton.firstChild;\r\n    svgElement.style.width = '10px';\r\n    svgElement.style.height = '10px';\r\n    svgElement.style.fill = 'currentColor';\r\n\r\n\r\n    //configButton.textContent = '⚙️'; // Emoji für das Zahnrad-Symbol\r\n    configButton.classList.add('btn', 'btn-xs', 'btn-default');\r\n    configButton.style.cssText = style\r\n\r\n\r\n    // Füge das Event hinzu, um das Modal zu öffnen\r\n    configButton.addEventListener('click', () => (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openHotkeyModal)(aaoId, name));\r\n\r\n    return configButton;\r\n}\n\n//# sourceURL=webpack://lss-hotkeys/./src/editBtn.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _urlCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urlCheck */ \"./src/urlCheck.js\");\n/* harmony import */ var _editBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editBtn */ \"./src/editBtn.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ \"./src/modal.js\");\n\r\n\r\n\r\n\r\n\r\nwindow.addEventListener('load', () => {\r\n    if ((0,_urlCheck__WEBPACK_IMPORTED_MODULE_0__.isAaoPage)()) {\r\n        // Code für die AAO-Seite\r\n        console.log('Auf der AAO-Seite');\r\n        (0,_editBtn__WEBPACK_IMPORTED_MODULE_1__.placeEditButton)();\r\n        (0,_modal__WEBPACK_IMPORTED_MODULE_2__.createModal)();\r\n    } else if ((0,_urlCheck__WEBPACK_IMPORTED_MODULE_0__.isMissionsPage)()) {\r\n        // Code für die Missions-Seite\r\n        console.log('Auf einer Missions-Seite');\r\n    }\r\n\r\n});\n\n//# sourceURL=webpack://lss-hotkeys/./src/index.js?");

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createModal: () => (/* binding */ createModal),\n/* harmony export */   openHotkeyModal: () => (/* binding */ openHotkeyModal)\n/* harmony export */ });\n// Erstelle edit Modal\r\nfunction createModal() {\r\n  // Modal Container\r\n  const modalContainer = document.createElement(\"div\");\r\n  modalContainer.className = \"modal fade\";\r\n  modalContainer.id = \"hotkeyModal\";\r\n  modalContainer.tabIndex = -1;\r\n  modalContainer.role = \"dialog\";\r\n  modalContainer.innerHTML = `\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n                <h4 class=\"modal-title\" id=\"hotkeyModalLabel\">Hotkey setzen</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <input type=\"text\" class=\"form-control\" id=\"hotkeyInput\" placeholder=\"Hotkey eingeben (z.B. Ctrl+Alt+S)\">\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"closeHotkeyModal\">Schließen</button>\r\n                <button type=\"button\" class=\"btn btn-primary\" id=\"saveHotkeyButton\">Speichern</button>\r\n            </div>\r\n        </div>\r\n    </div>`;\r\n\r\n  // Event-Handler für Schließen-Button\r\n  modalContainer.querySelector(\".close\").addEventListener(\"click\", function () {\r\n    modalContainer.classList.remove(\"in\");\r\n    modalContainer.style.display = \"none\";\r\n  });\r\n\r\n  // Event-Handler für Speichern-Button\r\n  modalContainer\r\n    .querySelector(\"#saveHotkeyButton\")\r\n    .addEventListener(\"click\", function () {\r\n      const hotkey = document.getElementById(\"hotkeyInput\").value;\r\n      const aaoId = modalContainer.getAttribute(\"data-aao-id\");\r\n      saveHotkey(aaoId, hotkey);\r\n      modalContainer.classList.remove(\"in\");\r\n      modalContainer.style.display = \"none\";\r\n    });\r\n\r\n  modalContainer\r\n    .querySelector(\"#closeHotkeyModal\")\r\n    .addEventListener(\"click\", function () {\r\n      modalContainer.classList.remove(\"in\");\r\n      modalContainer.style.display = \"none\";\r\n    });\r\n\r\n  document.body.appendChild(modalContainer);\r\n}\r\n\r\nfunction openHotkeyModal(aaoId, name) {\r\n    const modal = document.getElementById('hotkeyModal');\r\n    const label = modal.querySelector('.modal-title');\r\n    label.textContent = `Hotkey für ${name} setzen`;\r\n\r\n    // Setze AAO-ID als Datenattribut für späteren Gebrauch\r\n    modal.setAttribute('data-aao-id', aaoId);\r\n    modal.style.display = 'block';\r\n    modal.classList.add('in');\r\n}\n\n//# sourceURL=webpack://lss-hotkeys/./src/modal.js?");

/***/ }),

/***/ "./src/urlCheck.js":
/*!*************************!*\
  !*** ./src/urlCheck.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isAaoPage: () => (/* binding */ isAaoPage),\n/* harmony export */   isMissionsPage: () => (/* binding */ isMissionsPage)\n/* harmony export */ });\nfunction isAaoPage() {\r\n    return window.location.href.includes('/aaos');\r\n}\r\n\r\nfunction isMissionsPage() {\r\n    const currentUrl = new URL(window.location.href);\r\n    return currentUrl.pathname.startsWith('/missions');\r\n}\r\n\n\n//# sourceURL=webpack://lss-hotkeys/./src/urlCheck.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
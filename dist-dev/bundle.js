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

/***/ "./node_modules/hotkeys-js/dist/hotkeys.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/hotkeys-js/dist/hotkeys.esm.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hotkeys)\n/* harmony export */ });\n/**! \n * hotkeys-js v3.13.7 \n * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies. \n * \n * Copyright (c) 2024 kenny wong <wowohoo@qq.com> \n * https://github.com/jaywcjlove/hotkeys-js.git \n * \n * @website: https://jaywcjlove.github.io/hotkeys-js\n \n * Licensed under the MIT license \n */\n\nconst isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false;\n\n// 绑定事件\nfunction addEvent(object, event, method, useCapture) {\n  if (object.addEventListener) {\n    object.addEventListener(event, method, useCapture);\n  } else if (object.attachEvent) {\n    object.attachEvent(\"on\".concat(event), method);\n  }\n}\nfunction removeEvent(object, event, method, useCapture) {\n  if (object.removeEventListener) {\n    object.removeEventListener(event, method, useCapture);\n  } else if (object.detachEvent) {\n    object.detachEvent(\"on\".concat(event), method);\n  }\n}\n\n// 修饰键转换成对应的键码\nfunction getMods(modifier, key) {\n  const mods = key.slice(0, key.length - 1);\n  for (let i = 0; i < mods.length; i++) mods[i] = modifier[mods[i].toLowerCase()];\n  return mods;\n}\n\n// 处理传的key字符串转换成数组\nfunction getKeys(key) {\n  if (typeof key !== 'string') key = '';\n  key = key.replace(/\\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等\n  const keys = key.split(','); // 同时设置多个快捷键，以','分割\n  let index = keys.lastIndexOf('');\n\n  // 快捷键可能包含','，需特殊处理\n  for (; index >= 0;) {\n    keys[index - 1] += ',';\n    keys.splice(index, 1);\n    index = keys.lastIndexOf('');\n  }\n  return keys;\n}\n\n// 比较修饰键的数组\nfunction compareArray(a1, a2) {\n  const arr1 = a1.length >= a2.length ? a1 : a2;\n  const arr2 = a1.length >= a2.length ? a2 : a1;\n  let isIndex = true;\n  for (let i = 0; i < arr1.length; i++) {\n    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;\n  }\n  return isIndex;\n}\n\n// Special Keys\nconst _keyMap = {\n  backspace: 8,\n  '⌫': 8,\n  tab: 9,\n  clear: 12,\n  enter: 13,\n  '↩': 13,\n  return: 13,\n  esc: 27,\n  escape: 27,\n  space: 32,\n  left: 37,\n  up: 38,\n  right: 39,\n  down: 40,\n  del: 46,\n  delete: 46,\n  ins: 45,\n  insert: 45,\n  home: 36,\n  end: 35,\n  pageup: 33,\n  pagedown: 34,\n  capslock: 20,\n  num_0: 96,\n  num_1: 97,\n  num_2: 98,\n  num_3: 99,\n  num_4: 100,\n  num_5: 101,\n  num_6: 102,\n  num_7: 103,\n  num_8: 104,\n  num_9: 105,\n  num_multiply: 106,\n  num_add: 107,\n  num_enter: 108,\n  num_subtract: 109,\n  num_decimal: 110,\n  num_divide: 111,\n  '⇪': 20,\n  ',': 188,\n  '.': 190,\n  '/': 191,\n  '`': 192,\n  '-': isff ? 173 : 189,\n  '=': isff ? 61 : 187,\n  ';': isff ? 59 : 186,\n  '\\'': 222,\n  '[': 219,\n  ']': 221,\n  '\\\\': 220\n};\n\n// Modifier Keys\nconst _modifier = {\n  // shiftKey\n  '⇧': 16,\n  shift: 16,\n  // altKey\n  '⌥': 18,\n  alt: 18,\n  option: 18,\n  // ctrlKey\n  '⌃': 17,\n  ctrl: 17,\n  control: 17,\n  // metaKey\n  '⌘': 91,\n  cmd: 91,\n  command: 91\n};\nconst modifierMap = {\n  16: 'shiftKey',\n  18: 'altKey',\n  17: 'ctrlKey',\n  91: 'metaKey',\n  shiftKey: 16,\n  ctrlKey: 17,\n  altKey: 18,\n  metaKey: 91\n};\nconst _mods = {\n  16: false,\n  18: false,\n  17: false,\n  91: false\n};\nconst _handlers = {};\n\n// F1~F12 special key\nfor (let k = 1; k < 20; k++) {\n  _keyMap[\"f\".concat(k)] = 111 + k;\n}\n\nlet _downKeys = []; // 记录摁下的绑定键\nlet winListendFocus = null; // window是否已经监听了focus事件\nlet _scope = 'all'; // 默认热键范围\nconst elementEventMap = new Map(); // 已绑定事件的节点记录\n\n// 返回键码\nconst code = x => _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);\nconst getKey = x => Object.keys(_keyMap).find(k => _keyMap[k] === x);\nconst getModifier = x => Object.keys(_modifier).find(k => _modifier[k] === x);\n\n// 设置获取当前范围（默认为'所有'）\nfunction setScope(scope) {\n  _scope = scope || 'all';\n}\n// 获取当前范围\nfunction getScope() {\n  return _scope || 'all';\n}\n// 获取摁下绑定键的键值\nfunction getPressedKeyCodes() {\n  return _downKeys.slice(0);\n}\nfunction getPressedKeyString() {\n  return _downKeys.map(c => getKey(c) || getModifier(c) || String.fromCharCode(c));\n}\nfunction getAllKeyCodes() {\n  const result = [];\n  Object.keys(_handlers).forEach(k => {\n    _handlers[k].forEach(_ref => {\n      let {\n        key,\n        scope,\n        mods,\n        shortcut\n      } = _ref;\n      result.push({\n        scope,\n        shortcut,\n        mods,\n        keys: key.split('+').map(v => code(v))\n      });\n    });\n  });\n  return result;\n}\n\n// 表单控件控件判断 返回 Boolean\n// hotkey is effective only when filter return true\nfunction filter(event) {\n  const target = event.target || event.srcElement;\n  const {\n    tagName\n  } = target;\n  let flag = true;\n  const isInput = tagName === 'INPUT' && !['checkbox', 'radio', 'range', 'button', 'file', 'reset', 'submit', 'color'].includes(target.type);\n  // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>\n  if (target.isContentEditable || (isInput || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {\n    flag = false;\n  }\n  return flag;\n}\n\n// 判断摁下的键是否为某个键，返回true或者false\nfunction isPressed(keyCode) {\n  if (typeof keyCode === 'string') {\n    keyCode = code(keyCode); // 转换成键码\n  }\n  return _downKeys.indexOf(keyCode) !== -1;\n}\n\n// 循环删除handlers中的所有 scope(范围)\nfunction deleteScope(scope, newScope) {\n  let handlers;\n  let i;\n\n  // 没有指定scope，获取scope\n  if (!scope) scope = getScope();\n  for (const key in _handlers) {\n    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {\n      handlers = _handlers[key];\n      for (i = 0; i < handlers.length;) {\n        if (handlers[i].scope === scope) {\n          const deleteItems = handlers.splice(i, 1);\n          deleteItems.forEach(_ref2 => {\n            let {\n              element\n            } = _ref2;\n            return removeKeyEvent(element);\n          });\n        } else {\n          i++;\n        }\n      }\n    }\n  }\n\n  // 如果scope被删除，将scope重置为all\n  if (getScope() === scope) setScope(newScope || 'all');\n}\n\n// 清除修饰键\nfunction clearModifier(event) {\n  let key = event.keyCode || event.which || event.charCode;\n  const i = _downKeys.indexOf(key);\n\n  // 从列表中清除按压过的键\n  if (i >= 0) {\n    _downKeys.splice(i, 1);\n  }\n  // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题\n  if (event.key && event.key.toLowerCase() === 'meta') {\n    _downKeys.splice(0, _downKeys.length);\n  }\n\n  // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除\n  if (key === 93 || key === 224) key = 91;\n  if (key in _mods) {\n    _mods[key] = false;\n\n    // 将修饰键重置为false\n    for (const k in _modifier) if (_modifier[k] === key) hotkeys[k] = false;\n  }\n}\nfunction unbind(keysInfo) {\n  // unbind(), unbind all keys\n  if (typeof keysInfo === 'undefined') {\n    Object.keys(_handlers).forEach(key => {\n      Array.isArray(_handlers[key]) && _handlers[key].forEach(info => eachUnbind(info));\n      delete _handlers[key];\n    });\n    removeKeyEvent(null);\n  } else if (Array.isArray(keysInfo)) {\n    // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])\n    keysInfo.forEach(info => {\n      if (info.key) eachUnbind(info);\n    });\n  } else if (typeof keysInfo === 'object') {\n    // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})\n    if (keysInfo.key) eachUnbind(keysInfo);\n  } else if (typeof keysInfo === 'string') {\n    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n    // support old method\n    // eslint-disable-line\n    let [scope, method] = args;\n    if (typeof scope === 'function') {\n      method = scope;\n      scope = '';\n    }\n    eachUnbind({\n      key: keysInfo,\n      scope,\n      method,\n      splitKey: '+'\n    });\n  }\n}\n\n// 解除绑定某个范围的快捷键\nconst eachUnbind = _ref3 => {\n  let {\n    key,\n    scope,\n    method,\n    splitKey = '+'\n  } = _ref3;\n  const multipleKeys = getKeys(key);\n  multipleKeys.forEach(originKey => {\n    const unbindKeys = originKey.split(splitKey);\n    const len = unbindKeys.length;\n    const lastKey = unbindKeys[len - 1];\n    const keyCode = lastKey === '*' ? '*' : code(lastKey);\n    if (!_handlers[keyCode]) return;\n    // 判断是否传入范围，没有就获取范围\n    if (!scope) scope = getScope();\n    const mods = len > 1 ? getMods(_modifier, unbindKeys) : [];\n    const unbindElements = [];\n    _handlers[keyCode] = _handlers[keyCode].filter(record => {\n      // 通过函数判断，是否解除绑定，函数相等直接返回\n      const isMatchingMethod = method ? record.method === method : true;\n      const isUnbind = isMatchingMethod && record.scope === scope && compareArray(record.mods, mods);\n      if (isUnbind) unbindElements.push(record.element);\n      return !isUnbind;\n    });\n    unbindElements.forEach(element => removeKeyEvent(element));\n  });\n};\n\n// 对监听对应快捷键的回调函数进行处理\nfunction eventHandler(event, handler, scope, element) {\n  if (handler.element !== element) {\n    return;\n  }\n  let modifiersMatch;\n\n  // 看它是否在当前范围\n  if (handler.scope === scope || handler.scope === 'all') {\n    // 检查是否匹配修饰符（如果有返回true）\n    modifiersMatch = handler.mods.length > 0;\n    for (const y in _mods) {\n      if (Object.prototype.hasOwnProperty.call(_mods, y)) {\n        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {\n          modifiersMatch = false;\n        }\n      }\n    }\n\n    // 调用处理程序，如果是修饰键不做处理\n    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {\n      handler.keys = [];\n      handler.keys = handler.keys.concat(_downKeys);\n      if (handler.method(event, handler) === false) {\n        if (event.preventDefault) event.preventDefault();else event.returnValue = false;\n        if (event.stopPropagation) event.stopPropagation();\n        if (event.cancelBubble) event.cancelBubble = true;\n      }\n    }\n  }\n}\n\n// 处理keydown事件\nfunction dispatch(event, element) {\n  const asterisk = _handlers['*'];\n  let key = event.keyCode || event.which || event.charCode;\n\n  // 表单控件过滤 默认表单控件不触发快捷键\n  if (!hotkeys.filter.call(this, event)) return;\n\n  // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致\n  // Webkit左右 command 键值不一样\n  if (key === 93 || key === 224) key = 91;\n\n  /**\n   * Collect bound keys\n   * If an Input Method Editor is processing key input and the event is keydown, return 229.\n   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229\n   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html\n   */\n  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);\n  /**\n   * Jest test cases are required.\n   * ===============================\n   */\n  ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(keyName => {\n    const keyNum = modifierMap[keyName];\n    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {\n      _downKeys.push(keyNum);\n    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {\n      _downKeys.splice(_downKeys.indexOf(keyNum), 1);\n    } else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) {\n      /**\n       * Fix if Command is pressed:\n       * ===============================\n       */\n      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {\n        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));\n      }\n    }\n  });\n  /**\n   * -------------------------------\n   */\n\n  if (key in _mods) {\n    _mods[key] = true;\n\n    // 将特殊字符的key注册到 hotkeys 上\n    for (const k in _modifier) {\n      if (_modifier[k] === key) hotkeys[k] = true;\n    }\n    if (!asterisk) return;\n  }\n\n  // 将 modifierMap 里面的修饰键绑定到 event 中\n  for (const e in _mods) {\n    if (Object.prototype.hasOwnProperty.call(_mods, e)) {\n      _mods[e] = event[modifierMap[e]];\n    }\n  }\n  /**\n   * https://github.com/jaywcjlove/hotkeys/pull/129\n   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.\n   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.\n   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate\n   */\n  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {\n    if (_downKeys.indexOf(17) === -1) {\n      _downKeys.push(17);\n    }\n    if (_downKeys.indexOf(18) === -1) {\n      _downKeys.push(18);\n    }\n    _mods[17] = true;\n    _mods[18] = true;\n  }\n\n  // 获取范围 默认为 `all`\n  const scope = getScope();\n  // 对任何快捷键都需要做的处理\n  if (asterisk) {\n    for (let i = 0; i < asterisk.length; i++) {\n      if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {\n        eventHandler(event, asterisk[i], scope, element);\n      }\n    }\n  }\n  // key 不在 _handlers 中返回\n  if (!(key in _handlers)) return;\n  const handlerKey = _handlers[key];\n  const keyLen = handlerKey.length;\n  for (let i = 0; i < keyLen; i++) {\n    if (event.type === 'keydown' && handlerKey[i].keydown || event.type === 'keyup' && handlerKey[i].keyup) {\n      if (handlerKey[i].key) {\n        const record = handlerKey[i];\n        const {\n          splitKey\n        } = record;\n        const keyShortcut = record.key.split(splitKey);\n        const _downKeysCurrent = []; // 记录当前按键键值\n        for (let a = 0; a < keyShortcut.length; a++) {\n          _downKeysCurrent.push(code(keyShortcut[a]));\n        }\n        if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {\n          // 找到处理内容\n          eventHandler(event, record, scope, element);\n        }\n      }\n    }\n  }\n}\nfunction hotkeys(key, option, method) {\n  _downKeys = [];\n  const keys = getKeys(key); // 需要处理的快捷键列表\n  let mods = [];\n  let scope = 'all'; // scope默认为all，所有范围都有效\n  let element = document; // 快捷键事件绑定节点\n  let i = 0;\n  let keyup = false;\n  let keydown = true;\n  let splitKey = '+';\n  let capture = false;\n  let single = false; // 单个callback\n\n  // 对为设定范围的判断\n  if (method === undefined && typeof option === 'function') {\n    method = option;\n  }\n  if (Object.prototype.toString.call(option) === '[object Object]') {\n    if (option.scope) scope = option.scope; // eslint-disable-line\n    if (option.element) element = option.element; // eslint-disable-line\n    if (option.keyup) keyup = option.keyup; // eslint-disable-line\n    if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line\n    if (option.capture !== undefined) capture = option.capture; // eslint-disable-line\n    if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line\n    if (option.single === true) single = true; // eslint-disable-line\n  }\n  if (typeof option === 'string') scope = option;\n\n  // 如果只允许单个callback，先unbind\n  if (single) unbind(key, scope);\n\n  // 对于每个快捷键进行处理\n  for (; i < keys.length; i++) {\n    key = keys[i].split(splitKey); // 按键列表\n    mods = [];\n\n    // 如果是组合快捷键取得组合快捷键\n    if (key.length > 1) mods = getMods(_modifier, key);\n\n    // 将非修饰键转化为键码\n    key = key[key.length - 1];\n    key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键\n\n    // 判断key是否在_handlers中，不在就赋一个空数组\n    if (!(key in _handlers)) _handlers[key] = [];\n    _handlers[key].push({\n      keyup,\n      keydown,\n      scope,\n      mods,\n      shortcut: keys[i],\n      method,\n      key: keys[i],\n      splitKey,\n      element\n    });\n  }\n  // 在全局document上设置快捷键\n  if (typeof element !== 'undefined' && window) {\n    if (!elementEventMap.has(element)) {\n      const keydownListener = function () {\n        let event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;\n        return dispatch(event, element);\n      };\n      const keyupListenr = function () {\n        let event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;\n        dispatch(event, element);\n        clearModifier(event);\n      };\n      elementEventMap.set(element, {\n        keydownListener,\n        keyupListenr,\n        capture\n      });\n      addEvent(element, 'keydown', keydownListener, capture);\n      addEvent(element, 'keyup', keyupListenr, capture);\n    }\n    if (!winListendFocus) {\n      const listener = () => {\n        _downKeys = [];\n      };\n      winListendFocus = {\n        listener,\n        capture\n      };\n      addEvent(window, 'focus', listener, capture);\n    }\n  }\n}\nfunction trigger(shortcut) {\n  let scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';\n  Object.keys(_handlers).forEach(key => {\n    const dataList = _handlers[key].filter(item => item.scope === scope && item.shortcut === shortcut);\n    dataList.forEach(data => {\n      if (data && data.method) {\n        data.method();\n      }\n    });\n  });\n}\n\n// 销毁事件,unbind之后判断element上是否还有键盘快捷键，如果没有移除监听\nfunction removeKeyEvent(element) {\n  const values = Object.values(_handlers).flat();\n  const findindex = values.findIndex(_ref4 => {\n    let {\n      element: el\n    } = _ref4;\n    return el === element;\n  });\n  if (findindex < 0) {\n    const {\n      keydownListener,\n      keyupListenr,\n      capture\n    } = elementEventMap.get(element) || {};\n    if (keydownListener && keyupListenr) {\n      removeEvent(element, 'keyup', keyupListenr, capture);\n      removeEvent(element, 'keydown', keydownListener, capture);\n      elementEventMap.delete(element);\n    }\n  }\n  if (values.length <= 0 || elementEventMap.size <= 0) {\n    // 移除所有的元素上的监听\n    const eventKeys = Object.keys(elementEventMap);\n    eventKeys.forEach(el => {\n      const {\n        keydownListener,\n        keyupListenr,\n        capture\n      } = elementEventMap.get(el) || {};\n      if (keydownListener && keyupListenr) {\n        removeEvent(el, 'keyup', keyupListenr, capture);\n        removeEvent(el, 'keydown', keydownListener, capture);\n        elementEventMap.delete(el);\n      }\n    });\n    // 清空 elementEventMap\n    elementEventMap.clear();\n    // 清空 _handlers\n    Object.keys(_handlers).forEach(key => delete _handlers[key]);\n    // 移除window上的focus监听\n    if (winListendFocus) {\n      const {\n        listener,\n        capture\n      } = winListendFocus;\n      removeEvent(window, 'focus', listener, capture);\n      winListendFocus = null;\n    }\n  }\n}\nconst _api = {\n  getPressedKeyString,\n  setScope,\n  getScope,\n  deleteScope,\n  getPressedKeyCodes,\n  getAllKeyCodes,\n  isPressed,\n  filter,\n  trigger,\n  unbind,\n  keyMap: _keyMap,\n  modifier: _modifier,\n  modifierMap\n};\nfor (const a in _api) {\n  if (Object.prototype.hasOwnProperty.call(_api, a)) {\n    hotkeys[a] = _api[a];\n  }\n}\nif (typeof window !== 'undefined') {\n  const _hotkeys = window.hotkeys;\n  hotkeys.noConflict = deep => {\n    if (deep && window.hotkeys === hotkeys) {\n      window.hotkeys = _hotkeys;\n    }\n    return hotkeys;\n  };\n  window.hotkeys = hotkeys;\n}\n\n\n\n\n//# sourceURL=webpack://lss-hotkeys/./node_modules/hotkeys-js/dist/hotkeys.esm.js?");

/***/ }),

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createModal: () => (/* binding */ createModal),\n/* harmony export */   openHotkeyModal: () => (/* binding */ openHotkeyModal)\n/* harmony export */ });\n/* harmony import */ var hotkeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hotkeys-js */ \"./node_modules/hotkeys-js/dist/hotkeys.esm.js\");\n\r\n\r\n// Erstelle edit Modal\r\nfunction createModal() {\r\n  // Modal Container\r\n  const modalContainer = document.createElement(\"div\");\r\n  modalContainer.className = \"modal fade\";\r\n  modalContainer.id = \"hotkeyModal\";\r\n  modalContainer.tabIndex = -1;\r\n  modalContainer.role = \"dialog\";\r\n  modalContainer.innerHTML = `\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n                <h4 class=\"modal-title\" id=\"hotkeyModalLabel\">Hotkey setzen</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <input type=\"text\" class=\"form-control\" id=\"hotkeyInput\" placeholder=\"Hotkey eingeben (z.B. Ctrl+Alt+S)\">\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"closeHotkeyModal\">Schließen</button>\r\n                <button type=\"button\" class=\"btn btn-primary\" id=\"saveHotkeyButton\">Speichern</button>\r\n            </div>\r\n        </div>\r\n    </div>`;\r\n\r\n  // Event-Handler für Schließen-Button\r\n  modalContainer.querySelector(\".close\").addEventListener(\"click\", function () {\r\n    modalContainer.classList.remove(\"in\");\r\n    modalContainer.style.display = \"none\";\r\n  });\r\n\r\n  // Event-Handler für Speichern-Button\r\n  modalContainer\r\n    .querySelector(\"#saveHotkeyButton\")\r\n    .addEventListener(\"click\", function () {\r\n      const hotkey = document.getElementById(\"hotkeyInput\").value;\r\n      const aaoId = modalContainer.getAttribute(\"data-aao-id\");\r\n      saveHotkey(aaoId, hotkey);\r\n      modalContainer.classList.remove(\"in\");\r\n      modalContainer.style.display = \"none\";\r\n    });\r\n\r\n  modalContainer\r\n    .querySelector(\"#closeHotkeyModal\")\r\n    .addEventListener(\"click\", function () {\r\n      modalContainer.classList.remove(\"in\");\r\n      modalContainer.style.display = \"none\";\r\n    });\r\n\r\n  document.body.appendChild(modalContainer);\r\n}\r\n\r\nfunction openHotkeyModal(aaoId, name) {\r\n  const modal = document.getElementById(\"hotkeyModal\");\r\n  const label = modal.querySelector(\".modal-title\");\r\n  label.textContent = `Hotkey für ${name} setzen`;\r\n\r\n  (0,hotkeys_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('*', function(event, handler){\r\n    if(event.target === \"input\"){\r\n      if(handler.key === 'ctrl+alt+s') {\r\n        event.preventDefault();\r\n      }\r\n      console.log('handler', handler);\r\n      console.log('event', event);\r\n    }\r\n  });\r\n\r\n  document.getElementById('hotkeyInput')\r\n  .addEventListener('keydown', function(event) {\r\n\r\n    // Verhindere die Standardaktion, um z.B. das Auslösen von Shortcuts zu stoppen\r\n    event.preventDefault();\r\n\r\n    // Konvertiere das Event in eine String-Repräsentation der Tastenkombination\r\n    const hotkey = [\r\n      event.ctrlKey ? 'Ctrl' : '',\r\n      event.shiftKey ? 'Shift' : '',\r\n      event.altKey ? 'Alt' : '',\r\n      event.key.length === 1 ? event.key.toUpperCase() : event.key\r\n    ].filter(Boolean).join('+');\r\n\r\n    // Setze den Text des Input-Feldes auf die Tastenkombination\r\n    this.value = hotkey;\r\n  });\r\n\r\n  // Setze AAO-ID als Datenattribut für späteren Gebrauch\r\n  modal.setAttribute(\"data-aao-id\", aaoId);\r\n  modal.style.display = \"block\";\r\n  modal.classList.add(\"in\");\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://lss-hotkeys/./src/modal.js?");

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
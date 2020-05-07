/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "1588686833893/js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/web/client/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ \"./node_modules/@vue/composition-api/dist/vue-composition-api.module.js\");\n\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n\n/*\nВарианты домена для local shop online\nlocal shop online\nlocalonshop\nloconshop.com\noutofturn\n\nlocalstoreorder.com\n\nlocstoreonline.com\n\nlocstoreline.com\nshopline.com\n\n\nlocalshopline.com\nОбработка интернет заказов (с 11 до 13)\n\n\nshopnoturn.com ??\nskipshopline.com ??\n\n\n\n\nДополнительно дать возможность магазинам определять способ обработки заказов.\nОдин раз в день или в течении дня\n\nДобавить подписчиков и подписки.\nСоц. сеть для магазинов \n*/\n\n/*\n  Концепция открытой закладки - это возможность создавать свои закладки которые доступны публичному пространству. Это поможет Вам структурировать личные полезные и интересные закладки, а таеже поделится ими сделав эту закладку полезной еще кому-то.\n\n  Предоставляешь качественные услуги?\n  Мы поможем найти клиентов\n\n  Есть бизнес\n\n\n  Вам нужны клиенты?\n  \n\n  Укажите Вашу нишу, а мы \n\n  Нужны клиенты?\n  Мы находим клиентов\n\n\n  Ищите клиентов?\n  Мы решим эту задачу\n\n  amauthor.com\n\n\n*/\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App',\n  data: function data() {\n    return {// header: 'HeaderGuest'\n      // layout: 'GuestLayout',\n      // isAuth: false\n    };\n  },\n  components: {\n    HeaderGuest: function HeaderGuest() {\n      return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ./components/Headers/HeaderGuest */ \"./src/components/Headers/HeaderGuest.vue\"));\n    },\n    HeaderUser: function HeaderUser() {\n      return __webpack_require__.e(/*! import() */ 13).then(__webpack_require__.bind(null, /*! ./components/Headers/HeaderUser */ \"./src/components/Headers/HeaderUser.vue\"));\n    },\n    LayoutEmpty: function LayoutEmpty() {\n      return __webpack_require__.e(/*! import() */ 14).then(__webpack_require__.bind(null, /*! ./layouts/LayoutEmpty */ \"./src/layouts/LayoutEmpty.vue\"));\n    },\n    LayoutUser: function LayoutUser() {\n      return __webpack_require__.e(/*! import() */ 16).then(__webpack_require__.bind(null, /*! ./layouts/LayoutUser */ \"./src/layouts/LayoutUser.vue\"));\n    },\n    LayoutMain: function LayoutMain() {\n      return __webpack_require__.e(/*! import() */ 15).then(__webpack_require__.bind(null, /*! ./layouts/LayoutMain */ \"./src/layouts/LayoutMain.vue\"));\n    },\n    Message: function Message() {\n      return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ./components/App/Message */ \"./src/components/App/Message.vue\"));\n    } // LayoutAuth: () => import('./layouts/LayoutAuth')\n\n  },\n  computed: {\n    header: function header() {\n      if (this.$store.getters.auth) {\n        return 'HeaderUser';\n      } else {\n        return 'HeaderGuest';\n      }\n    },\n    message: function message() {\n      // const msg = this.$route.query.msg\n      // // const msgs = {\n      // //   'welcome': {title:'Добро пожаловать!', text: 'Вы тут впервые? Ознакомьтесь с инструкцией', theme: 'base'},\n      // //   'signin-first': {title:'Авторизуйтесь!', text: 'Что бы попать на эту страницу нужно быть авторизованым', theme: 'error'}\n      // // }\n      // if(msg in messages) {\n      //   this.$store.commit('msg', messages[msg])\n      //   // return messages[msg]\n      // }\n      // console.log(this.$store.getters.msg)\n      return this.$store.getters.msg; // return false\n    } // layout() {\n    //   let layout = this.$route.meta.layout || 'Main';\n    //   // console.log(layout)\n    //   return 'Layout' + layout[0].toUpperCase() + layout.substr(1);\n    // }\n\n  },\n  created: function created() {// setTimeout(() => {\n    // this.message = true\n    // }, 1000)\n    // this.message = true\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    return Object(_Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              // if(localStorage.getItem('cart'))\n              _this.$store.commit('setCartFromStorage'); // this.$store.commit('msg', \n              //   {\n              //     theme: 'white',\n              //     title:'Cookie',\n              //     text: 'Мы установили куки',\n              //     link_: {\n              //       to: '/test',\n              //       text: 'тут'\n              //     }\n              //   }\n              // )\n              // setTimeout(() => {\n              //   this.message = true\n              // }, 5000)\n              // const msg = this.$route.query.msg\n              // if(msg) {\n              //   this.$msg(msg)\n              // }\n              // localStorage.removeItem('isAuth')\n              // if(localStorage.getItem('isAuth')) {\n\n\n              _context.next = 3;\n              return _this.$store.dispatch('setUser');\n\n            case 3:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }))();\n  },\n  // mounted: {\n  //   // check user info\n  //   // if(!this.$store.getters.user) {\n  //     // get user info from db\n  //     // or get info from cookie\n  //   // }\n  //   // this.$req('HEAD', '/auth?check&info')\n  //   //   .then(response => {\n  //   //     this.$store.\n  //   //   })\n  //   //   .catch(error => {\n  //   //   })\n  // },\n  // watch: {\n  //   '$route.params'\n  // },\n  setup: function setup(props, vm) {\n    var visible = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__[\"ref\"])(true); // const headerState = reactive({\n    //   main: 1,\n    //   user: 2,\n    //   land: 4\n    // })\n    // const headerClassName = reactive({\n    //   '1': 'header-main',\n    //   '2': 'header-user',\n    //   '3': 'header-land'\n    // })\n    // const getHeaderClassName = () => {\n    //   Object.keys(headerState).forEach(function(stateKey) {\n    //     let state = headerState[stateKey];\n    //     if(Boolean(state & headerState[state]))\n    //   }, this)\n    // }\n\n    var toggle = function toggle(lang) {\n      vm.root.$options.store.commit('setLang', lang); // console.log(vm.root.$options.store.getters.lang)\n\n      visible.value = !visible.value;\n    };\n\n    return {\n      visible: visible,\n      toggle: toggle\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/App/Page.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'CPage'\n});\n\n//# sourceURL=webpack:///./src/components/App/Page.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"72bdbeea-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&lang=pug&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"72bdbeea-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90&lang=pug& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"transition-group\",\n    {\n      staticClass: \"app\",\n      attrs: { id: \"app\", name: \"fade\", mode: \"out-in\", tag: \"div\" }\n    },\n    [\n      _vm.message\n        ? _c(\"Message\", {\n            key: \"message\",\n            tag: \"component\",\n            attrs: { message: _vm.message, lifetime: \"30\" }\n          })\n        : _vm._e(),\n      _c(_vm.header, { key: \"header\", tag: \"component\" }),\n      _c(\"router-view\", { key: \"page\" })\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2272bdbeea-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"72bdbeea-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=template&id=f41678e6&lang=pug&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"72bdbeea-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/App/Page.vue?vue&type=template&id=f41678e6&lang=pug& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"main\", { staticClass: \"page\" }, [\n    _c(\"div\", { staticClass: \"page__wrap\" }, [_vm._t(\"default\")], 2)\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/App/Page.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2272bdbeea-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=sass&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=sass& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".logo {\\n  color: #fcfdfe;\\n  font-size: 1.1em;\\n  font-weight: 500;\\n  background: #0059b3;\\n  border-radius: 2px;\\n}\\n.logo__goto {\\n  font-size: inherit;\\n}\\n.logo__cart {\\n  width: 24px;\\n  margin: 0 -2px -10px -3px;\\n  fill: rgba(252, 253, 254, 0.5);\\n}\\n.logo__a {\\n  position: relative;\\n  top: -1px;\\n  display: inline-block;\\n  margin: 0 4px 0 -15px;\\n  padding: 0 1px 0 2px;\\n  font-size: inherit;\\n  font-weight: 100;\\n}\\n.logo__shop {\\n  font-size: inherit;\\n  font-weight: 500;\\n}\\n.form {\\n  -webkit-box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.25);\\n          box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.25);\\n}\\n.form__title {\\n  display: block;\\n  width: 100%;\\n  margin-bottom: 30px;\\n  padding: 20px;\\n  color: #002d5a;\\n  font-size: 1.5em;\\n  background: #f2f7fb;\\n}\\n.form__alert {\\n  position: relative;\\n  height: 30px;\\n  margin: -30px 20px 0;\\n  padding: 5px 10px;\\n  font-size: 0.9em;\\n}\\n.form__input {\\n  margin: 0 20px 20px;\\n  padding: 10px;\\n  border: 1px solid #fff;\\n  border-left: 1px solid #bfd6ec;\\n  outline: none;\\n  border-radius: 0;\\n  -webkit-transition: all ease 0.25s;\\n  transition: all ease 0.25s;\\n  -webkit-appearance: none;\\n}\\n.form__input:hover {\\n  border-left-color: #80acd9;\\n}\\n.form__input:focus {\\n  border-color: rgba(10, 103, 197, 0.75);\\n  border-color: #4083c6;\\n  -webkit-box-shadow: 1px 1px 3px -1px inset rgba(0, 9, 18, 0.25);\\n          box-shadow: 1px 1px 3px -1px inset rgba(0, 9, 18, 0.25);\\n}\\n.form__button {\\n  color: #fcfdfe;\\n  background: #0059b3;\\n}\\n.fade-enter-active, .fade-leave-active {\\n  -webkit-transition: opacity ease 0.5s;\\n  transition: opacity ease 0.5s;\\n}\\n.fade-enter, .fade-leave-to {\\n  opacity: 0;\\n}\\n.fade-leave-active {\\n  display: none;\\n  height: 0px;\\n}\\n.header__link.router-link-active {\\n  text-decoration: underline;\\n}\\n* {\\n  margin: 0;\\n  padding: 0;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n}\\nbody {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n}\\n#app {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n      -ms-flex-direction: column;\\n          flex-direction: column;\\n  -webkit-box-pack: center;\\n      -ms-flex-pack: center;\\n          justify-content: center;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  width: 100%;\\n  height: 100%;\\n  font-family: sans-serif;\\n  background: #fcfdfe;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=style&index=0&lang=sass&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/App/Page.vue?vue&type=style&index=0&lang=sass& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".page {\\n  width: 100%;\\n  padding: 0 10px;\\n}\\n.page__wrap {\\n  width: 100%;\\n  max-width: 1440px;\\n  margin: 0 auto;\\n  padding: 0 10px;\\n}\\n.page__pretitle {\\n  margin-top: 10px;\\n  color: #0059b3;\\n  text-transform: uppercase;\\n}\\n.page__title {\\n  width: 100%;\\n  margin: 10px auto 5px;\\n  color: #002d5a;\\n  font-size: 2.5em;\\n}\\n.page__subtitle {\\n  display: inline-block;\\n  width: 100%;\\n  margin-bottom: 40px;\\n  color: rgba(0, 27, 54, 0.75);\\n  font-size: 1.5em;\\n}\\n.page__button-link {\\n  display: block;\\n  width: 100%;\\n  max-width: 250px;\\n  margin: 80px auto;\\n  padding: 20px;\\n  color: #fcfdfe;\\n  text-align: center;\\n  text-decoration: none;\\n  background: #0059b3;\\n}\\n.page__button {\\n  padding: 10px;\\n  color: #fcfdfe;\\n  background: #0059b3;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/App/Page.vue?./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=sass&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=sass& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=sass& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=sass&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"bd5773fc\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=style&index=0&lang=sass&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/App/Page.vue?vue&type=style&index=0&lang=sass& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=style&index=0&lang=sass& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=style&index=0&lang=sass&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"1eb5dd51\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/App/Page.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90&lang=pug& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&lang=pug&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=sass& */ \"./src/App.vue?vue&type=style&index=0&lang=sass&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&lang=sass&":
/*!*******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=sass& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--9-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=sass& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=sass&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&lang=pug&":
/*!*************************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90&lang=pug& ***!
  \*************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_72bdbeea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"72bdbeea-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/pug-plain-loader!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90&lang=pug& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"72bdbeea-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&lang=pug&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_72bdbeea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_72bdbeea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/assets/messages/ru.js":
/*!***********************************!*\
  !*** ./src/assets/messages/ru.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  'welcome': {\n    theme: 'base',\n    title: 'Добро пожаловать!',\n    text: 'Вы тут впервые? Ознакомьтесь с инструкцией',\n    link_: {\n      to: '/test',\n      text: 'тут'\n    }\n  },\n  'signin-first': {\n    theme: 'error',\n    title: 'Авторизуйтесь!',\n    text: 'Что бы попать на эту страницу нужно быть авторизованым',\n    link_: {\n      to: '/auth',\n      text: 'Перейти'\n    }\n  },\n  'leave': {\n    theme: 'white',\n    title: 'До свидания!',\n    text: 'Ваша сессионая кука была удалена. Теперь Вы в роле гостя. Войзращайтесь в любой момент',\n    link_: {\n      to: '/auth',\n      text: 'Перейти'\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/assets/messages/ru.js?");

/***/ }),

/***/ "./src/components/App/Page.vue":
/*!*************************************!*\
  !*** ./src/components/App/Page.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Page_vue_vue_type_template_id_f41678e6_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page.vue?vue&type=template&id=f41678e6&lang=pug& */ \"./src/components/App/Page.vue?vue&type=template&id=f41678e6&lang=pug&\");\n/* harmony import */ var _Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.vue?vue&type=script&lang=js& */ \"./src/components/App/Page.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Page_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Page.vue?vue&type=style&index=0&lang=sass& */ \"./src/components/App/Page.vue?vue&type=style&index=0&lang=sass&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Page_vue_vue_type_template_id_f41678e6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Page_vue_vue_type_template_id_f41678e6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/App/Page.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/App/Page.vue?");

/***/ }),

/***/ "./src/components/App/Page.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/components/App/Page.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/App/Page.vue?");

/***/ }),

/***/ "./src/components/App/Page.vue?vue&type=style&index=0&lang=sass&":
/*!***********************************************************************!*\
  !*** ./src/components/App/Page.vue?vue&type=style&index=0&lang=sass& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=style&index=0&lang=sass& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=style&index=0&lang=sass&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/components/App/Page.vue?");

/***/ }),

/***/ "./src/components/App/Page.vue?vue&type=template&id=f41678e6&lang=pug&":
/*!*****************************************************************************!*\
  !*** ./src/components/App/Page.vue?vue&type=template&id=f41678e6&lang=pug& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_72bdbeea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_f41678e6_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"72bdbeea-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/pug-plain-loader!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=template&id=f41678e6&lang=pug& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"72bdbeea-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/App/Page.vue?vue&type=template&id=f41678e6&lang=pug&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_72bdbeea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_f41678e6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_72bdbeea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_f41678e6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/App/Page.vue?");

/***/ }),

/***/ "./src/lang sync recursive ^\\.\\/.*\\.json$":
/*!**************************************!*\
  !*** ./src/lang sync ^\.\/.*\.json$ ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./en.json\": \"./src/lang/en.json\",\n\t\"./ru.json\": \"./src/lang/ru.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/lang sync recursive ^\\\\.\\\\/.*\\\\.json$\";\n\n//# sourceURL=webpack:///./src/lang_sync_^\\.\\/.*\\.json$?");

/***/ }),

/***/ "./src/lang/en.json":
/*!**************************!*\
  !*** ./src/lang/en.json ***!
  \**************************/
/*! exports provided: title, test, new__title, new__subtitle, homeWindow__title2, homeWindow__title, homeWindow__linkText, df, header__signin, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"title\\\":\\\"EN!! test title\\\",\\\"test\\\":\\\"Менеджер проекта\\\",\\\"new__title\\\":\\\"Создание нового тура\\\",\\\"new__subtitle\\\":\\\"Для создания собственного тура, выберете дату начала и продолжительность тура. Затем заполните опциональные поля и получите расчет кешбека для созданного тура.\\\",\\\"homeWindow__title2\\\":\\\"Создавай путешествия<br>мы возвращаем деньги!\\\",\\\"homeWindow__title\\\":\\\"EN!! test title\\\",\\\"homeWindow__linkText\\\":\\\"Разместить товар\\\",\\\"df\\\":\\\"нужно следать рейтинг рекламодателя и дать возможность подписки на него. А так же следить за его новыми записями в ленте и каждый может размещать свое объявление. Например каждый может прорекламировать или пропиарить свою страницу в категории ПИАР и т.д. А если я електрик, то могу рекламировать свою услугу которую предоставляю и меня находят по трем ключевых словах. А если мне нужно найти услугу какую-то то я добавляю объявление мол хочу найти електрика для какой-то халтуры или даже работы\\\",\\\"header__signin\\\":\\\"Sign In\\\"}\");\n\n//# sourceURL=webpack:///./src/lang/en.json?");

/***/ }),

/***/ "./src/lang/ru.json":
/*!**************************!*\
  !*** ./src/lang/ru.json ***!
  \**************************/
/*! exports provided: title, test, new__title, new__subtitle, homeWindow__title2, homeWindow__title, homeWindow__linkText, df, header__signin, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"title\\\":\\\"Удобное утешествие и даже дешевле\\\",\\\"test\\\":\\\"Менеджер проекта\\\",\\\"new__title\\\":\\\"Создание нового тура\\\",\\\"new__subtitle\\\":\\\"Для создания собственного тура, выберете дату начала и продолжительность тура. Затем заполните опциональные поля и получите расчет кешбека для созданного тура.\\\",\\\"homeWindow__title2\\\":\\\"Создавай путешествия<br>мы возвращаем деньги!\\\",\\\"homeWindow__title\\\":\\\"<strong>РЫНОК ОНЛАЙН</strong><br>Продавай быстро<br>Покупай безопастно\\\",\\\"homeWindow__linkText\\\":\\\"Разместить товар\\\",\\\"df\\\":\\\"нужно следать рейтинг рекламодателя(магазина) и дать возможность подписки на него. А так же следить за его новыми записями в ленте и каждый может размещать свое объявление. Например каждый может прорекламировать или пропиарить свою страницу в категории ПИАР и т.д. А если я електрик, то могу рекламировать свою услугу которую предоставляю и меня находят по трем ключевых словах. А если мне нужно найти услугу какую-то то я добавляю объявление мол хочу найти електрика для какой-то халтуры или даже работы\\\",\\\"header__signin\\\":\\\"Вход\\\"}\");\n\n//# sourceURL=webpack:///./src/lang/ru.json?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Volumes_Hard_Server_myad_loc_front_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vue/composition-api */ \"./node_modules/@vue/composition-api/dist/vue-composition-api.module.js\");\n/* harmony import */ var _plugins_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugins/lang */ \"./src/plugins/lang.js\");\n/* harmony import */ var _plugins_req__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plugins/req */ \"./src/plugins/req.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _components_App_Page_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/App/Page.vue */ \"./src/components/App/Page.vue\");\n\n\n\n\n\n // import languagePlugin from './utils/lang.plugin';\n\n\n\n\n\n // Global layout components\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(_vue_composition_api__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(_plugins_lang__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(_plugins_req__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].component('CPage', _components_App_Page_vue__WEBPACK_IMPORTED_MODULE_11__[\"default\"]);\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  store: _store__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  router: _router__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/plugins/lang.js":
/*!*****************************!*\
  !*** ./src/plugins/lang.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../store/ */ \"./src/store/index.js\");\n // import lang from './../store/'\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  install: function install(Vue) {\n    Vue.prototype.$lang = function (key) {\n      var lang = _store___WEBPACK_IMPORTED_MODULE_0__[\"default\"].getters.lang; // import like lang file by ajax?\n\n      return __webpack_require__(\"./src/lang sync recursive ^\\\\.\\\\/.*\\\\.json$\")(\"./\".concat(lang, \".json\"))[key];\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/plugins/lang.js?");

/***/ }),

/***/ "./src/plugins/req.js":
/*!****************************!*\
  !*** ./src/plugins/req.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/request */ \"./src/utils/request.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  install: function install(Vue) {\n    Vue.prototype.$req = function (command) {\n      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';\n      var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];\n      return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(command, method, body);\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/plugins/req.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes */ \"./node_modules/core-js/modules/es.array.includes.js\");\n/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.includes */ \"./node_modules/core-js/modules/es.string.includes.js\");\n/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../utils/request */ \"./src/utils/request.js\");\n/* harmony import */ var _store___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../store/ */ \"./src/store/index.js\");\n/* harmony import */ var _assets_messages_ru_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../assets/messages/ru.js */ \"./src/assets/messages/ru.js\");\n\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_6__[\"default\"]); // const path = './../pages/Home-v2.vue'\n\nvar routes = [{\n  // path: '/:store?/:good?',\n  path: '/',\n  name: 'Home',\n  meta: {\n    headerMod: 'header_biggest'\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, /*! ./../pages/Homev2 */ \"./src/pages/Homev2.vue\"));\n  }\n}, {\n  path: '/cart',\n  name: 'Cart',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! ./../pages/Cart */ \"./src/pages/Cart.vue\"));\n  }\n}, // {\n// \tpath: '/business',\n// \tname: 'Business',\n// \tcomponent: () => import('./../pages/Business')\n// },\n{\n  path: '/store/new',\n  name: 'StoreNew',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(21)]).then(__webpack_require__.bind(null, /*! ./../pages/StoreNew */ \"./src/pages/StoreNew.vue\"));\n  }\n}, {\n  // path: '/:store?/:good?',\n  path: '/stores/:country?/:city?',\n  name: 'Stores',\n  meta: {\n    headerMod: 'header_biggest'\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(19)]).then(__webpack_require__.bind(null, /*! ./../pages/Stores */ \"./src/pages/Stores.vue\"));\n  }\n}, {\n  path: '/auth',\n  name: 'Auth',\n  meta: {},\n  redirect: '/auth/signin',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ./../pages/Auth/ */ \"./src/pages/Auth/index.vue\"));\n  },\n  children: [{\n    path: 'signin',\n    component: function component() {\n      return __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ./../pages/Auth/Signin */ \"./src/pages/Auth/Signin.vue\"));\n    }\n  }, {\n    path: 'signup',\n    component: function component() {\n      return __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ./../pages/Auth/Signup */ \"./src/pages/Auth/Signup.vue\"));\n    }\n  }, {\n    path: 'simply',\n    component: function component() {\n      return __webpack_require__.e(/*! import() */ 17).then(__webpack_require__.bind(null, /*! ./../pages/Auth/Simply */ \"./src/pages/Auth/Simply.vue\"));\n    }\n  }]\n}, {\n  path: '/board',\n  name: 'Board',\n  meta: {\n    auth: true,\n    header: 'user'\n  },\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ./../pages/Board */ \"./src/pages/Board.vue\"));\n  }\n}, {\n  path: '/explore',\n  name: 'Explore',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 10).then(__webpack_require__.bind(null, /*! ./../pages/Explore/ */ \"./src/pages/Explore/index.vue\"));\n  }\n}, {\n  path: '/new',\n  name: 'New',\n  meta: {\n    auth: true\n  },\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! ./../pages/New */ \"./src/pages/New.vue\"));\n  }\n}, {\n  path: '/calendar',\n  name: 'Calendar',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 18).then(__webpack_require__.bind(null, /*! ./../pages/Calendar */ \"./src/pages/Calendar.vue\"));\n  }\n}, {\n  path: '*',\n  name: 'Store',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ./../pages/Store.vue */ \"./src/pages/Store.vue\"));\n  }\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n  mode: 'history',\n  base: '/',\n  routes: routes,\n  scrollBehavior: function scrollBehavior(to, from, savedPosition) {\n    if (savedPosition) {\n      return savedPosition;\n    } else {\n      return {\n        x: 0,\n        y: 0\n      };\n    }\n  }\n});\nrouter.beforeEach( /*#__PURE__*/function () {\n  var _ref = Object(_Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(to, from, next) {\n    var msg, goto;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // console.log('QUREry')\n            if (to.query.msg) {\n              msg = to.query.msg;\n\n              if (msg in _assets_messages_ru_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]) {\n                _store___WEBPACK_IMPORTED_MODULE_8__[\"default\"].commit('clearMsg'); // setTimeout(() => {\n\n                _store___WEBPACK_IMPORTED_MODULE_8__[\"default\"].commit('msg', _assets_messages_ru_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"][msg]); // }, 100)\n                // return messages[msg]\n              } // console.log(\"srote!#$#@\")\t\n              // console.log(Store)\t\n\n            } // if local storage or cookie or store then\n            // console.log(store.getters.lang)\n            // store\n            // или мы проверяем стейт и записываем в переменную если стейт есть то мы не делаем запрос, \n            // если же стейта не ну то мы делаем запрос и результат записываем в стейт\n            // router.auth = true\n            // console.log(to.path)\n\n\n            if (!to.path.includes('/auth')) {\n              _context.next = 11;\n              break;\n            }\n\n            _context.prev = 2;\n            _context.next = 5;\n            return Object(_utils_request__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('auth?check', 'HEAD').then(function () {\n              if (from.path == '/board') {\n                next('/');\n              }\n\n              next('/board');\n            }).catch(function () {\n              next();\n            });\n\n          case 5:\n            _context.next = 11;\n            break;\n\n          case 7:\n            _context.prev = 7;\n            _context.t0 = _context[\"catch\"](2);\n            console.error(_context.t0);\n            next();\n\n          case 11:\n            if (!to.meta.auth) {\n              _context.next = 22;\n              break;\n            }\n\n            goto = '/auth?msg=signin-first';\n            _context.prev = 13;\n            _context.next = 16;\n            return Object(_utils_request__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('auth?check', 'HEAD').then(function () {\n              next();\n            }).catch(function () {\n              next(goto);\n            });\n\n          case 16:\n            _context.next = 22;\n            break;\n\n          case 18:\n            _context.prev = 18;\n            _context.t1 = _context[\"catch\"](13);\n            console.error(_context.t1);\n            next(goto);\n\n          case 22:\n            next();\n\n          case 23:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[2, 7], [13, 18]]);\n  }));\n\n  return function (_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../utils/request */ \"./src/utils/request.js\");\n\n\n\n\n\n\n // import Request from './../utils/req.plugin.js'\n// console.log(Request)\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_5__[\"default\"]); // Vue.use(Request)\n\nvar store = new vuex__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Store({\n  state: {\n    msg: false,\n    auth: false,\n    cart: {},\n    stores: {},\n    lang: 'en',\n    currentStore: null\n  },\n  mutations: {\n    setStores: function setStores(state, stores) {\n      state.stores = stores;\n    },\n    setCurrentStore: function setCurrentStore(state, storeId) {\n      state.currentStore = storeId;\n    },\n    setCartFromStorage: function setCartFromStorage(state) {\n      var storageCart = localStorage.getItem('cart');\n\n      if (storageCart) {\n        state.cart = JSON.parse(storageCart);\n      }\n    },\n    cartUpdate: function cartUpdate(state, store) {\n      var storeId = Object.keys(store)[0];\n\n      var cart = Object(_Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({}, state.cart, {}, store);\n\n      if (Object.keys(store[storeId].goods).length <= 0) {\n        delete cart[storeId];\n      }\n\n      localStorage.setItem('cart', JSON.stringify(cart));\n      state.cart = cart;\n    },\n    msg: function msg(state, _msg) {\n      state.msg = _msg;\n    },\n    clearMsg: function clearMsg(state) {\n      state.msg = false;\n    },\n    setAuth: function setAuth(state) {\n      localStorage.setItem('user', true);\n      state.auth = true;\n    },\n    clearAuth: function clearAuth(state) {\n      localStorage.removeItem('user');\n      state.auth = false;\n    },\n    setLang: function setLang(state, lang) {\n      state.lang = lang;\n    }\n  },\n  actions: {\n    fetchStores: function fetchStores(_ref, pageNum) {\n      var commit = _ref.commit;\n      return Object(_Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('stores?page=' + pageNum, 'GET').then(function (res) {\n                  console.log(res);\n                  commit('setStores', res.stores);\n                }).catch(function (err) {\n                  console.error('Fetch shops error', err);\n                });\n\n              case 2:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }))();\n    },\n    setUser: function setUser(_ref2) {\n      var commit = _ref2.commit;\n      return Object(_Volumes_Hard_Server_myad_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                if (!localStorage.getItem('user')) {\n                  _context2.next = 4;\n                  break;\n                }\n\n                commit('setAuth');\n                _context2.next = 12;\n                break;\n\n              case 4:\n                _context2.prev = 4;\n                _context2.next = 7;\n                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('auth?check', 'HEAD').then(function (res) {\n                  if (res.status === 200) {\n                    commit('setAuth');\n                  }\n                }).catch(function (err) {\n                  console.error('Error auth', err);\n                });\n\n              case 7:\n                _context2.next = 12;\n                break;\n\n              case 9:\n                _context2.prev = 9;\n                _context2.t0 = _context2[\"catch\"](4);\n                commit('setError', _context2.t0);\n\n              case 12:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, null, [[4, 9]]);\n      }))();\n    } // async fetchCurrency() {\n    //   // const key = process.env.VUE_APP_FIXER\n    //   // const res = await fetch(`http://data`)\n    //   // return await res.json()\n    // }\n\n  },\n  getters: {\n    msg: function msg(state) {\n      return state.msg;\n    },\n    auth: function auth(state) {\n      return state.auth;\n    },\n    cart: function cart(state) {\n      return state.cart;\n    },\n    stores: function stores(state) {\n      return state.stores;\n    },\n    currentStore: function currentStore(state) {\n      return state.currentStore;\n    },\n    lang: function lang(state) {\n      return state.lang;\n    }\n  },\n  modules: {}\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/utils/request.js":
/*!******************************!*\
  !*** ./src/utils/request.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return request; });\n/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.join */ \"./node_modules/core-js/modules/es.array.join.js\");\n/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction request(command, method) {\n  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];\n  var url = '/api-v1/' + command;\n  return new Promise(function (resolve, reject) {\n    var request = new XMLHttpRequest();\n    request.open(method, url);\n    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\n    request.setRequestHeader('Accept', 'application/json');\n\n    request.onload = function () {\n      if (request.status >= 200 && request.status < 300) {\n        var response = {};\n        response.success = true;\n        response.status = request.status;\n        response.statusText = request.statusText;\n        response.body = null;\n\n        if (request.responseText) {\n          response = JSON.parse(request.responseText);\n        }\n\n        resolve(response);\n      }\n\n      reject({\n        success: false,\n        status: request.status,\n        statusText: request.statusText,\n        body: null\n      });\n    };\n\n    request.onerror = function () {\n      reject({\n        success: false,\n        status: request.status,\n        statusText: request.statusText,\n        body: null\n      });\n    };\n\n    request.send(body.join('&'));\n  });\n}\n\n//# sourceURL=webpack:///./src/utils/request.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });
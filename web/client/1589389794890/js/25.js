(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/Stores.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Stores.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Volumes_Hard_Server_gotoashop_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _components_App_CStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/App/CStore */ \"./src/components/App/CStore.vue\");\n/* harmony import */ var _components_App_CShop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/App/CShop */ \"./src/components/App/CShop.vue\");\n/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ \"./node_modules/@vue/composition-api/dist/vue-composition-api.module.js\");\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n // import CStore from '@/components/App/CStore';\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Stores',\n  data: function data() {\n    return {\n      dateTo: '2020-10-10',\n      inputDate: false,\n      shops: null\n    };\n  },\n  components: {\n    CStore: _components_App_CStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    CShop: _components_App_CShop__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    return Object(_Volumes_Hard_Server_gotoashop_loc_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var country, city;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              country = _this.$route.params.country;\n              city = _this.$route.params.city;\n\n              if (!country) {\n                _context.next = 9;\n                break;\n              }\n\n              city = city ? city : '';\n              _context.next = 6;\n              return _this.$store.dispatch('fetchShops', 'shops?country=' + country + '&city=' + city);\n\n            case 6:\n              _this.shops = _this.$store.getters.shops;\n              console.log('shops');\n              console.log(_this.shops); // this.$req('stores/?country=' + country + '&city=' + city, 'GET')\n              // .then(res => {\n              //   this.stores = res.stores\n              // console.log(res)\n              // })\n\n            case 9:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }))();\n  },\n  methods: {\n    inputDateHandler: function inputDateHandler() {// console.log('hello')\n      // this.inputDate = true\n      // setTimeout(() => {\n      //   this.$refs.inputDate.focus()\n      // }, 100)\n    }\n  },\n  setup: function setup(props, vm) {\n    var visible = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__[\"ref\"])(true);\n\n    var toggle = function toggle() {\n      // vm.root.$options.store.commit('setLang', 'en')\n      // const x = 'null'\n      // if(x != null) {\n      //   console.log(true)\n      // } else {\n      //   console.log(false)\n      // }\n      // console.log(!!x)\n      // console.log(vm.root.$options.store.getters.lang)\n      visible.value = !visible.value;\n    }; // const inputDateHandler = () => {\n    //   this\n    // }\n\n\n    return {\n      visible: visible,\n      toggle: toggle // inputDateHandler\n\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/pages/Stores.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"0f896193-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/Stores.vue?vue&type=template&id=3b87a656&lang=pug&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0f896193-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Stores.vue?vue&type=template&id=3b87a656&lang=pug& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"CPage\", { staticClass: \"stores\" }, [\n    _c(\"div\", { staticClass: \"page__title\" }),\n    _c(\"div\", { staticClass: \"page__stores\" }),\n    _c(\n      \"div\",\n      { staticClass: \"test\" },\n      _vm._l(_vm.shops, function(shop) {\n        return _c(\"CShop\", { attrs: { shop: shop } })\n      }),\n      1\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/pages/Stores.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%220f896193-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/pages/Stores.vue":
/*!******************************!*\
  !*** ./src/pages/Stores.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Stores_vue_vue_type_template_id_3b87a656_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stores.vue?vue&type=template&id=3b87a656&lang=pug& */ \"./src/pages/Stores.vue?vue&type=template&id=3b87a656&lang=pug&\");\n/* harmony import */ var _Stores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Stores.vue?vue&type=script&lang=js& */ \"./src/pages/Stores.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Stores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Stores_vue_vue_type_template_id_3b87a656_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Stores_vue_vue_type_template_id_3b87a656_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/pages/Stores.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/pages/Stores.vue?");

/***/ }),

/***/ "./src/pages/Stores.vue?vue&type=script&lang=js&":
/*!*******************************************************!*\
  !*** ./src/pages/Stores.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Stores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Stores.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/Stores.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Stores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/pages/Stores.vue?");

/***/ }),

/***/ "./src/pages/Stores.vue?vue&type=template&id=3b87a656&lang=pug&":
/*!**********************************************************************!*\
  !*** ./src/pages/Stores.vue?vue&type=template&id=3b87a656&lang=pug& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_0f896193_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Stores_vue_vue_type_template_id_3b87a656_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"0f896193-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/pug-plain-loader!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Stores.vue?vue&type=template&id=3b87a656&lang=pug& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"0f896193-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/Stores.vue?vue&type=template&id=3b87a656&lang=pug&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_0f896193_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Stores_vue_vue_type_template_id_3b87a656_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_0f896193_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Stores_vue_vue_type_template_id_3b87a656_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/pages/Stores.vue?");

/***/ })

}]);
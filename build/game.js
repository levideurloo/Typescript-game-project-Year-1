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
/******/ 			if(installedChunks[chunkId]) {
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
/******/ 		"game": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "";
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
/******/ 	deferredModules.push(["./src/Game.ts","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Game.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(\"./node_modules/phaser/src/phaser.js\");\r\nvar Preloader_1 = __webpack_require__(\"./src/scenes/Preloader.ts\");\r\nvar Main_1 = __webpack_require__(\"./src/scenes/Main.ts\");\r\nvar config = {\r\n    type: Phaser.AUTO,\r\n    parent: \"canvas\",\r\n    width: 960,\r\n    height: 540,\r\n    scene: [\r\n        Preloader_1.Preloader,\r\n        Main_1.Main\r\n    ]\r\n};\r\nvar game = new Phaser.Game(config);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4vc3JjL0dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBZ0I7QUFDaEIsbUVBQStDO0FBQy9DLHlEQUFxQztBQUVyQyxJQUFNLE1BQU0sR0FBZTtJQUN2QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7SUFDakIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLEdBQUc7SUFDVixNQUFNLEVBQUUsR0FBRztJQUNYLEtBQUssRUFBRTtRQUNILHFCQUFTO1FBQ1QsV0FBSTtLQUNQO0NBQ0osQ0FBQztBQUVGLElBQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9HYW1lLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicGhhc2VyXCI7XG5pbXBvcnQgeyBQcmVsb2FkZXIgfSBmcm9tICcuL3NjZW5lcy9QcmVsb2FkZXInO1xuaW1wb3J0IHsgTWFpbiB9IGZyb20gJy4vc2NlbmVzL01haW4nO1xuXG5jb25zdCBjb25maWc6IEdhbWVDb25maWcgPSB7XG4gICAgdHlwZTogUGhhc2VyLkFVVE8sXG4gICAgcGFyZW50OiBcImNhbnZhc1wiLFxuICAgIHdpZHRoOiA5NjAsXG4gICAgaGVpZ2h0OiA1NDAsXG4gICAgc2NlbmU6IFtcbiAgICAgICAgUHJlbG9hZGVyLFxuICAgICAgICBNYWluXG4gICAgXVxufTtcblxuY29uc3QgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShjb25maWcpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Game.ts\n");

/***/ }),

/***/ "./src/config/preload.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/**\r\n * MP3 and OGG-Vorbis are the most heavily supported\r\n * audio formats for modern browsers\r\n *\r\n * OGG-Vorbis is optionally set as the fallback audio\r\n */\r\nvar AudioFile = /** @class */ (function () {\r\n    function AudioFile(key, mp3, ogg) {\r\n        this.key = key;\r\n        this.mp3 = mp3;\r\n        this.ogg = ogg;\r\n    }\r\n    return AudioFile;\r\n}());\r\nexports.AudioFile = AudioFile;\r\nvar assetDir = \"./assets\"; // relative to build dir\r\nexports.config = {\r\n    // spritesheets\r\n    ssPath: assetDir + \"/spritesheets/\",\r\n    sheets: [\r\n        \"sheet1\"\r\n    ],\r\n    // audio\r\n    audioPath: assetDir + \"/audio/\",\r\n    audioFiles: [\r\n        new AudioFile('DOG', 'DOG.mp3', 'DOG.ogg')\r\n    ]\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4vc3JjL2NvbmZpZy9wcmVsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0dBS0c7QUFDSDtJQUNJLG1CQUFZLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBWTtRQUM5QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUtMLGdCQUFDO0FBQUQsQ0FBQztBQVZZLDhCQUFTO0FBWXRCLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLHdCQUF3QjtBQUV4QyxjQUFNLEdBQUc7SUFDbEIsZUFBZTtJQUNmLE1BQU0sRUFBSyxRQUFRLG1CQUFnQjtJQUNuQyxNQUFNLEVBQUU7UUFDSixRQUFRO0tBQ1g7SUFFRCxRQUFRO0lBQ1IsU0FBUyxFQUFLLFFBQVEsWUFBUztJQUMvQixVQUFVLEVBQUU7UUFDUixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztLQUM3QztDQUNKIiwiZmlsZSI6Ii4vc3JjL2NvbmZpZy9wcmVsb2FkLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIE1QMyBhbmQgT0dHLVZvcmJpcyBhcmUgdGhlIG1vc3QgaGVhdmlseSBzdXBwb3J0ZWRcclxuICogYXVkaW8gZm9ybWF0cyBmb3IgbW9kZXJuIGJyb3dzZXJzXHJcbiAqIFxyXG4gKiBPR0ctVm9yYmlzIGlzIG9wdGlvbmFsbHkgc2V0IGFzIHRoZSBmYWxsYmFjayBhdWRpb1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1ZGlvRmlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZywgbXAzOiBzdHJpbmcsIG9nZz86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgICAgIHRoaXMubXAzID0gbXAzO1xyXG4gICAgICAgIHRoaXMub2dnID0gb2dnO1xyXG4gICAgfVxyXG5cclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgbXAzOiBzdHJpbmc7XHJcbiAgICBvZ2c/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IGFzc2V0RGlyID0gXCIuL2Fzc2V0c1wiOyAvLyByZWxhdGl2ZSB0byBidWlsZCBkaXJcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XHJcbiAgICAvLyBzcHJpdGVzaGVldHNcclxuICAgIHNzUGF0aDogYCR7YXNzZXREaXJ9L3Nwcml0ZXNoZWV0cy9gLFxyXG4gICAgc2hlZXRzOiBbXHJcbiAgICAgICAgXCJzaGVldDFcIlxyXG4gICAgXSxcclxuXHJcbiAgICAvLyBhdWRpb1xyXG4gICAgYXVkaW9QYXRoOiBgJHthc3NldERpcn0vYXVkaW8vYCxcclxuICAgIGF1ZGlvRmlsZXM6IFtcclxuICAgICAgICBuZXcgQXVkaW9GaWxlKCdET0cnLCAnRE9HLm1wMycsICdET0cub2dnJylcclxuICAgIF1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/preload.ts\n");

/***/ }),

/***/ "./src/scenes/Main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    }\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Main = /** @class */ (function (_super) {\r\n    __extends(Main, _super);\r\n    function Main() {\r\n        return _super.call(this, \"main\") || this;\r\n    }\r\n    Main.prototype.create = function () {\r\n        var logo = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'sheet1', 'phaser-logo');\r\n        var music = this.sound.add('DOG');\r\n        this.input.on('pointerdown', function (pointer) {\r\n            if (!music.isPlaying) {\r\n                music.play();\r\n            }\r\n            logo.setPosition(pointer.x, pointer.y);\r\n        });\r\n    };\r\n    return Main;\r\n}(Phaser.Scene));\r\nexports.Main = Main;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4vc3JjL3NjZW5lcy9NYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQTBCLHdCQUFZO0lBQ2xDO2VBQ0ksa0JBQU0sTUFBTSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBQ0ksSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU3RyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBQyxPQUE2QjtZQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2hCO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxDQWpCeUIsTUFBTSxDQUFDLEtBQUssR0FpQnJDO0FBakJZLG9CQUFJIiwiZmlsZSI6Ii4vc3JjL3NjZW5lcy9NYWluLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1haW4gZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIm1haW5cIik7XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBsb2dvID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMuc3lzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuc3lzLmNhbnZhcy5oZWlnaHQgLyAyLCAnc2hlZXQxJywgJ3BoYXNlci1sb2dvJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtdXNpYyA9IHRoaXMuc291bmQuYWRkKCdET0cnKTtcbiAgICAgICAgdGhpcy5pbnB1dC5vbigncG9pbnRlcmRvd24nLCAocG9pbnRlcjogUGhhc2VyLklucHV0LlBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghbXVzaWMuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgbXVzaWMucGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2dvLnNldFBvc2l0aW9uKHBvaW50ZXIueCwgcG9pbnRlci55KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scenes/Main.ts\n");

/***/ }),

/***/ "./src/scenes/Preloader.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    }\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar preload_1 = __webpack_require__(\"./src/config/preload.ts\");\r\nvar Preloader = /** @class */ (function (_super) {\r\n    __extends(Preloader, _super);\r\n    function Preloader() {\r\n        return _super.call(this, {\r\n            key: 'preloader',\r\n            pack: {\r\n                files: [\r\n                    { type: 'image', key: 'bar', url: './assets/images/loadBar.png' },\r\n                    { type: 'image', key: 'barBg', url: './assets/images/barBg.png' }\r\n                ]\r\n            }\r\n        }) || this;\r\n    }\r\n    Preloader.prototype.preload = function () {\r\n        // add the loading bar to use as a display for the loading progress of the remainder of the assets\r\n        var barBg = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'barBg');\r\n        var bar = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'bar');\r\n        var mask = this.make.graphics({\r\n            x: bar.x - (bar.width / 2),\r\n            y: bar.y - (bar.height / 2),\r\n            add: false\r\n        });\r\n        mask.fillRect(0, 0, 0, bar.height);\r\n        bar.mask = new Phaser.Display.Masks.GeometryMask(this, mask);\r\n        this.load.on('progress', function (progress) {\r\n            mask.clear();\r\n            mask.fillRect(0, 0, bar.width * progress, bar.height);\r\n        });\r\n        // load assets declared in the preload config\r\n        this.loadAtlas();\r\n        this.loadAudio();\r\n    };\r\n    Preloader.prototype.create = function () {\r\n        this.scene.start('main');\r\n    };\r\n    Preloader.prototype.loadAtlas = function () {\r\n        var sheetPath = preload_1.config.ssPath;\r\n        var sheets = preload_1.config.sheets;\r\n        this.load.setPath(sheetPath);\r\n        for (var i = 0; i < sheets.length; i++) {\r\n            this.load.atlas(sheets[i], sheets[i] + \".png\", sheets[i] + \".json\");\r\n        }\r\n    };\r\n    Preloader.prototype.loadAudio = function () {\r\n        var audioPath = preload_1.config.audioPath;\r\n        var audioFiles = preload_1.config.audioFiles;\r\n        this.load.setPath(audioPath);\r\n        for (var i = 0; i < audioFiles.length; i++) {\r\n            this.load.audio(audioFiles[i].key, audioFiles[i].mp3, audioFiles[i].ogg);\r\n        }\r\n    };\r\n    return Preloader;\r\n}(Phaser.Scene));\r\nexports.Preloader = Preloader;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4vc3JjL3NjZW5lcy9QcmVsb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTJDO0FBRTNDO0lBQStCLDZCQUFZO0lBQ3ZDO2VBQ0ksa0JBQU07WUFDRixHQUFHLEVBQUUsV0FBVztZQUNoQixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFO29CQUNILEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSw2QkFBNkIsRUFBRTtvQkFDakUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixFQUFFO2lCQUNwRTthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCwyQkFBTyxHQUFQO1FBQ0ksa0dBQWtHO1FBQ2xHLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3RixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFMUYsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDNUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsUUFBZ0I7WUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFTLEdBQVQ7UUFDSSxJQUFNLFNBQVMsR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFNLE1BQU0sR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQztRQUU3QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFNLEVBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFPLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBQ0ksSUFBTSxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBTSxVQUFVLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUM7UUFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1RTtJQUNMLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQ0E5RDhCLE1BQU0sQ0FBQyxLQUFLLEdBOEQxQztBQTlEWSw4QkFBUyIsImZpbGUiOiIuL3NyYy9zY2VuZXMvUHJlbG9hZGVyLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3ByZWxvYWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByZWxvYWRlciBleHRlbmRzIFBoYXNlci5TY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGtleTogJ3ByZWxvYWRlcicsXHJcbiAgICAgICAgICAgIHBhY2s6IHtcclxuICAgICAgICAgICAgICAgIGZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnaW1hZ2UnLCBrZXk6ICdiYXInLCB1cmw6ICcuL2Fzc2V0cy9pbWFnZXMvbG9hZEJhci5wbmcnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnaW1hZ2UnLCBrZXk6ICdiYXJCZycsIHVybDogJy4vYXNzZXRzL2ltYWdlcy9iYXJCZy5wbmcnIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByZWxvYWQoKSB7XHJcbiAgICAgICAgLy8gYWRkIHRoZSBsb2FkaW5nIGJhciB0byB1c2UgYXMgYSBkaXNwbGF5IGZvciB0aGUgbG9hZGluZyBwcm9ncmVzcyBvZiB0aGUgcmVtYWluZGVyIG9mIHRoZSBhc3NldHNcclxuICAgICAgICBjb25zdCBiYXJCZyA9IHRoaXMuYWRkLmltYWdlKHRoaXMuc3lzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuc3lzLmNhbnZhcy5oZWlnaHQgLyAyLCAnYmFyQmcnKTtcclxuICAgICAgICBjb25zdCBiYXIgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy5zeXMuY2FudmFzLndpZHRoIC8gMiwgdGhpcy5zeXMuY2FudmFzLmhlaWdodCAvIDIsICdiYXInKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWFzayA9IHRoaXMubWFrZS5ncmFwaGljcyh7XHJcbiAgICAgICAgICAgIHg6IGJhci54IC0gKGJhci53aWR0aCAvIDIpLFxyXG4gICAgICAgICAgICB5OiBiYXIueSAtIChiYXIuaGVpZ2h0IC8gMiksXHJcbiAgICAgICAgICAgIGFkZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXNrLmZpbGxSZWN0KDAsIDAsIDAsIGJhci5oZWlnaHQpO1xyXG5cclxuICAgICAgICBiYXIubWFzayA9IG5ldyBQaGFzZXIuRGlzcGxheS5NYXNrcy5HZW9tZXRyeU1hc2sodGhpcywgbWFzayk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkLm9uKCdwcm9ncmVzcycsIChwcm9ncmVzczogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG1hc2suY2xlYXIoKTtcclxuICAgICAgICAgICAgbWFzay5maWxsUmVjdCgwLCAwLCBiYXIud2lkdGggKiBwcm9ncmVzcywgYmFyLmhlaWdodCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGxvYWQgYXNzZXRzIGRlY2xhcmVkIGluIHRoZSBwcmVsb2FkIGNvbmZpZ1xyXG4gICAgICAgIHRoaXMubG9hZEF0bGFzKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkQXVkaW8oKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5zdGFydCgnbWFpbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRBdGxhcygpIHtcclxuICAgICAgICBjb25zdCBzaGVldFBhdGggPSBjb25maWcuc3NQYXRoO1xyXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IGNvbmZpZy5zaGVldHM7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5zZXRQYXRoKHNoZWV0UGF0aCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hlZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5hdGxhcyhzaGVldHNbaV0sIGAke3NoZWV0c1tpXX0ucG5nYCwgYCR7c2hlZXRzW2ldfS5qc29uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRBdWRpbygpIHtcclxuICAgICAgICBjb25zdCBhdWRpb1BhdGggPSBjb25maWcuYXVkaW9QYXRoO1xyXG4gICAgICAgIGNvbnN0IGF1ZGlvRmlsZXMgPSBjb25maWcuYXVkaW9GaWxlcztcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLnNldFBhdGgoYXVkaW9QYXRoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdWRpb0ZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5hdWRpbyhhdWRpb0ZpbGVzW2ldLmtleSwgYXVkaW9GaWxlc1tpXS5tcDMsIGF1ZGlvRmlsZXNbaV0ub2dnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scenes/Preloader.ts\n");

/***/ })

/******/ });
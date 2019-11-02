/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/TwitchAPI.js":
/*!**************************!*\
  !*** ./src/TwitchAPI.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TwitchAPI; });\nclass TwitchAPI{\n\tconstructor(){\n\t\tthis.clientID = \"w7noco2018pomibp0cc07rhewamy6k\";\n\t\tthis.url = \"https://api.twitch.tv/helix/streams?user_login=bobross\";\n\n\t\tthis.settings = {\n\t\t\theaders: { \"Client-ID\" : this.clientID }\n\t\t};\n\t}\n\tupdateViewerCount(){\n\t\tfetch(this.url, this.settings).then((result)=>{\n\t\t\tresult.json().then((json)=>{\n\t\t\t\tif(json.data.length > 0){\n\t\t\t\t\tdocument.querySelector(\"#viewer-count\").innerText = json.data[0].viewer_count;\n\t\t\t\t}\n\t\t\t\tsetTimeout(()=>{ this.updateViewerCount() }, 5*60*1000);\n\t\t\t});\n\t\t});\n\t}\n}\n\n//# sourceURL=webpack:///./src/TwitchAPI.js?");

/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UI; });\n/* harmony import */ var View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! View */ \"./src/View.js\");\n\n\n/*\n\tLoads the Youtube live provided in the URL\n\tOtherwise defaults to VOD for testing and showcase purposes\n*/\n\nclass UI{\n\tconstructor(){\n\t\t// Get the id from the URL parameters\n\t\tthis.matchSettings = {\n\t\t\tvideo: window.location.hash.substring(1)\n\t\t};\n\t\tthis.casterSettings = {\n\t\t\tchannel: \"sardoche\"\n\t\t};\n\t\t// If empty, show VOD\n\t\tif(this.matchSettings.video == \"\"){\n\t\t\tthis.matchSettings = {\n\t\t\t\tvideo: \"r76KQmK2nLE\",\n\t\t\t\ttimestamp: \"11747\",\n\t\t\t};\n\t\t\tthis.casterSettings = {\n\t\t\t\tvideo: \"499832186\",\n\t\t\t\ttimestamp: 14666,\n\t\t\t};\n\t\t}\n\t\tthis.isMobile = (/Mobi/i.test(navigator.userAgent));\n\n\t\tthis.mainPlayer = new View__WEBPACK_IMPORTED_MODULE_0__[\"YoutubeView\"](\"youtube-player\", this.matchSettings);\n\t\tthis.casterPlayer = new View__WEBPACK_IMPORTED_MODULE_0__[\"TwitchView\"](\"caster-view\", this.casterSettings);\n\t\tthis.registerListeners();\n\n\t\tif(this.isMobile){\n\t\t\tthis.toggleFullscreen();\n\t\t}\n\t}\n\tregisterListeners(){\n\t\t// Register the actions for each button\n\t\tdocument.querySelector(\"#sync\").addEventListener(\"click\", ()=>{\n\t\t\tlet toggledValue = !this.casterPlayer.isInSyncMode;\n\t\t\tthis.casterPlayer.sync(toggledValue);\n\t\t\tthis.mainPlayer.sync(toggledValue);\n\t\t});\n\t\tdocument.querySelector(\"#game-control\").addEventListener(\"click\", ()=>{\n\t\t\tthis.mainPlayer.togglePause();\n\t\t});\n\t\tdocument.querySelector(\"#caster-control\").addEventListener(\"click\", ()=>{\n\t\t\tthis.casterPlayer.togglePause();\n\t\t});\n\t\tdocument.querySelector(\"#fullscreen\").addEventListener(\"click\", ()=>{\n\t\t\tthis.toggleFullscreen();\n\t\t});\n\n\t\t// Toggle controls visibility when the screen is tapped on mobile\n\t\tdocument.querySelector(\"#main-view .controls\").addEventListener(\"touchend\", (event)=>{\n\t\t\tif(event.srcElement == document.querySelector(\"#main-view .controls\")){\n\t\t\t\tdocument.querySelector(\"#main-view .controls\").classList.toggle(\"visible\");\n\t\t\t}\n\t\t\tif(!document.querySelector(\"#main-view .controls\").classList.contains(\"visible\")){\n\t\t\t\tdocument.querySelector(\"#mobile-volume-control\").classList.remove(\"toggled\");\n\t\t\t}\n\t\t});\n\n\t\t// Hide the chat loader once the iframe is loaded\n\t\tdocument.querySelector(\"#live-chat-embed\").addEventListener(\"load\", (event)=>{\n\t\t\tdocument.querySelector(\"#live-chat\").classList.remove(\"is-loading\");\n\t\t});\n\t}\n\ttoggleFullscreen(){\n\t\tif(!this.fullscreen){\n\t\t\tdocument.body.requestFullscreen().then(()=>{\n\t\t\t\tthis.fullscreen = true;\n\t\t\t\twindow.screen.orientation.lock(\"landscape\").then(function(){\n\t\t\t\t\tthis.landscape = true;\n\t\t\t\t}).catch(function(err){\n\t\t\t\t\tthis.landscape = false;\n\t\t\t\t});\n\t\t\t}).catch((err)=>{\n\t\t\t\tthis.fullscreen = false;\n\t\t\t});\n\t\t}else{\n\t\t\tdocument.exitFullscreen().then(()=>{\n\t\t\t\tthis.fullscreen = false;\n\t\t\t});\n\t\t}\t\n\t}\n}\n\n//# sourceURL=webpack:///./src/UI.js?");

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/*! exports provided: TwitchView, YoutubeView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TwitchView\", function() { return TwitchView; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"YoutubeView\", function() { return YoutubeView; });\n/*\n\tCreates a Twitch player\n\tHandles API calls, resize events, loading animations\n*/\n\nclass TwitchView{\n\tconstructor(domElementID, playbackSettings){\n\t\tthis.domElement = document.querySelector(\"#\"+domElementID);\n\t\tthis.isInSyncMode = false;\n\t\tthis.playbackSettings = playbackSettings;\n\t\tthis.playerOptions = {\n\t\t\twidth: this.domElement.offsetWidth,\n\t\t\theight: this.domElement.offsetHeight,\n\t\t\tcontrols: false\n\t\t};\n\t\tif(playbackSettings.video) this.playerOptions.video = playbackSettings.video;\n\t\tif(playbackSettings.channel) this.playerOptions.channel = playbackSettings.channel;\n\t\tthis.player = new Twitch.Player(domElementID, this.playerOptions);\n\t\tthis.registerListeners();\n\t\tthis.sync(false);\n\t}\n\ttogglePause(){\n\t\tif(this.player.isPaused()){\n\t\t\tthis.player.play();\n\t\t\tdocument.querySelector(\"#caster-control\").classList.remove(\"paused\");\n\t\t}else{\n\t\t\tthis.player.pause();\n\t\t\tdocument.querySelector(\"#caster-control\").classList.add(\"paused\");\n\t\t}\n\t}\n\tsetSize(){\n\t\tthis.player.setWidth(this.domElement.offsetWidth);\n\t\tthis.player.setHeight(this.domElement.offsetHeight);\n\t}\n\tregisterListeners(){\n\t\tthis.player.addEventListener(Twitch.Player.READY, ()=>{\n\t\t});\n\t\tthis.player.addEventListener(Twitch.Player.PLAYING, ()=>{\n\t\t\tif(this.playbackSettings.timestamp){\n\t\t\t\tthis.player.seek(this.playbackSettings.timestamp);\n\t\t\t}\n\t\t\tdocument.querySelector(\"#caster-volume\").value = this.player.getVolume() * 100;\n\t\t\tthis.hideLoader();\n\t\t});\n\t\tthis.player.addEventListener(Twitch.Player.PLAYBACK_BLOCKED, ()=>{\n\t\t\tconsole.log(\"PLAYBACK_BLOCKED\");\n\t\t});\n\t\tdocument.querySelector(\"#caster-volume\").addEventListener(\"input\", (event)=>{\n\t\t\tthis.player.setVolume(event.srcElement.value/100);\n\t\t\tthis.player.setMuted(false);\n\t\t});\n\t\tdocument.querySelector(\"#mobile-caster-volume\").addEventListener(\"input\", (event)=>{\n\t\t\tthis.player.setVolume(event.srcElement.value/100);\n\t\t\tthis.player.setMuted(false);\n\t\t});\n\t\tdocument.querySelector(\"#volume-toggle\").addEventListener(\"click\", ()=>{\n\t\t\tdocument.querySelector(\"#mobile-volume-control\").classList.toggle(\"toggled\");\n\t\t});\n\t\twindow.addEventListener(\"resize\", ()=>{\n\t\t\tthis.setSize();\n\t\t});\n\t}\n\thideLoader(){\n\t\tthis.domElement.classList.remove(\"is-loading\");\n\t}\n\tsync(value){\n\t\tif(value){\n\t\t\tthis.isInSyncMode = true;\n\t\t\tthis.domElement.classList.add(\"timer-focus\");\n\t\t\tthis.domElement.classList.remove(\"caster-focus\");\n\t\t}else{\n\t\t\tthis.isInSyncMode = false;\n\t\t\tthis.domElement.classList.add(\"caster-focus\");\n\t\t\tthis.domElement.classList.remove(\"timer-focus\");\n\t\t}\n\t\tthis.setSize();\n\t}\n}\n\n/*\n\tCreates a Youtube player\n\tHandles API calls, resize events, loading animations\n*/\n\nclass YoutubeView{\n\tconstructor(domElementID, playbackSettings){\n\t\tthis.domElement = document.querySelector(\"#\"+domElementID).parentElement;\n\t\tthis.isInSyncMode = false;\n\t\tthis.playbackSettings = playbackSettings;\n\t\tthis.playerOptions = {\n\t\t\twidth: this.domElement.offsetWidth,\n\t\t\theight: this.domElement.offsetWidth*(9/16),\n\t\t\tvideoId: playbackSettings.video,\n\t\t\tevents: {\n\t\t\t\t\"onReady\": this.onPlayerReady,\n\t\t\t\t\"onStateChange\": this.onPlayerStateChange\n\t\t\t}\n\t\t};\n\t\tthis.player = new YT.Player(domElementID, this.playerOptions);\n\t\tthis.registerListeners();\n\t}\n\ttogglePause(){\n\t\tif(this.player.getPlayerState() == YT.PlayerState.PAUSED){\n\t\t\tthis.player.playVideo();\n\t\t\tdocument.querySelector(\"#game-control\").classList.remove(\"paused\");\n\t\t}else{\n\t\t\tthis.player.pauseVideo();\n\t\t\tdocument.querySelector(\"#game-control\").classList.add(\"paused\");\n\t\t}\n\t}\n\tsetSize(){\n\t\tthis.player.setSize(this.domElement.offsetWidth, this.domElement.offsetWidth*(9/16));\n\t}\n\tregisterListeners(){\n\t\tthis.player.addEventListener(\"onReady\", (event)=>{\n\t\t\tthis.player.playVideo();\n\t\t\tthis.player.mute();\n\t\t\tif(this.playbackSettings.timestamp) this.player.seekTo(this.playbackSettings.timestamp);\n\t\t});\n\t\tthis.player.addEventListener(\"onStateChange\", (event)=>{\n\t\t\tif(event.data == YT.PlayerState.PLAYING){\n\t\t\t\tthis.hideLoader();\n\t\t\t}\n\t\t});\n\t\twindow.addEventListener(\"resize\", ()=>{\n\t\t\tthis.setSize();\n\t\t});\n\t}\n\thideLoader(){\n\t\tthis.domElement.classList.remove(\"is-loading\");\n\t}\n\tsync(value){\n\t\tif(value){\n\t\t\tthis.isInSyncMode = true;\n\t\t\tthis.domElement.classList.add(\"timer-focus\");\n\t\t\tthis.domElement.classList.remove(\"game-focus\");\n\t\t}else{\n\t\t\tthis.isInSyncMode = true;\n\t\t\tthis.domElement.classList.add(\"game-focus\");\n\t\t\tthis.domElement.classList.remove(\"timer-focus\");\n\t\t}\n\t\tthis.setSize();\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/View.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! UI */ \"./src/UI.js\");\n/* harmony import */ var TwitchAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! TwitchAPI */ \"./src/TwitchAPI.js\");\n\n\n\nfunction waitForTwitch(){\n\treturn new Promise((resolve)=>{\n\t\tif(window.Twitch != undefined){\n\t\t\tresolve();\n\t\t}else{\n\t\t\tsetTimeout(()=>{\n\t\t\t\twaitForTwitch().then(()=>{\n\t\t\t\t\tresolve();\n\t\t\t\t});\n\t\t\t}, 300);\n\t\t}\n\t});\n}\n\nwindow.onYouTubeIframeAPIReady = ()=>{\n\twaitForTwitch().then(()=>{\n\t\tlet ui = new UI__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\t});\n}\n\nlet twitchApi = new TwitchAPI__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\ntwitchApi.updateViewerCount();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
import * as View from "View";

/*
	Loads the Youtube live provided in the URL
	Otherwise defaults to VOD for testing and showcase purposes
*/

export default class UI{
	constructor(){
		// Get the id from the URL parameters
		this.matchSettings = {
			video: window.location.hash.substring(1)
		};
		this.casterSettings = {
			channel: "sardoche"
		};
		// If empty, show VOD
		if(this.matchSettings.video == ""){
			this.matchSettings = {
				video: "r76KQmK2nLE",
				timestamp: "11747",
			};
			this.casterSettings = {
				video: "499832186",
				timestamp: 14666,
			};
		}
		this.isMobile = (/Mobi/i.test(navigator.userAgent));

		this.mainPlayer = new View.YoutubeView("youtube-player", this.matchSettings);
		this.casterPlayer = new View.TwitchView("caster-view", this.casterSettings);
		this.registerListeners();

		if(this.isMobile){
			this.toggleFullscreen();
		}
	}
	registerListeners(){
		// Register the actions for each button
		document.querySelector("#sync").addEventListener("click", ()=>{
			let toggledValue = !this.casterPlayer.isInSyncMode;
			this.casterPlayer.sync(toggledValue);
			this.mainPlayer.sync(toggledValue);
		});
		document.querySelector("#game-control").addEventListener("click", ()=>{
			this.mainPlayer.togglePause();
		});
		document.querySelector("#game-reset-control").addEventListener("click", ()=>{
			this.mainPlayer.catchUpLive();
		});
		document.querySelector("#fullscreen").addEventListener("click", ()=>{
			this.toggleFullscreen();
		});

		// Toggle controls visibility when the screen is tapped on mobile
		document.querySelector("#main-view .controls").addEventListener("touchend", (event)=>{
			if(event.srcElement == document.querySelector("#main-view .controls")){
				document.querySelector("#main-view .controls").classList.toggle("visible");
			}
			if(!document.querySelector("#main-view .controls").classList.contains("visible")){
				document.querySelector("#mobile-volume-control").classList.remove("toggled");
			}
		});

		// Toggle Settings
		document.querySelector("#open-settings").addEventListener("click", (event)=>{
			document.querySelector("#settings").classList.add("toggled");
		});
		document.querySelector("#close-settings").addEventListener("click", (event)=>{
			document.querySelector("#settings").classList.remove("toggled");
		});

		// Hide the chat loader once the iframe is loaded
		document.querySelector("#live-chat-embed").addEventListener("load", (event)=>{
			document.querySelector("#live-chat").classList.remove("is-loading");
		});
	}
	toggleFullscreen(){
		if(!this.fullscreen){
			document.body.requestFullscreen().then(()=>{
				this.fullscreen = true;
				window.screen.orientation.lock("landscape").then(function(){
					this.landscape = true;
				}).catch(function(err){
					this.landscape = false;
				});
			}).catch((err)=>{
				this.fullscreen = false;
			});
		}else{
			document.exitFullscreen().then(()=>{
				this.fullscreen = false;
			});
		}	
	}
}
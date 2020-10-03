import * as View from "View";

/*
	Loads the Youtube live provided in the URL
	Otherwise defaults to VOD for testing and showcase purposes
*/

export default class UI{
	constructor(streamIDs){
		// Get the id from the URL parameters
		this.matchSettings = {
			video: streamIDs.match
		};
		this.casterSettings = {
			channel: streamIDs.caster
		};
		// If empty, show VOD
		if(this.matchSettings.video == ""){
			this.matchSettings = {
				video: "bqIlL9cv3UU"
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
		// Sync buttons
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

		// Toggle Fullscreen
		document.querySelector("#fullscreen").addEventListener("click", ()=>{
			this.toggleFullscreen();
		});

		// Toggle Settings
		document.querySelector("#open-settings").addEventListener("click", (event)=>{
			document.querySelector("#settings").classList.add("toggled");
		});
		document.querySelector("#close-settings").addEventListener("click", (event)=>{
			document.querySelector("#settings").classList.remove("toggled");
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

		// Hide the chat loader once the iframe is loaded
		document.querySelector("#live-chat-embed").addEventListener("load", (event)=>{
			document.querySelector("#live-chat").classList.remove("is-loading");
		});
	}
	toggleFullscreen(){
		if(!document.fullscreenElement){
			document.body.requestFullscreen().then(()=>{
				window.screen.orientation.lock("landscape").then(()=>{
					this.landscape = true;
				}).catch((err)=>{
					this.landscape = false;
				});
			}).catch((err)=>{

			});
		}else{
			document.exitFullscreen().then(()=>{

			});
		}	
	}
}
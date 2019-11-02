/*
	Creates a Twitch player
	Handles API calls, resize events, loading animations
*/

class TwitchView{
	constructor(domElementID, playbackSettings){
		this.domElement = document.querySelector("#"+domElementID);
		this.isInSyncMode = false;
		this.playbackSettings = playbackSettings;
		this.playerOptions = {
			width: this.domElement.offsetWidth,
			height: this.domElement.offsetHeight,
			controls: false
		};
		if(playbackSettings.video) this.playerOptions.video = playbackSettings.video;
		if(playbackSettings.channel) this.playerOptions.channel = playbackSettings.channel;
		this.player = new Twitch.Player(domElementID, this.playerOptions);
		this.registerListeners();
		this.sync(false);
	}
	togglePause(){
		if(this.player.isPaused()){
			this.player.play();
			document.querySelector("#caster-control").classList.remove("paused");
		}else{
			this.player.pause();
			document.querySelector("#caster-control").classList.add("paused");
		}
	}
	setSize(){
		this.player.setWidth(this.domElement.offsetWidth);
		this.player.setHeight(this.domElement.offsetHeight);
	}
	registerListeners(){
		this.player.addEventListener(Twitch.Player.READY, ()=>{
		});
		this.player.addEventListener(Twitch.Player.PLAYING, ()=>{
			if(this.playbackSettings.timestamp){
				this.player.seek(this.playbackSettings.timestamp);
			}
			document.querySelector("#caster-volume").value = this.player.getVolume() * 100;
			this.hideLoader();
			this.populateQualitySettings();
		});
		this.player.addEventListener(Twitch.Player.PLAYBACK_BLOCKED, ()=>{
			console.log("PLAYBACK_BLOCKED");
		});
		document.querySelector("#caster-volume").addEventListener("input", (event)=>{
			this.player.setVolume(event.srcElement.value/100);
			this.player.setMuted(false);
		});
		document.querySelector("#mobile-caster-volume").addEventListener("input", (event)=>{
			this.player.setVolume(event.srcElement.value/100);
			this.player.setMuted(false);
		});
		document.querySelector("#volume-toggle").addEventListener("click", ()=>{
			document.querySelector("#mobile-volume-control").classList.toggle("toggled");
		});
		window.addEventListener("resize", ()=>{
			this.setSize();
		});
	}
	hideLoader(){
		this.domElement.classList.remove("is-loading");
	}
	populateQualitySettings(){
		let qualities = this.player.getQualities();
		let currentQuality = this.player.getQuality();
		let qualitiesHTML = "";
		qualities.forEach((qualitySetting)=>{
			if(currentQuality == qualitySetting.group){
				qualitiesHTML += `<li class="active" data-setting="${qualitySetting.group}">${qualitySetting.name}</li>`;
			}else{
				qualitiesHTML += `<li data-setting="${qualitySetting.group}">${qualitySetting.name}</li>`;
			}
		});
		document.querySelector("#twitch-quality-options").innerHTML = qualitiesHTML;
		document.querySelectorAll("#twitch-quality-options li").forEach((item)=>{
			item.addEventListener("click", (event)=>{
				this.setQuality(event.srcElement.getAttribute("data-setting"), event.srcElement);
			});
		});
	}
	setQuality(quality, element){
		document.querySelectorAll("#twitch-quality-options li").forEach((item)=>{
			item.classList.remove("active");
		});
		element.classList.add("active");
		this.player.setQuality(quality);
	}
	sync(value){
		if(value){
			this.isInSyncMode = true;
			this.domElement.classList.add("timer-focus");
			this.domElement.classList.remove("caster-focus");
		}else{
			this.isInSyncMode = false;
			this.domElement.classList.add("caster-focus");
			this.domElement.classList.remove("timer-focus");
		}
		this.setSize();
	}
}

/*
	Creates a Youtube player
	Handles API calls, resize events, loading animations
*/

class YoutubeView{
	constructor(domElementID, playbackSettings){
		this.domElement = document.querySelector("#"+domElementID).parentElement;
		this.isInSyncMode = false;
		this.playbackSettings = playbackSettings;
		this.playerOptions = {
			width: this.domElement.offsetWidth,
			height: this.domElement.offsetWidth*(9/16),
			videoId: playbackSettings.video,
			events: {
				"onReady": this.onPlayerReady,
				"onStateChange": this.onPlayerStateChange
			}
		};
		this.player = new YT.Player(domElementID, this.playerOptions);
		this.registerListeners();
	}
	togglePause(){
		if(this.player.getPlayerState() == YT.PlayerState.PAUSED){
			this.player.playVideo();
			document.querySelector("#game-control").classList.remove("paused");
		}else{
			this.player.pauseVideo();
			document.querySelector("#game-control").classList.add("paused");
		}
	}
	setSize(){
		this.player.setSize(this.domElement.offsetWidth, this.domElement.offsetWidth*(9/16));
	}
	registerListeners(){
		this.player.addEventListener("onReady", (event)=>{
			this.player.playVideo();
			this.player.mute();
			if(this.playbackSettings.timestamp) this.player.seekTo(this.playbackSettings.timestamp);
		});
		this.player.addEventListener("onStateChange", (event)=>{
			if(event.data == YT.PlayerState.PLAYING){
				this.hideLoader();
			}
		});
		window.addEventListener("resize", ()=>{
			this.setSize();
		});
	}
	hideLoader(){
		this.domElement.classList.remove("is-loading");
	}
	sync(value){
		if(value){
			this.isInSyncMode = true;
			this.domElement.classList.add("timer-focus");
			this.domElement.classList.remove("game-focus");
		}else{
			this.isInSyncMode = true;
			this.domElement.classList.add("game-focus");
			this.domElement.classList.remove("timer-focus");
		}
		this.setSize();
	}
}

export { TwitchView, YoutubeView };
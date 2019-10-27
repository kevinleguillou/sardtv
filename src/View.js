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
		});
		this.player.addEventListener(Twitch.Player.PLAYBACK_BLOCKED, ()=>{
			console.log("PLAYBACK_BLOCKED");
		});
		document.querySelector("#caster-volume").addEventListener("input", (event)=>{
			this.player.setVolume(event.srcElement.value/100);
			this.player.setMuted(false);
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
			this.domElement.classList.remove("caster-focus");
		}else{
			this.isInSyncMode = false;
			this.domElement.classList.add("caster-focus");
			this.domElement.classList.remove("timer-focus");
		}
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
	}
}

export { TwitchView, YoutubeView };
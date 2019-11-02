import UI from "UI";
import TwitchAPI from "TwitchAPI";

function waitForTwitch(){
	return new Promise((resolve)=>{
		if(window.Twitch != undefined){
			resolve();
		}else{
			setTimeout(()=>{
				waitForTwitch().then(()=>{
					resolve();
				});
			}, 300);
		}
	});
}

window.onYouTubeIframeAPIReady = ()=>{
	waitForTwitch().then(()=>{
		let ui = new UI;
	});
}

let twitchApi = new TwitchAPI;
twitchApi.updateViewerCount();
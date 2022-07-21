import UI from "UI";

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
		let ui = new UI({
			match: "otplol_",
			caster: "sardoche",
		});
	});
}
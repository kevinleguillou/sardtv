export default class TwitchAPI{
	constructor(){
		this.clientID = "w7noco2018pomibp0cc07rhewamy6k";
		this.url = "https://api.twitch.tv/helix/streams?user_login=bobross";

		this.settings = {
			headers: { "Client-ID" : this.clientID }
		};
	}
	updateViewerCount(){
		fetch(this.url, this.settings).then((result)=>{
			result.json().then((json)=>{
				if(json.data.length > 0){
					document.querySelector("#viewer-count").innerText = json.data[0].viewer_count;
				}
				setTimeout(()=>{ this.updateViewerCount() }, 5*60*1000);
			});
		});
	}
}
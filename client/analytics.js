let ready = true;

if(typeof window == 'undefined' || !window.mixpanel){
	//console.log('Mixpanel not configured properly.')
	ready = false;
}



const mp = {
	track : (event, data)=>{
		if(!ready) return;
		console.log('sending event', event)
		mixpanel.track(event, data);
	},

	fetchEvent : ()=>{
		mp.track('fetch_logs', {});
	},
	clickCounter : (user)=>{
		mp.track('counter_clicked', {
			user
		});
	}
}

module.exports = mp;
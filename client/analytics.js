let ready = true;

if(typeof window == 'undefined' || !window.mixpanel){
	console.log('Mixpanel not configured properly.')
	ready = false;
}

const mp = {
	snippet : `


	`,


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
	},
	min3: ()=>{
		setTimeout(()=>{
			mp.track('3_minutes_on_page')
		}, 3 * 60 * 1000)
	}
}

module.exports = mp;
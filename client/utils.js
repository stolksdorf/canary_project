
const qs = {
	get : (url)=>Object.fromEntries((url.split('?')[1]||'').split('&').map((c) => c.trim().split('=').map(decodeURIComponent))),
	set : (url, obj)=>url.split('?')[0] + '?' + Object.entries(obj).map(([v,k])=>`${k}=${encodeURIComponent(v)}`).join('&'),
	add : (url, obj)=>qs.set(url, {...qs.get(url, obj), ...obj}),
};

const request = async (method, url, data={}, options={})=>{
	const {headers, ...opts}=options;
	if(method=='GET') url = qs.add(url, data);
	return fetch(url, {
		method, headers: {'Content-Type':'application/json', ...headers},
		body : method!='GET' ? JSON.stringify(data) : undefined,
		...opts,
	}).then(res=>{
		return res.text().then(data=>{
			try{res.data=JSON.parse(data);}catch(err){res.data=data;}
			if(!res.ok) throw res;
			return res;
		})
	});
};
request.get  = request.bind(null, 'GET');
request.post = request.bind(null, 'POST');
request.del  = request.bind(null, 'DELETE');
request.put  = request.bind(null, 'PUT');


module.exports = {
	qs, request
}
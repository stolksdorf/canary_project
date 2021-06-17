
const qs = {
	get : (url)=>Object.fromEntries((url.split('?')[1]||'').split('&').map((c) => c.trim().split('=').map(decodeURIComponent).reverse())),
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


let cookies = {
	all : ()=>Object.fromEntries(document.cookie.split(';').map((c) => c.trim().split('=').map(decodeURIComponent))),
	get : (name)=>cookies.all()[name],
	set : (name, val, opts={})=>document.cookie = `${name}=${val}; ${Object.entries(opts).map(([v,k])=>`${k}=${v}`).join('; ')}`,
	del : (name)=>document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`,
};
if(typeof document === 'undefined'){
	cookies = {all : ()=>{}, get : ()=>{}, set : ()=>{}, del : ()=>{}}
}

module.exports = {
	qs, request, cookies
}
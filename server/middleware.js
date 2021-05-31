const config = require('../config');

module.exports = {
	auth : (req, res, next)=>{

		const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
		const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');
		const allowed = Object.entries(config.get('auth')).some(([usr, pass])=>user == usr && pass == password);
		if(allowed) return next();

		res.set('WWW-Authenticate', 'Basic realm="401"');
		return res.status(401).send('Authentication required.');
	}
}
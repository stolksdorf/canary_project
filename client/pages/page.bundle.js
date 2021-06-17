const DEV_MODE = !!process.argv.slice(2).find(x=>x=='--dev');

const path = require('path');
const fs = require('fs');
const pack = require(`${process.cwd()}/libs/pico-pack.js`);
const { render } = require(`${process.cwd()}/libs/xo.js`);

let lr;
if(DEV_MODE){
	lr = require('livereload').createServer();
	console.log('⚙ DEV MODE ACTIVE ⚙');
}

const AssetTransform = (code, fp, global)=>{
	const staticDirectory = 'assets';
	const _path = path.relative(process.cwd(), fp).replaceAll('\\', '/');
	const newPath = path.join(process.cwd(), staticDirectory, _path);
	fs.mkdirSync(path.dirname(newPath), {recursive: true});
	fs.copyFileSync(fp, newPath);
	return `module.exports='/${_path}';`
};


module.exports = {
	render,
	bundle: (pathToFile, func)=>{
		const result = pack(pathToFile, {
			global : { css : {}, headtags: {} },
			transforms : {
				'*' : AssetTransform
			},
			watch : DEV_MODE ? (res, fp)=>{
				if(fp){
					console.log(`${path.relative(process.cwd(), fp)} changed`, `Re-bundling: ${pathToFile}`);
				}
				func(res);
				lr.refresh(fp);
			} : false
		});
		return func(result);
	},
	cacheOnce : (func)=>{
		let lastArgs, lastResult;
		return (...args)=>{
			const key = JSON.stringify(args);
			if(lastArgs !== key){
				lastArgs = key;
				lastResult = func(...args);
			}
			return lastResult;
		}
	}
};
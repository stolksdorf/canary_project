const { bundle, cacheOnce } = require ('../bundle.js');
const { render } = require('../../libs/xo.js');


let AdminBundle;
bundle('./admin/admin.js', (packed)=>AdminBundle = packed);

module.exports = (...args)=>{
	return  `<!DOCTYPE html>
	<html>
	<head>
		<!--<script src="https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js"></script>-->

		<link href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
		<style>${Object.values(AdminBundle.global.css).join('\n')}</style>
		${Object.values(AdminBundle.global.headtags).join('\n')}
		<script>${Object.keys(AdminBundle.global).map(key=>`window.${key}={};`).join('')}</script>
	</head>
	<body>${render(AdminBundle.export(...args))}</body>
	<script>${AdminBundle.bundle}</script>
	<script>xo.render(document.body.children[0], window.main())</script>
	</html>`;
};
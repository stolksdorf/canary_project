const { bundle, cacheOnce } = require ('../bundle.js');
const { render } = require('../../libs/xo.js');


let MainBundle;
bundle('./main/main.js', (packed)=>MainBundle = packed);

module.exports = (...args)=>{
	return  `<!DOCTYPE html>
	<html>
	<head>
		<!--<script src="https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js"></script>-->

		<link href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
		<style>${Object.values(MainBundle.global.css).join('\n')}</style>
		${Object.values(MainBundle.global.headtags).join('\n')}
		<script>${Object.keys(MainBundle.global).map(key=>`window.${key}={};`).join('')}</script>
	</head>
	<body>${render(MainBundle.export(...args))}</body>
	<script>${MainBundle.bundle}</script>
	<script>xo.render(document.body.children[0], window.main())</script>
	</html>`;
};
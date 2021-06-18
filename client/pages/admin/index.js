const { bundle, cacheOnce, render } = require ('../page.bundle.js');

const {
	headtags,
	style,
	config,
	imports,
	mixpanel,
	globals
} = require('../page.extras.js');

let Bundle;
bundle('./admin/admin.page.js', (packed)=>Bundle = packed);

module.exports = (...args)=>{
	return `<!DOCTYPE html>
<html>
	<head>
		${imports()}
		${style(Bundle)}
		${headtags(Bundle)}
		${globals(Bundle)}
		${config()}
		${mixpanel()}
	</head>
	<body>${render(Bundle.export(...args))}</body>
	<script>${Bundle.bundle}</script>
	<script>xo.render(document.body.children[0], window.main(...${JSON.stringify(args)}))</script>
</html>`;
};
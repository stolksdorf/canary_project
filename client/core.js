const css = require('../libs/pico-css.js');
const {fade, darken, lighten} = require('../libs/chroma.js');

const { comp, x, cx, keymap } = require('../libs/xo.js');


const colors = {
	yellow :' #f0dfaf',
	purple :' #bfbdd0',
	black  : '#3f3f3f',
	white  : '#f0dfaf',
	green  : '#7f9f7f',
	grey   : '#4f4f4f',
	orange : '#dfaf8f',
	red    : '#cc9393',
	blue   : '#7cb8bb',
};

global.css.core = css`
	html,body {
		font-size : 16px;
		margin    : 0;
		padding   : 0;
		position  : relative;
	}
	*, * : before, *:after {
		box-sizing : border-box;
	}
	body, h1, h2, h3, h4, h5, h6, p, ol, ul {
		margin      : 0;
		padding     : 0;
		font-weight : normal;
	}

	body,input,textarea{
		font-family      : monospace;
		color            : ${colors.white};
		background-color : ${colors.black};
	}
	.container{
		width     : calc(100% - 60px);
		max-width : 85rem;
		margin    : 0 auto;
	}
`;

module.exports = { css, fade, darken, lighten, comp, x, cx, keymap, colors };

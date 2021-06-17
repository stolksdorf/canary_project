const {css, x, comp, colors, cx, lighten} = require('../core.js');

global.css.chirp = css`
	.Chirp{

	}
`;

const Chirp = comp(function({ text, user, id, created_at, updated_at }){
	return x`<div class='Chirp'>
		${text}
		${user.email}
	</div>`
});

module.exports = Chirp;
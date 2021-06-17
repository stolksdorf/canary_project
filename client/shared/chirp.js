const {css, x, comp, colors, cx, fade} = require('../core.js');

const { formatDistanceToNow } = require('date-fns');


global.css.chirp = css`
	.Chirp{
		padding-bottom : 50px;
		.content{
			position: relative;
			border-radius : 10px;
			background-color: ${fade(colors.blue, 0.7)};
			padding : 20px;
			display: inline-block;

			color : white;
			font-size: 1.5em;

			&:before{
				content       : "";
				width         : 0px;
				height        : 0px;
				position      : absolute;
				border-right  : 8px solid ${fade(colors.blue, 0.7)};
				border-left   : 8px solid transparent;
				border-top    : 8px solid ${fade(colors.blue, 0.7)};
				border-bottom : 8px solid transparent;
				right         : 8px;
				bottom        : -16px;
			}

			&:after{
				content: "🐣";
				position: absolute;
				right: -20px;
				bottom: -30px;
			}

			.info{
				margin-top: 15px;
				text-align: right;
				font-size: 0.9em;
				label{
					display: block;
					font-size: 0.7em;
				}
				small{
					display: block;
					font-size: 0.5em;
				}
			}
		}
	}
`;

const Chirp = comp(function({ text, user, id, created_at, updated_at }){
	return x`<div class='Chirp'>
		<div class='content'>
			${text}
			<div class='info'>
				<label>${user.name}</label>
				<small>${formatDistanceToNow(new Date(created_at))} ago</small>
			</div>
		</div>
	</div>`
});

module.exports = Chirp;
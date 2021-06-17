const {css, x, comp, colors, cx, lighten} = require('../core.js');

const { cookies } = require('../utils.js');

global.css.tipbox = css`
	.TipBox{
		position : relative;
		border   : 1px solid ${colors.white};
		padding  : 10px;

		.hideBtn{
			position : absolute;
			cursor   : pointer;
			&:hover{
				color : ${colors.red};
			}
			top   : 10px;
			right : 10px;
		}
	}
`;

const TipBox = comp(function(id, content){
	const [show, setShow] = this.useState(!cookies.get(`hide-${id}`));
	const hide = ()=>{
		cookies.set(`hide-${id}`, true);
		setShow(false)
	}
	if(!show) return null;
	return x`<div class='TipBox'>
		<i class='fa fa-times hideBtn' onclick=${hide}></i>
		${content}
	</div>`
});

module.exports = TipBox;
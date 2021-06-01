const {css, x, comp, colors, cx} = require('../core.js');

const mp = require('../analytics.js');


global.css.user = css`

.User{
	&.heavy{
		background-color: ${colors.red};
	}
}

`;


const User = comp(function(name){
	const [counter, setCounter] = this.useState(0);

	const handleClick = ()=>{
		mp.clickCounter(name);
		setCounter(counter + 1);
	};

	return x`<div class=${cx('User', {heavy : counter > 5})} onclick=${handleClick}>
		${name}
		Times clicked : ${counter}
	</div>`
});

module.exports = User;
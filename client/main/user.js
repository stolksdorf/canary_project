const {css, x, comp, colors, cx} = require('../core.js');


global.css.user = css`

.User{
	&.heavy{
		background-color: ${colors.red};
	}
}

`



const User = comp(function(name){
	const [counter, setCounter] = this.useState(0);


	return x`<div class=${cx('User', {heavy : counter > 5})} onclick=${()=>setCounter(counter + 1)}>
		${name}
		Times clicked : ${counter}
	</div>`
});

module.exports = User;
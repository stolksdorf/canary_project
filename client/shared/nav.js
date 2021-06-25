const {css, x, comp, colors, cx, lighten} = require('../core.js');

const navHeight = 60;

global.css.navbar = css`
	nav.Nav{
		border-bottom : 1px solid ${colors.dark_grey};
		height : ${navHeight}px;


		.container{
			display         : flex;
			justify-content : space-between;
			align-items     : center;
			height : 100%;
		}

		.items{
			height : ${navHeight}px;
			.navItem{
				display     : inline-block;
				height      : ${navHeight}px;
				line-height : ${navHeight}px;

				color : ${colors.white};
				text-decoration: none;
				padding : 0px 10px;

				&:hover{
					background-color: ${lighten(colors.black, 0.15)};
				}
			}
		}
	}
`;

const Nav = comp(function(user){
	const isAdmin = !!user && user.groups.includes('admin');

	return x`<nav class='Nav'>
		<div class='container'>
			🐤 Canary Project

			<div class='items'>

				<a href='/' class='navItem'>
					<i class="fa fa-home"></i> Home
				</a>

				${global.config.stripe_donate_link &&
					x`<a class='navItem' target='_blank' href=${global.config.stripe_donate_link}>
						<i class="fa fa-heart"></i> Donate
					</a>`
				}

				${isAdmin &&
					x`<a href='/admin' class='navItem'>
						<i class="fa fa-lock"></i> Admin Panel
					</a>`
				}


				${!user &&
					x`<a href='/login' class='navItem'>
						<i class="fa fa-sign-in"></i> Login
					</a>`
				}

				${user &&
					x`<a href='/logout' class='navItem'>
						<i class="fa fa-sign-out"></i> Logout
					</a>`
				}

				${user &&
					x`<a href='/profile' class='navItem'>
						Welcome ${user.given_name}!
					</a>`
				}
			</div>
		</div>
	</nav>`
});



module.exports = Nav;
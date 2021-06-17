const {css, x, comp, colors, cx} = require('../../core.js');

const { request } = require('../../utils.js');

global.headtags.title = '<title>Profile - Canary Project</title>';
global.css.profile_page = css`
	.Profile{
		.content.container{
			margin-top : 3em;
			display : flex;
			flex-direction: row;

			aside{
				width : 29%;
				min-width : 200px;
				margin-right : 1em;
			}
			main{
				width : 70%;
			}
		}

		.profile_popup{
			font-size: 0.8em;
			p{
				margin-top: 1em;
			}
		}

		.Stats{
			border: 1px solid ${colors.blue};
			border-radius : 5px;

			padding : 10px;
			margin : 15px 0px;
		}
	}
`;


const Nav = require('../../shared/nav.js');
const Chirp = require('../../shared/chirp.js');
const TipBox = require('../../shared/tipbox.js');
const NewChirpBox = require('../../shared/newChirp.js');



const ProfileTips = TipBox('profile', x`<div class='profile_popup'>
	<h2>Your Profile Page</h2>
	<p>
		This is your profile page.
	</p>
</div>`);


const Stats = comp(function(chirps){


	return x`<div class='Stats'>
		<h3>Your Stats</h3>
	</div>`
});




const ProfilePage = comp(function({ user }){
	const getUserChirps = this.useAsync(async ()=>{
		const {data} = await request.get(`/api/chirps/user/${user.sub}`);
		return data;
	}, [])

	this.useEffect(()=>{
		getUserChirps();
		window.refreshChirps = getUserChirps
	}, [])


	return x`<div class='Profile'>
		${Nav(user)}
		<div class='content container'>
			<aside>
				${ProfileTips}
				${Stats()}
				${NewChirpBox()}
			</aside>
			<main>
				<h1>${user.name}'s Profile</h1>
				<h3>
					Your Chirps
					<button onclick=${getUserChirps}>
						${getUserChirps.pending
							? x`<i class='fa fa-spinner fa-spin'></i>`
							: x`<i class='fa fa-refresh'></i>`
						}
					</button>
				</h3>
				${getUserChirps.result.map(Chirp)}
			</main>
		</div>
	</div>`
})


module.exports = ProfilePage
const {css, x, comp, colors, cx} = require('../../core.js');

const { request } = require('../../utils.js');

global.headtags.title = '<title>Home - Canary Project</title>';

//global.css.lattice = require('../../lattive/style.js');

global.css.home_page = css`
	.Home{
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

		.welcome_popup{
			font-size: 0.8em;
			p{
				margin-top: 1em;
			}
		}

		.ChirpList{
			button{
				font-size: 1.3em;
			}
		}

	}
`;

const Nav = require('../../shared/nav.js');
const Chirp = require('../../shared/chirp.js');
const TipBox = require('../../shared/tipbox.js');
const NewChirpBox = require('../../shared/newChirp.js');



const ChirpList = comp(function(){
	const fetchChirps = this.useAsync(async (count=this.refs.count)=>{
		const {data} = await request.get(`/api/chirps/latest?count=${count}`);
		return data;
	}, [])

	const loadMore = ()=>{
		this.refs.count += 5;
		fetchChirps(this.refs.count);
	};

	this.useEffect(()=>{
		this.refs.count = 5;
		fetchChirps(this.refs.count);
		global.refreshChirps = fetchChirps;
	}, [])

	const chirps = fetchChirps.result;
	return x`<div class='ChirpList'>
		${chirps.map(chirp=>Chirp(chirp))}
		<button onclick=${()=>loadMore()}>
			${fetchChirps.pending
				? x`<i class='fa fa-spinner fa-spin'></i>`
				: 'Load More'
			}
		</button>
	</div>`
});




const Welcome = TipBox('welcome', x`<div class='welcome_popup'>
	<h2>Welcome!</h2>
	<p>
		This is a canary project. It's a demo project showcasing many features of web apps
	</p>
	<p>
		Here we have created a pseudo-twitter clone where user's can 'chirp' out updates. There's a profile page to remove your own chirps, as well as an admin page to manage all 'chirps'
	</p>
	<p>
		It's using Okta for accounts, Postgres for a database, and hosted on Heroku.
	</p>
</div>`)




const Home = comp(function({ user }){
	this.useEffect(()=>{
		mixpanel.track('Home page');
		if(user) mixpanel.identify(user.sub);
	}, []);

	return x`<div class='Home'>
		${Nav(user)}
		<div class='content container'>
			<aside>
				${Welcome}
				${!!user && NewChirpBox(global.refreshChirps)}
			</aside>
			<main>
				<h1>Latest Chirps</h1>
				${ChirpList()}
			</main>
		</div>
	</div>`
});

module.exports = Home;
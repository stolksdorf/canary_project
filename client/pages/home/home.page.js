const {css, x, comp, colors, cx} = require('../../core.js');

const { request } = require('../../utils.js');

global.headtags.title = '<title>Home - Canary Project</title>';

//global.css.lattice = require('../../lattive/style.js');

global.css.home_page = css`
	.Home{

	}
`;

const Nav = require('../../shared/nav.js');
const Chirp = require('../../shared/chirp.js');

const TipBox = require('../../shared/tipbox.js');


const ChirpList = comp(function(){
	const [chirps, setChirps] = this.useState([]);

	const fetch = async ()=>{
		const {data} = await request.get(`/api/chirps/latest?count=${this.refs.count}`)
		setChirps(data);
	}
	const loadMore = ()=>{
		this.refs.count += 3;
		fetch();
	};

	this.useEffect(()=>{
		this.refs.count = 3;
		fetch();
		window.refreshList = fetch;
	}, [])


	return x`<div class='ChirpList'>
		${chirps.map(Chirp)}
		<button onclick=${()=>loadMore()}>Load More</button>
	</div>`
});




const Welcome = TipBox('welcome', x`<div>
	<h2>Welcome!</h2>
	<p> This is a canary project </p>
</div>`)




global.css.new_chirp_box = css`
	.NewChirpBox{

		.errors{
			color : ${colors.red};
		}

	}
`


const NewChirpBox = comp(function(){
	const [pending, setPending] = this.useState(false);
	const [errors, setErrors] = this.useState(null);
	const [content, setContent] = this.useState('');

	const submit = async ()=>{
		setPending(true);
		setErrors(null);
		request.post('/api/chirps/create', {
			text : content
		}).then((res)=>{
			setContent('');
			if(typeof window.refreshList == 'function') window.refreshList();
		})
		.catch(({data})=>{
			setErrors(data);
		})
		.finally(()=>{
			setPending(false);
		})
	};

	const handleInput = (evt)=>{
		setContent(evt.target.value)
	}

	const ready = content !== '' && !pending;

	return x`<div class='NewChirpBox'>
		<textarea value=${content} oninput=${handleInput}></textarea>
		${errors && x`<div class='errors'>${errors}</div>`}
		<button onclick=${submit} oninput=${handleInput} disabled=${!ready}>
			${pending
				? x`<i class='fa fa-spinner fa-spin'></i>`
				: 'Chirp!'
			}
		</button>
	</div>`
});


const Home = comp(function({ user }){
	return x`<div class='Home'>
		${Nav(user)}
		<main>
			${Welcome}
			Home Page!
			${ChirpList()}

			${!!user && NewChirpBox()}
		</main>
	</div>`
});

module.exports = Home;
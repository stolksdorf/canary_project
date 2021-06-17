const {css, x, comp, colors, cx, fade} = require('../core.js');

const { request } = require('../utils.js');


global.css.new_chirp_box = css`
	.NewChirpBox{
		border: 1px solid ${colors.green};
		border-radius : 5px;

		padding : 10px;
		margin : 15px 0px;

		textarea{
			width : 100%;
			resize: none;
			height : 4em;
			margin: 10px 0px;
		}

		.errors{
			color : ${colors.red};
		}

	}
`;

const NewChirpBox = comp(function(onCreate=()=>{}){
	const [content, setContent] = this.useState('');
	const createChirp = this.useAsync(async (text)=>{
		return request.post('/api/chirps/create', { text })
			.then(()=>{
				setContent('');
				onCreate();
				if(typeof window.refreshChirps == 'function') window.refreshChirps();
			})
	});

	const submit = ()=>{
		createChirp(content);
	};

	const handleInput = (evt)=>{
		setContent(evt.target.value)
	}

	const ready = content !== '' && !createChirp.pending;

	return x`<div class='NewChirpBox'>
		<h3> Create a new Chirp </h3>

		<textarea value=${content} oninput=${handleInput}></textarea>

		${createChirp.errors && x`<div class='errors'>${createChirp.errors.data || createChirp.errors}</div>`}

		<button onclick=${submit} oninput=${handleInput} disabled=${!ready}>
			${createChirp.pending
				? x`<i class='fa fa-spinner fa-spin'></i>`
				: 'Chirp!'
			}
		</button>
	</div>`
});

module.exports = NewChirpBox;
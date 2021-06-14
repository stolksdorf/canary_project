const {css, x, comp, colors, cx} = require('../core.js');

global.headtags.title = `<title>Canary Main Page</title>`;

global.css.admin = css`
	.Main{
		padding : 30px;

		h1.hover{
			color : ${colors.blue};
		}

		.error{
			border: 1px solid ${colors.red};
			color: ${colors.red};
			padding : 20px;
		}
	}
`;




const { request } = require('../utils.js');

const User = require('./user.js');

const Main = comp(function(){
	const [logs, setLogs]       = this.useState([]);
	const [pending, setPending] = this.useState(false);
	const [error, setError]     = this.useState(null);

	const [isHovered, setIsHovered] = this.useState(false);

	
	
	this.useEffect(()=>{
		fetchLogs();
	}, []);

	this.useEffect(()=>{
		if(isHovered) handleAnalytics();
	}, [isHovered]);

	const handleAnalytics = ()=>{
		console.log('HOVERED');
	}

	const fetchLogs = ()=>{
		setPending(true);
		setError(null);
		request.get('/api/logs')
			.then(({data})=>{
				setLogs(data);
				setPending(false);
			})
			.catch((err)=>{
				setError(err.data);
				setPending(false);
			})
	}

	return x`<div class='Main'>
		<div class='container'>
			<h1
				class=${cx({hover : isHovered})}
				onmouseenter=${()=>setIsHovered(true)}
				onmouseleave=${()=>setIsHovered(false)}
			>Main Page</h1>

			<button onclick=${()=>fetchLogs()}>Fetch Logs</button>
			${pending && x`<i class='fa fa-spinner fa-spin'></i>`}

			<p>log count: ${logs.length}</p>
			<h3>Logs</h3>
			<div class='logs'>
				${logs.map(log=>{
					return x`<div class='log'>
						<span class='id'>${log.id}</span>
						<span class='msg'>${log.msg}</span>
						<span class='ts'>${log.ts.toString()}</span>
					</div>`
				})}
			</div>

			${User('brad')}
			${User('scott')}

			YOOOO


			${error && x`<div class='error'>
				${error.toString()}
			</div>`}
		</div>
	</div>`
});

module.exports = Main;

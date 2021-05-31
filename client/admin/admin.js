const {css, x, comp, colors} = require('../core.js');


global.headtags.title = `<title>Canary Admin Page</title>`;

global.css.admin = css`
	.Admin{
		padding : 20px;

		.log{
			&>span{
				display: inline-block;
				padding : 0px 3px;
				border-right: 1px solid ${colors.white};
			}

			span.remove{
				cursor: pointer;
				&:hover{
					color : ${colors.red};
				}
			}
		}
	}
`;

const { request } = require('../utils.js');


const Admin = comp(function(){
	const [logs, setLogs] = this.useState([]);
	const [pending, setPending] = this.useState(false);
	const [error, setError] = this.useState(null);

	this.useEffect(()=>{
		fetchLogs();
	}, []);

	const fetchLogs = ()=>{
		setPending(true);
		setError(null);
		request.get('/api/logs')
			.then(({data})=>{
				setLogs(data);
				setPending(false);
			})
			.catch((err)=>{
				setError(err);
				setPending(false);
			})
	};

	const addLog = ()=>{
		const msg = prompt('Enter the log message');
		setPending(true);
		setError(null);
		request.post('/api/logs', {msg})
			.then(({data})=>{
				fetchLogs();
			})
			.catch((err)=>{
				setError(err);
				setPending(false);
			})
	}

	const removeLog = (id)=>{
		setPending(true);
		setError(null);
		request.del(`/api/logs/${id}`)
			.then(({data})=>{
				fetchLogs();
			})
			.catch((err)=>{
				setError(err);
				setPending(false);
			})
	};


	return x`<div class='Admin'>
		<h1><i class='fa fa-key'></i> Admin Page</h1>
		<p>You made it bb</p>

		<button onclick=${()=>addLog()}>Add Log</button>

		${pending && x`<i class='fa fa-spinner fa-spin'></i>`}


		<h3>Logs</h3>
		<div class='logs'>
			${logs.map(log=>{
				return x`<div class='log'>
					<span class='id'>${log.id}</span>
					<span class='msg'>${log.msg}</span>
					<span class='ts'>${log.ts.toString()}</span>
					<span class='remove' onclick=${()=>removeLog(log.id)}><i class='fa fa-times'></i></span>
				</div>`
			})}

		</div>
	</div>`
});

module.exports = Admin;
const {css, x, comp, colors, cx, lighten} = require('../../core.js');

const { request } = require('../../utils.js');


global.headtags.title = '<title>Admin Panel - Canary Project</title>';


const bgStripes = (color1, color2, width=20)=>{
	return `repeating-linear-gradient(45deg, ${color1}, ${color1} ${width}px, ${color2} 5px, ${color2} ${width*2}px)`
}


global.css.admin_page = css`
	.Admin{
		background : ${bgStripes(colors.black, lighten(colors.black, 0.03))};
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

				input{
					margin: 15px 0px;
					font-size: 1.2em;
				}

			}
		}
	}
`;


const Nav = require('../../shared/nav.js');
const Chirp = require('../../shared/chirp.js');
const TipBox = require('../../shared/tipbox.js');


const AdminTips = TipBox('admin', x`<div class='admin_popup'>
	<h2>Admin Tips</h2>
	<p>
		From here you can see all chirps, and remove any of them that you want.
	</p>
</div>`);


const textHas = (field, search)=>field.toLowerCase().indexOf(search.toLowerCase())!==-1


const AdminPage = comp(function({ user }){
	const getAllChirps = this.useAsync(async ()=>{
		const {data} = await request.get(`/api/chirps/all`);
		return data;
	}, []);

	this.useEffect(()=>{
		getAllChirps();
		window.refreshChirps = getAllChirps
	}, []);

	const [search, setSearch] = this.useState('');


	const chirps = getAllChirps.result.filter(chirp=>{
		if(!search) return true;
		return textHas(chirp.text, search) || textHas(chirp.user.name, search);
	})
	return x`<div class='Admin page'>
		${Nav(user)}
		<div class='content container'>
			<aside>
				${AdminTips}
			</aside>
			<main>
				<h1>Admin Panel</h1>

				<div class='search'>
					<input
						type='text'
						value=${search}
						placeholder="Chirp Search"
						oninput=${(evt)=>setSearch(evt.target.value)}>
					</input>
				</div>

				<div class='chirps'>
					${chirps.map(chirp=>{
						const triggerDelete = ()=>{
							if(!confirm("Are you sure you want to delete this?")) return;
							return request.post(`/api/chirps/delete/${chirp.id}`)
								.then(()=>{
									getAllChirps();
								})
						}
						return Chirp(chirp, triggerDelete)
					})}

				</div>
			</main>
		</div>
	</div>`;
});



module.exports = AdminPage
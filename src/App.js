import './App.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function App() {
	// should be extracted to .env
	const baseURL = 'http://inspector-hook.com/';

	// add effect hook for fetching requests if cookie contains uuid

	// cookie for bin id
	const [ cookies, setCookie ] = useCookies([ 'binID' ]);
	function handleCookie(binIDFromAPI) {
		setCookie('binID', binIDFromAPI, { path: '/', maxAge: 172800, sameSite: 'strict' });
	}

	const Title = () => {
		return (
			<div>
				<h1>Inspector Hook</h1>
				<p>Create a new bin to collect api requests, or view the requests of a current bin</p>
			</div>
		);
	};

	const NewBin = () => {
		const createNewBin = () => {
			return axios.post('http://localhost:3003/newBin').then((res, rej) => {
				console.log(res.data.binID);
				console.log(rej);
				if (res) {
					return res.data.binID;
				} else {
					console.log(rej);
					return undefined;
				}
			});
		};
		async function handleClick() {
			// query api to create new bin in db
			// receive uuid for new bin
			// set uuid as value for cookie
			let binIDFromAPI = await createNewBin();
			console.log('binIDFromAPI ', binIDFromAPI);
			// let binIDFromAPI = 'This was set with api call';
			handleCookie(binIDFromAPI);
		}
		return (
			<div>
				<h2>Create a new inspector bin:</h2>
				<button onClick={handleClick}>Create Bin</button>
			</div>
		);
	};

	// need separate component for rendering requests for current bin
	// display current url for bin based on cookie
	// refresh button
	//   hit api to view all requests
	// compenentized list of all requests formated from refresh

	const CurrentBin = ({ cookie }) => {
		console.log('currentBin cookie: ', cookie);
		console.log('currentBin binID: ', cookie.binID);

		if (cookie.binID) {
			return (
				<div>
					<h3>Your current bin is at: {baseURL + cookie.binID}</h3>
					<button>View all requests</button>
				</div>
			);
		} else {
			return <h3>You don't have a bin to inspect yet!</h3>;
		}
	};

	return (
		<div className="App">
			<Title />
			<NewBin />
			<CurrentBin cookie={cookies} />
		</div>
	);
}

export default App;

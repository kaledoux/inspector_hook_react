import './App.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
	// should be extracted to .env
	const baseURL = 'http://inspector-hook.com/';

	const [ requests, setrequests ] = useState([]);
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
			return axios
				.post('http://localhost:3003/newBin')
				.then((res) => {
					console.log(res.data.binID);
					return res.data.binID;
				})
				.catch((err) => {
					console.log(err);
					return undefined;
				});
		};

		async function handleClick() {
			// api call to create new bin, set to local
			let binIDFromAPI = await createNewBin();

			console.log('binIDFromAPI ', binIDFromAPI);

			// set cookie value for binID to uuid of bin on api
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

		async function getRequestsForBin(binID) {
			return axios
				.get('http://localhost:3003/' + binID)
				.then((res) => {
					console.log('get requests: ', res.data);
					return res.data;
				})
				.catch((err) => {
					console.log(err);
					return undefined;
				});
		}

		async function setCurrentRequests(binID) {
			let response = await getRequestsForBin(binID);
			console.log('setting :', response.requests);

			setrequests(response.requests);
			console.log('state changed :', requests);
		}

		if (cookie.binID) {
			return (
				<div>
					<h3>Your current bin is at: {baseURL + cookie.binID}</h3>
					<button
						onClick={() => {
							setCurrentRequests(cookie.binID);
						}}
					>
						View all requests
					</button>
				</div>
			);
		} else {
			return <h3>You don't have a bin to inspect yet!</h3>;
		}
	};

	const RequestList = ({ requestState }) => {
		console.log('request list: ', requestState);
		return (
			<div>
				{requestState.map((request) => {
					return <Request data={request} />;
				})}
			</div>
		);
	};

	const Request = ({ data }) => {
		console.log('in Request: ', data);

		return (
			<div>
				<h4 />
				<pre>
					<code>{data.row}</code>
				</pre>
			</div>
		);
	};

	return (
		<div className="App">
			<Title />
			<NewBin />
			<CurrentBin cookie={cookies} />
			<RequestList requestState={requests} />
		</div>
	);
}

export default App;

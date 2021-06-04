import React from 'react';
import axios from 'axios';

// track current bin
const CurrentBin = ({ cookie, currentRequests, setRequests }) => {
	// should be extracted to .env
	const baseURL = 'http://inspector-hook.com/';

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
				throw err;
			});
	}

	async function setCurrentRequests(binID) {
		let response = await getRequestsForBin(binID);
		console.log('setting :', response.requests);

		setRequests(response.requests);
		console.log('state changed :', currentRequests);
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

export default CurrentBin;

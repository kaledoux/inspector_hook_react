import React from 'react';
import axios from 'axios';
import { BASEURL } from '../urls';

// track current bin
const CurrentBin = ({ cookie, currentRequests, setRequests }) => {
	// console.log('currentBin cookie: ', cookie);
	// console.log('currentBin binID: ', cookie.binID);

	async function getRequestsForBin(binID) {
		return axios
			.get('https://inspector-hook.com/api/' + binID)
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
		// console.log('setting :', response.requests);
		setRequests(response.requests);
		// console.log('state changed :', currentRequests);
	}

	if (cookie.binID) {
		return (
			<div>
				<h3>Your current bin is at: {BASEURL + cookie.binID}</h3>
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

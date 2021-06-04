import React from 'react';
import axios from 'axios';
import { APICREATEPOSTURL } from '../urls';

// button to create a new bin uuid on api
const NewBinButton = ({ handleCookie, setRequests }) => {
	console.log('api create url: ', APICREATEPOSTURL);
	// send post request to api to create a new uuid in db
	const createNewBin = () => {
		return axios
			.post('http://localhost:3003/api/newBin')
			.then((res) => {
				console.log(res.data.binID);
				return res.data.binID;
			})
			.catch((err) => {
				console.log(err);
				return undefined;
			});
	};

	// create a new bin and wait for response, then set cookie to new uuid and reset requests state
	async function handleClick() {
		// api call to create new bin, set to local
		let binIDFromAPI = await createNewBin();

		console.log('binIDFromAPI ', binIDFromAPI);

		handleCookie(binIDFromAPI);
		setRequests([]);
	}

	return (
		<div>
			<h2>Create a new inspector bin:</h2>
			<button onClick={handleClick}>Create Bin</button>
		</div>
	);
};

export default NewBinButton;

import './App.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import React, { useState } from 'react';

// components
import Title from './components/Title';
import CurrentBin from './components/CurrentBin';
import NewBinButton from './components/NewBinButton';
import RequestList from './components/RequestList';

function App() {
	const [ requests, setRequests ] = useState([]);
	// add effect hook for fetching requests if cookie contains uuid

	// cookie for bin id
	const [ cookies, setCookie ] = useCookies([ 'binID' ]);
	function handleCookie(binIDFromAPI) {
		setCookie('binID', binIDFromAPI, { path: '/', maxAge: 172800, sameSite: 'strict' });
	}

	return (
		<div className="App">
			<Title />
			<NewBinButton handleCookie={handleCookie} setRequests={setRequests} />
			<CurrentBin cookie={cookies} currentRequests={requests} setRequests={setRequests} />
			<RequestList requestState={requests} />
		</div>
	);
}

export default App;

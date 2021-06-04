import React from 'react';
import logo from '../assets/logo-inspector-hook.png';

// non-interactive title
const Title = () => {
	return (
		<div class="App-header">
			<h1 class="App-logo">Inspector Hook</h1>
			<img src={logo} style={{ width: 320 }} alt="Inspector Hook is watching your webhooks" />
			<p>Create a new bin to collect api requests, or view the requests of a current bin</p>
		</div>
	);
};

export default Title;

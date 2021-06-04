import React from 'react';

// List requests based on state tracking requests for uuid
const RequestList = ({ requestState }) => {
	console.log('request list: ', requestState);
	return (
		<div>
			{requestState.map((request) => {
				return <Request key={request.created_on} data={request} />;
			})}
		</div>
	);
};

const Request = ({ data }) => {
	console.log('in Request: ', data);

	return (
		<div>
			<h4>{data.created_on}</h4>
			{JSON.stringify(data.request, null, 4)}
		</div>
	);
};

export default RequestList;

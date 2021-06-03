import logo from './logo.svg';
import './App.css';

function App() {
	const Title = () => {
		return (
			<div>
				<h1>Inspector Hook</h1>
				<p>Create a new bin to collect api requests, or view the requests of a current bin</p>
			</div>
		);
	};

	const NewBin = () => {
		return (
			<div>
				<h2>Create a new inspector bin:</h2>
				<button>Create Bin</button>
			</div>
		);
	};

	return (
		<div className="App">
			<Title />
			<NewBin />
		</div>
	);
}

export default App;

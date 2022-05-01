import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sA from "./store/session";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sA.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			<Modal />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<h1>Home Page</h1>
					</Route>
					<Route>
						<h1>Error: Page Not Found</h1>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;

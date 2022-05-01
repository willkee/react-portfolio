import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { modalMount } from "./store/modal";

import App from "./App";
import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

const Root = () => {
	const dispatch = useDispatch();
	const modalMountRef = useRef(null);

	useEffect(() => {
		dispatch(modalMount(modalMountRef.current));
	}, [dispatch]);

	return (
		<BrowserRouter>
			<App />
			<div ref={modalMountRef} className="modal"></div>
		</BrowserRouter>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Root />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

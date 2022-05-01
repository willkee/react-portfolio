import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { currentModal, showModal } from "../../store/modal";
import Login from "../Login";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const displayLoginForm = () => {
		dispatch(currentModal(Login));
		dispatch(showModal());
	};

	return (
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
				{isLoaded && sessionUser ? (
					<ProfileButton />
				) : (
					<button onClick={displayLoginForm}>Log In</button>
				)}
			</li>
		</ul>
	);
}

export default Navigation;

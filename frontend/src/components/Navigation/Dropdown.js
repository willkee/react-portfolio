import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sA from "../../store/session";

function NavDropdown() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const openMenu = () => !showMenu && setShowMenu(true);

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<>
			<button onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			{showMenu && (
				<div className="profile-dropdown">
					<div>
						<button onClick={() => dispatch(sA.logout())}>
							Log Out
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default NavDropdown;

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../components/Layout";
import { userInterface } from "../formatters/profileFormatter";

export default function useUser() {
	const { getCurrentUser } = useContext(AuthContext);
	const [currentUser, currentUserSet] = useState({} as userInterface);

	let userInfo = {} as userInterface;
	let fetchCompleted = false;
	function fetchCurrentUser() {
		if (fetchCompleted) return;
		if (userInfo?.id) {
			fetchCompleted = true;
		} else {
			userInfo = getCurrentUser();
		}
		currentUserSet(userInfo);
		setTimeout(fetchCurrentUser, 1000);
	}
	useEffect(() => {
		fetchCurrentUser();
	}, []);

	return currentUser;
}

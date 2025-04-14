import { collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { firestore } from "../../firebaseConfig";
import bcrypt from "bcryptjs";
import { signJwt } from "../../utils/signJwt";
import { verifyJwt } from "../../utils/verifyJwt";
import { updateCurrentUser } from "@firebase/auth";

const userResolver = {
	Query: {},
	Mutation: {
		loginUser: async (
			_: any,
			{ username, password }: { username: string; password: string }
		) => {
			try {
				const userRef = doc(collection(firestore, "USERS"), username);
				const userDoc = await getDoc(userRef);

				if (!userDoc.exists()) {
					throw new Error("Invalid username or password");
				}
				const user = userDoc.data();

				const isPasswordValid = await bcrypt.compare(password, user.password);

				if (!isPasswordValid) {
					throw new Error("Invalid username or password");
				}

				const token = signJwt(username);

				return token;
			} catch (error) {
				throw new Error("Invalid username or password");
			}
		},
		// createUser: async (
		// 	_: any,
		// 	{
		// 		name,
		// 		username,
		// 		password,
		// 	}: { name: string; username: string; password: string }
		// ) => {
		// 	const hashedPassword = await bcrypt.hash(password, 10);
		// 	const userRef = doc(collection(firestore, "USERS"), username);
		// 	await setDoc(userRef, {
		// 		name,
		// 		username,
		// 		password: hashedPassword,
		// 	});
		// 	return { id: username, name, username };
		// },
		updateUser: async (
			_: any,
			{ username, password }: { username: string; password: string },
			context: any
		) => {
			try {
				const userRef = doc(collection(firestore, "USERS"), username);
				const userDoc = await getDoc(userRef);

				if (!userDoc.exists()) {
					throw new Error("User not found");
				}

				const user = userDoc.data();

				if (password) {
					const hashedPassword = await bcrypt.hash(password, 10);
					await setDoc(userRef, { ...user, password: hashedPassword });
				}

				return {
					id: username,
					username,
					success: true,
					message: "Password updated successfully",
				};
			} catch (error) {
				console.error("Error updating password:", error);
				throw new Error(
					"Failed to update password: " + (error as Error).message
				);
			}
		},
		verifyToken: async (_: any, { token }: { token: string }) => {
			try {
				await verifyJwt(token);
				return true;
			} catch (error) {
				return false;
			}
		},
	},
};

export default userResolver;

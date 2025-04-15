import {
	collection,
	doc,
	getDoc,
	setDoc,
	getDocs,
	updateDoc,
} from "@firebase/firestore";
import { firestore } from "../../firebaseConfig";
import bcrypt from "bcryptjs";
import { signJwt } from "../../utils/signJwt";
import { verifyJwt } from "../../utils/verifyJwt";
import { updateCurrentUser } from "@firebase/auth";

const userResolver = {
	Query: {
		getAllUsers: async () => {
			try {
				const usersCollectionRef = collection(firestore, "USERS");
				const usersSnapshot = await getDocs(usersCollectionRef);
				const users = usersSnapshot.docs.map((doc) => {
					const userData = doc.data();
					// Provide default values for any missing required fields
					return {
						id: doc.id,
						name: userData.name || "Unknown",
						email: userData.email || "no-email@example.com",
						username: userData.username || doc.id,
						password: userData.password || "",
						isActive:
							typeof userData.isActive === "boolean" ? userData.isActive : true,
					};
				});
				return users;
			} catch (error) {
				console.error("Error fetching users:", error);
				throw new Error("Failed to fetch users");
			}
		},
	},
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
		createUser: async (
			_: any,
			{
				name,
				email,
				username,
				password,
			}: { name: string; email: string; username: string; password: string }
		) => {
			try {
				const hashedPassword = await bcrypt.hash(password, 10);
				const userRef = doc(collection(firestore, "USERS"), username);
				await setDoc(userRef, {
					name,
					email,
					username,
					password: hashedPassword,
					isActive: true,
				});
				return {
					id: username,
					name,
					username,
					success: true,
					message: "User created successfully",
				};
			} catch (error) {
				console.error("Error creating user:", error);
				throw new Error("Failed to create user");
			}
		},
		updateUser: async (
			_: any,
			{
				username,
				name,
				email,
				password,
			}: { username: string; name?: string; email?: string; password?: string },
			context: any
		) => {
			try {
				const userRef = doc(collection(firestore, "USERS"), username);
				const userDoc = await getDoc(userRef);

				if (!userDoc.exists()) {
					throw new Error("User not found");
				}

				const user = userDoc.data();
				const updates: Record<string, any> = {};

				// Only update fields that are provided
				if (name) updates.name = name;
				if (email) updates.email = email;

				if (password) {
					const hashedPassword = await bcrypt.hash(password, 10);
					updates.password = hashedPassword;
				}

				// Only update if there are changes
				if (Object.keys(updates).length > 0) {
					await updateDoc(userRef, updates);
				}

				return {
					id: username,
					username,
					success: true,
					message: "User updated successfully",
				};
			} catch (error) {
				console.error("Error updating user:", error);
				throw new Error("Failed to update user: " + (error as Error).message);
			}
		},
		deactivateUser: async (_: any, { id }: { id: string }) => {
			try {
				const userRef = doc(firestore, "USERS", id);
				await updateDoc(userRef, { isActive: false });
				return { id, success: true, message: "User deactivated successfully" };
			} catch (error) {
				console.error("Error deactivating user:", error);
				throw new Error("Failed to deactivate user");
			}
		},
		activateUser: async (_: any, { id }: { id: string }) => {
			try {
				const userRef = doc(firestore, "USERS", id);
				await updateDoc(userRef, { isActive: true });
				return { id, success: true, message: "User activated successfully" };
			} catch (error) {
				console.error("Error activating user:", error);
				throw new Error("Failed to activate user");
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

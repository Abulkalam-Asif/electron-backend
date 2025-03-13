import { collection, doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../firebaseConfig";
import bcrypt from "bcryptjs";
import { signJwt } from "../../utils/signJwt";
import { verifyJwt } from "../../utils/verifyJwt";

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

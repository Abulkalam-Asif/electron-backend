import jwt from "jsonwebtoken";

export const verifyJwt = (token: string) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("JWT secret is not defined");

	try {
		jwt.verify(token, secret, {
			algorithms: ["HS256"],
		});
		return true;
	} catch (error) {
		console.error("JWT verification failed", error);
		throw new Error("JWT verification failed");
	}
};

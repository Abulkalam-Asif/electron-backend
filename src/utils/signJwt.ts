import jwt from "jsonwebtoken";

export const signJwt = (username: string) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("JWT secret is not defined");

	return jwt.sign({ username }, secret, {
		expiresIn: "1h",
		algorithm: "HS256",
	});
};

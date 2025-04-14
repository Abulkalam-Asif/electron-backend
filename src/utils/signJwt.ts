export const signJwt = async (username: string) => {
	// Import specific components from jose using named imports
	const { SignJWT } = await import("jose");

	const token = new SignJWT({
		username,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1h");

	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("JWT secret is not defined");
	return token.sign(new TextEncoder().encode(secret));
};

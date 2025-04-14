export const signJwt = async (username: string) => {
	// Import jose dynamically using a separate variable to ensure proper resolution
	const joseModule = await import("jose");
	const jose = joseModule.default || joseModule;

	const token = new jose.SignJWT({
		username,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1h");

	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("JWT secret is not defined");
	return token.sign(new TextEncoder().encode(secret));
};

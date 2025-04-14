// Using dynamic import for ESM compatibility

export const verifyJwt = async (token: string) => {
	// Import specific components from jose using named imports
	const { jwtVerify } = await import("jose");

	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("JWT secret is not defined");
	try {
		await jwtVerify(token, new TextEncoder().encode(secret), {
			algorithms: ["HS256"],
		});
		return true;
	} catch (error) {
		console.error("JWT verification failed", error);
		throw new Error("JWT verification failed");
	}
};

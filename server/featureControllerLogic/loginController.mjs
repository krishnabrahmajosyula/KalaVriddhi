import User from "../dbSchema/signinSchema.mjs";

async function userLogin(req, res) {
    const { username, password,isAdmin } = req.body;
    
    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check if the `isAdmin` field matches the requested role
        if (isAdmin && !user.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }
        res.status(200).json({ message: "Login successful", isAdmin: user.isAdmin });
    } catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ message: "Login failed" });
    }
}

export default userLogin;
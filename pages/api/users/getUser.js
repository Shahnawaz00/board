import prisma from "../../../lib/prisma";


//get user by id
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getUser(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
async function getUser(req, res) {
    const userId = parseInt(req.query.userId);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return res.status(200).json(user, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting user", success:false });
    }
}

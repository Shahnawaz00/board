import prisma from "../../../lib/prisma";


//get all users from search query
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getUsers(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// get all users from search query
async function getUsers(req, res) {
    const { search } = req.query;
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: search } }
                ]
            }
        });
        return res.status(200).json(users, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting users", success:false });
    }
}

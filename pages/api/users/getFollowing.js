import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getFollowing(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
//get users following a space to display on /following page
async function getFollowing(req, res) {
    const userId = parseInt(req.query.userId);
    try {
        const spaces = await prisma.space.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            },
            orderBy: {
                name: "asc"
            }
        });
        return res.status(200).json(spaces, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting users", success:false });
    }
}

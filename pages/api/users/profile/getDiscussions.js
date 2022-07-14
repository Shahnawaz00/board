import prisma from "../../../lib/prisma";


//get all discussions made by the user
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getDiscussions(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
async function getDiscussions(req, res) {
    const userId = parseInt(req.query.userId);
    try {
        const discussions = await prisma.discussion.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return res.status(200).json(discussions, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting discussions", success:false });
    }
}

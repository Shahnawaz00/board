import prisma from "../../../../lib/prisma";


//get all comments made by the user and order by date
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getComments(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
async function getComments(req, res) {
    const userId = parseInt(req.query.userId);
    try {
        const comments = await prisma.comment.findMany({
            where: {
                userId: userId
            }
        });
        return res.status(200).json(comments, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting comments", success:false });
    }
}

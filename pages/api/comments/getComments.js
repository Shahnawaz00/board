import prisma from "../../../lib/prisma";


// get all comments from a discussionn by id
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getComments(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// get all comments from a discussionn by id
async function getComments(req, res) {
    const id = parseInt(req.query.id);
    try {
        const comments = await prisma.comment.findMany({
            where: {
                discussionId: id
            }
        });
        return res.status(200).json(comments, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting comments", success:false });
    }
}

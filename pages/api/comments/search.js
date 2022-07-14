import prisma from "../../../lib/prisma";


// get all comments fcrom search query
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getComments(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// get all comments fcrom search query
async function getComments(req, res) {
    const search = req.query.search;
    try {
        const comments = await prisma.comment.findMany({
            where: {
                OR: [
                    {
                        content: { contains: search },
                    }
                ],
            }
        });
        return res.status(200).json(comments, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting comments", success:false });
    }
}

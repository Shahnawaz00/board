import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getDiscussion(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
//get single dicussion from the database
async function getDiscussion(req, res) {
    const id = parseInt(req.query.id);
    try {
        const discussion = await prisma.discussion.findUnique({
            where: {
                id: id
            }
        });
        return res.status(200).json(discussion, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting discussion", success:false });
    }
}

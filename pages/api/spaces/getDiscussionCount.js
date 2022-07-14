import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getDiscussionCount(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// get all discussions that contain the spaceid by querying user table
async function getDiscussionCount(req, res) {
    const spaceId = parseInt(req.query.spaceId);
    try {
        const discussionCount = await prisma.discussion.count({
            where: {
                spaceId: spaceId
            }
        });
        return res.status(200).json(discussionCount, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting discussion count", success:false });
    }
}

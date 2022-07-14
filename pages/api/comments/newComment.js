import prisma from "../../../lib/prisma";


// create a new comment
export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createComment(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// create a new comment
async function createComment(req, res) {
    try {
        const comment = await prisma.comment.create({
            data: {
                content: req.body.content,
                discussion: {
                    connect: { id: req.body.discussionId }
                },
                user: {
                    connect: { id: req.body.userId }
                },
                space: {
                    connect: { id: req.body.spaceId }
                }
            }
        });
        return res.status(200).json(comment, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating comment", success:false });
    }
}

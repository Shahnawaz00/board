import prisma from "../../../lib/prisma";


// update user model by connecting a discussion to bookmark
export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return await updateUser(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
async function updateUser(req, res) {
    const userId = parseInt(req.body.userId);
    const bookmarkId = parseInt(req.body.bookmarkId);
    try {
        const updatedEntry = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                bookmarks: {
                    connect: { id: bookmarkId }
                }
            }
        });
        return res.status(200).json(updatedEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating user", success:false });
    }
}

import prisma from "../../../lib/prisma";


//unfollow a space from a user and return the updated user object
export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return await unfollowSpace(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
//unfollow a space from a user and return the updated user object
async function unfollowSpace(req, res) {
    const body = req.body;
    try {
        const updatedEntry = await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                following: {
                    disconnect: { id: body.spaceId }
                }
            }
        });
        return res.status(200).json(updatedEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error unfollowing space", success:false });
    }
}

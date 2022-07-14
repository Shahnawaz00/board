import prisma from "../../../lib/prisma";


// update a user and return the updated user object
export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return await updateUser(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
async function updateUser(req, res) {
    const body = req.body;
    try {
        const updatedEntry = await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name,
                bio: body.bio
            }
        });
        return res.status(200).json(updatedEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating user", success:false });
    }
}

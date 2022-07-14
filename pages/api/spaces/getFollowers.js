import prisma from "../../../lib/prisma";


// get all users that follow a space
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getFollowers(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// get all users that follow a space by querying user table
async function getFollowers(req, res) {
    const spaceId = parseInt(req.query.spaceId);
    try {
        const followers = await prisma.user.findMany({
            where: {
                following: {
                    some: {
                        id: spaceId
                    }
                }
            }
        });
        return res.status(200).json(followers, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting followers", success:false });
    }
}

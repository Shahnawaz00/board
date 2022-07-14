import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getDiscover(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
async function getDiscover(req, res) {
    const userId = parseInt(req.query.userId);
    try {
        // get all followed spaces...
        const followedSpaces = await prisma.space.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                      }
                }
            }
        });
        //filter against spaces db...
        const spaces = await prisma.space.findMany({
            where: {
                id: {
                    notIn: followedSpaces.map(space => space.id)
                }
            }
        });
        // and show spaces that user is not followeing
        return res.status(200).json(spaces, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting users", success:false });
    }
}

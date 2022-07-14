import { useSession } from "next-auth/react"
import prisma from "../../../lib/prisma";


// get discussions from spaces that the user follows and show them
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getFeed(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function getFeed(req, res) {

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
        // get all discussions from those spaces...
        const discussions = await prisma.discussion.findMany({
            where: {
                space: {
                    id: {
                        in: followedSpaces.map(space => space.id)
                    }
                },
            },
            orderBy: { createdAt: 'desc' }
        });
        // and show these discussions on the home page
        return res.status(200).json(discussions, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting users", success:false });
    }
}

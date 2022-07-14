import prisma from "../../../lib/prisma";


// get bookmarks from a user
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getBookmarks(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// get all bookmarked discussions from a user by querying user table
async function getBookmarks(req, res) {
    const userId = parseInt(req.query.userId);
    try {
        const bookmarks = await prisma.discussion.findMany({
            where: {
                bookmarkedBy: {
                    some: {
                        id: userId
                    }
                }
            }
        });
        return res.status(200).json(bookmarks, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting bookmarks", success:false });
    }
}

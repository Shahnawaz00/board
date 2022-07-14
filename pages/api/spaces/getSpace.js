import prisma from "../../../lib/prisma";


// get single space from the database
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getSpace(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
async function getSpace(req, res) {
    const id = parseInt(req.query.id);
    try {
        const space = await prisma.space.findUnique({
            where: {
                id: id
            }
        });
        return res.status(200).json(space, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting space", success:false });
    }
}

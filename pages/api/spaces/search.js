import prisma from "../../../lib/prisma";


// get all spaces from search query
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getSpaces(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
// get all spaces fcrom search query
async function getSpaces(req, res) {
    const search = req.query.search;
    try {
        const spaces = await prisma.space.findMany({
            where: {
                OR: [
                    {
                        name: { contains: search },
                    }
                ],
            }
        });
        return res.status(200).json(spaces, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting spaces", success:false });
    }
}

import prisma from "../../../lib/prisma";


// get all spaces from the database and return them as a JSON object
export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createSpace(req, res);
    } else if (req.method === 'GET') {
        return await getSpaces(req, res);
    } else if (req.method === 'PUT') {
        return await updateSpace(req, res);
    } else if (req.method === 'DELETE') {
        return await deleteSpace(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

// get requst from the client and return all spaces as a JSON object
async function getSpaces(req, res) {
    try {
        const spaces = await prisma.space.findMany(
            {
                orderBy: {
                    name: "asc"
                }
            }
        );
        return res.status(200).json(spaces, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting spaces", success:false });
    }
}
//delete a space from the database
async function deleteSpace(req, res) {
    const id  = parseInt(req.query.id);
    try {
        const space = await prisma.space.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json(space, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error deleting space", success:false });
    }
}

import prisma from "../../../lib/prisma";


//create new space
export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createSpace(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

// create new space with name and description only
async function createSpace(req, res) {
    const { name, description } = req.body;
    try {
        const space = await prisma.space.create({
            data: {
                name: name,
                description: description,
            }
        });
        return res.status(200).json(space, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating space", success:false });
    }
}

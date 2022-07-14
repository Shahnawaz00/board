import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createUser(req, res);
    } else if (req.method === 'GET') {
        return await getUsers(req, res);
    } else if (req.method === 'PATCH') {
        return await updateUser(req, res);
    } else if (req.method === 'DELETE') {
        return await deleteUser(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

//get request from the client and return all users as a JSON object
async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting users", success:false });
    }
}

// update a user
async function updateUser(req, res) {
    const body = req.body;
    try {
        const updatedEntry = await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                following: {
                    connect: { id: body.spaceId }
                }
            }
        });
        return res.status(200).json(updatedEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating user", success:false });
    }
}

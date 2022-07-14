import prisma from "../../../lib/prisma";


// export default async function getServerSideProps() {
//   const discussions = await prisma.discussion.findMany();
//   return {
//     props: {
//       discussions,
//     },
//   };
// }

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createDiscussion(req, res);
    } else if (req.method === 'GET') {
        return await getDiscussions(req, res);
    } else if (req.method === 'PATCH') {
        return await updateDiscussion(req, res);
    } else if (req.method === 'DELETE') {
        return await deleteDiscussion(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function getDiscussions (req, res) {
    try {
        const discussions = await prisma.discussion.findMany();
        return res.status(200).json(discussions, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error getting discussions", success:false });
    }
}

async function createDiscussion(req, res) {
    const body = req.body;
    try {
        const newEntry = await prisma.discussion.create({
            data: {
                title: body.title,
                content: body.content,
                userId: body.userId,
                spaceId: body.spaceId
            }
        });
        return res.status(200).json(newEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating discussion", success:false });
    }
}

async function updateDiscussion(req, res) {
    const body = req.body;
    try {
        const updatedEntry = await prisma.discussion.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        return res.status(200).json(updatedEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating discussion", success:false });
    }
}

async function deleteDiscussion(req, res) {
    const body = req.body;
    try {
         // delete all comments associated with this discussion
         const comments = await prisma.comment.deleteMany({
            where: {
                discussionId: body.id
            }
        });
        const deletedEntry = await prisma.discussion.delete({
            where: {
                id: body.id
            }
        });

        return res.status(200).json(comments,deletedEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error deleting discussion", success:false });
    }
}

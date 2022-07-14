import prisma from "../../../lib/prisma";


// export default async function getServerSideProps(req, res) {
//     const search = req.query.search;
//     const discussions = await prisma.discussion.findMany({
//         where: {
//             OR: [
//                 { title: { contains: search } },
//                 { content: { contains: search } }
//             ]
//         }
//     });
//     return {
//         props: {
//             discussions
//         }
//     };
// }

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getDiscussions(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}
//get all discussions from the database that match the search query in the url
async function getDiscussions(req, res) {
    //lower case the search query
    const search = req.query.search;

    const discussions = await prisma.discussion.findMany({
        where: {
            OR: [
                {
                    title: { contains: search },
                },
                {
                    content: { contains: search },
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return res.status(200).json(discussions, {success: true});
}

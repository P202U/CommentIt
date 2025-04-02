import prisma from "@prismaClient";
import { Request, Response } from "express-serve-static-core";

interface commentRequestBody {
    userId: string;
    postId: string;
    content: string;
    parentId?: string;
}

const createComment = async (req: Request<object, object, commentRequestBody>, res: Response): Promise<void> => {
    const { userId, postId, content, parentId } = req.body;

    try {
        const newComment = await prisma.comment.create({
            data: {
                userId,
                postId,
                content,
                parentId: parentId || null,
            }
        })

         res.status(201).json({ message: 'Comment succesfully added', newComment });
         return;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
             res.status(500).json({ message: "Error creating comment", error: error.message });
             return;
        } else {
            console.error("An unknown error occurred.");
             res.status(500).json({ message: "An unknown error occurred" });
             return;
        }
    }
}


const getComments = async (req: Request, res: Response): Promise<void> => {
    const postId = req.query.postId as string;

    if (!postId) {
         res.status(400).json({ message: "Movie ID is required." });
         return;
    }

    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId,
                parentId: null,
            },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
                replies: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

         res.json({ message: 'Comments successfully retrieved', comments });
         return;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
             res.status(500).json({ message: "Error retrieving comments", error: error.message });
             return;
        } else {
            console.error("An unknown error occurred.");
             res.status(500).json({ message: "An unknown error occurred" });
             return;
        }
    }
};


const deleteComment = async (req: Request, res: Response): Promise<void> => {
    const { commentId } = req.params;

    const deletedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { deleted: true },
    });

     res.json(deletedComment);
     return;
}

const editComment = async (req: Request, res: Response): Promise<void> => {
    const { commentId, content } = req.body;

    const editedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { content: content }
    })

     res.json(editedComment);
     return;
}

export { createComment, getComments, deleteComment, editComment };
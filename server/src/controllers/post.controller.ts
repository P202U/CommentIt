import { Request, Response } from 'express';
import prisma from '@prismaClient';

// Get all posts
const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        _count: {
          select: {
            comments: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ posts });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching posts' });
    return;
  }
};

// Get a post's details
const getPostDetails = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json({
      message: 'Post details fetched successfully',
      post,
    });
    return;
  } catch {
    res.status(500).json({ error: 'Error fetching Post details' });
    return;
  }
};

// Create a new post
const createPost = async (req: Request, res: Response): Promise<void> => {
  const { content, title, userId } = req.body;

  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  if (!userId) {
    res.status(401).json({ error: 'User is not authenticated' });
    return;
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
    return;
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ error: 'Error creating post' });
    return;
  }
};

export { getPosts, getPostDetails, createPost };

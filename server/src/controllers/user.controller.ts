import { Request, Response } from 'express';
import prisma from '@prismaClient';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined!');
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const hashPassword = async (password: string) => {
    return argon2.hash(password);
  };

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400).json({
        error: 'Username or Email already in use.',
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.json({
      message: 'User successfully created.',
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
    return;
  }
};


const loginUser = async (req: Request, res: Response): Promise<void> => {
  async function verifyPassword(storedHash: string, password: string) {
    try {
      return await argon2.verify(storedHash, password);
    } catch {
      return false;
    }
  }

  const { usernameOrEmail, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: usernameOrEmail },
          { username: usernameOrEmail }
        ]
      }
    });

    if (user && await verifyPassword(user.password, password)) {
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ message: 'Login successful', user: user, token: token });
      return;
    } else {
      res.status(401).json({ error: 'Invalid email/username or password.' });
      return;
    }
  } catch {
    res.status(500).json({ error: 'Error logging in user' });
    return;
  }
}


export { registerUser, loginUser }; 
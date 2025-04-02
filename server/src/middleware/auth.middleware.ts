import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined!');
}

interface CustomRequest extends Request {
    user: string | JwtPayload;
}

const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token: string | undefined = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(403).json({ error: 'Access Denied. No token provided.' });
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as CustomRequest).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.', err });
        return 
    }
}

export { authenticateJWT };
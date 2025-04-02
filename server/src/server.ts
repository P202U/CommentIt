import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import commentRoutes from '@routes/comments.routes'
import userRoutes from '@routes/user.routes'
import path from 'path';
import seedAdminUser from 'seedAdminUser';

dotenv.config();

const app = express();

// Initialize database with an admin user on startup
seedAdminUser();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/comments', commentRoutes);

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

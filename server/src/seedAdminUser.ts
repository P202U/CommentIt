import prisma from '@prismaClient';
import argon2 from 'argon2';

const seedAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || '987'; 

  try {
    // Check if there's already an admin user
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // If no admin exists, create one
    const hashedPassword = await argon2.hash(adminPassword);

    const newAdmin = await prisma.user.create({
      data: {
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN', 
      },
    });

    console.log('Admin user created:', newAdmin.username);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

export default seedAdminUser;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Cleaning existing data...');
    await prisma.auditLog.deleteMany();
    await prisma.vote.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Existing data cleaned\n');

    // Create Super Admin
    console.log('👤 Creating Super Admin...');
    const superAdmin = await prisma.user.create({
        data: {
            name: 'Super Admin',
            email: 'superadmin@inlegal.com',
            password: '$2a$10$YourHashedPasswordHere', // Replace with actual hashed password
            role: 'SUPER_ADMIN',
            isActive: true,
            bio: 'Platform Super Administrator',
            reputation: 1000,
            adminProfile: {
                create: {
                    department: 'Platform Management',
                    canBanUsers: true,
                    canDeletePosts: true,
                    canApprovePosts: true,
                    canManageUsers: true,
                    permissions: JSON.stringify({
                        canViewAnalytics: true,
                        canExportData: true,
                        canManageAdmins: true,
                        canAccessSystemSettings: true
                    })
                }
            }
        }
    });
    console.log(`✅ Created Super Admin: ${superAdmin.email}\n`);

    // Create Admin
    console.log('👤 Creating Admin...');
    const admin = await prisma.user.create({
        data: {
            name: 'Content Admin',
            email: 'admin@inlegal.com',
            password: '$2a$10$YourHashedPasswordHere', // Replace with actual hashed password
            role: 'ADMIN',
            isActive: true,
            bio: 'Content Management Administrator',
            reputation: 500,
            adminProfile: {
                create: {
                    department: 'Content Moderation',
                    canBanUsers: true,
                    canDeletePosts: true,
                    canApprovePosts: true,
                    canManageUsers: false,
                    permissions: JSON.stringify({
                        canViewAnalytics: true,
                        canExportData: false,
                        canManageAdmins: false
                    })
                }
            }
        }
    });
    console.log(`✅ Created Admin: ${admin.email}\n`);

    // Create Moderator
    console.log('👤 Creating Moderator...');
    const moderator = await prisma.user.create({
        data: {
            name: 'Content Moderator',
            email: 'moderator@inlegal.com',
            password: '$2a$10$YourHashedPasswordHere', // Replace with actual hashed password
            role: 'MODERATOR',
            isActive: true,
            bio: 'Community Moderator',
            reputation: 250,
            adminProfile: {
                create: {
                    department: 'Community Management',
                    canBanUsers: false,
                    canDeletePosts: false,
                    canApprovePosts: true,
                    canManageUsers: false,
                    permissions: JSON.stringify({
                        canViewReports: true,
                        canFlagContent: true
                    })
                }
            }
        }
    });
    console.log(`✅ Created Moderator: ${moderator.email}\n`);

    // Create Regular Users
    console.log('👥 Creating regular users...');
    const users = await Promise.all([
        prisma.user.create({
            data: {
                name: 'John Doe',
                email: 'john@example.com',
                password: '$2a$10$YourHashedPasswordHere',
                role: 'USER',
                bio: 'Just a regular user sharing inlegal experiences',
                reputation: 50
            }
        }),
        prisma.user.create({
            data: {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: '$2a$10$YourHashedPasswordHere',
                role: 'USER',
                bio: 'Love finding legal things that feel illegal!',
                reputation: 75
            }
        }),
        prisma.user.create({
            data: {
                name: 'Mike Johnson',
                email: 'mike@example.com',
                password: '$2a$10$YourHashedPasswordHere',
                role: 'USER',
                bio: 'Collector of weird legal moments',
                reputation: 30
            }
        })
    ]);
    console.log(`✅ Created ${users.length} regular users\n`);

    // Create Posts
    console.log('📝 Creating posts...');
    const posts = await Promise.all([
        prisma.post.create({
            data: {
                title: 'Removing mattress tags',
                description: 'I removed the "Do Not Remove" tag from my mattress. It\'s perfectly legal for consumers to do this, but I felt like I was committing a crime!',
                category: 'Home & Living',
                status: 'APPROVED',
                userId: users[0].id,
                approvedAt: new Date(),
                approvedBy: moderator.id,
                upvotes: 45,
                downvotes: 2,
                viewCount: 234
            }
        }),
        prisma.post.create({
            data: {
                title: 'Walking out of a store without buying anything',
                description: 'Went into a store, browsed around, and left without purchasing anything. The security guard\'s stare made me feel so guilty!',
                category: 'Shopping',
                status: 'APPROVED',
                userId: users[1].id,
                approvedAt: new Date(),
                approvedBy: moderator.id,
                upvotes: 128,
                downvotes: 5,
                viewCount: 567,
                isFeatured: true,
                featuredAt: new Date()
            }
        }),
        prisma.post.create({
            data: {
                title: 'Carrying large amounts of cash',
                description: 'Withdrew $5000 in cash from the bank for a car purchase. Walking around with that much money felt incredibly illegal even though it\'s totally fine.',
                category: 'Finance',
                status: 'APPROVED',
                userId: users[2].id,
                approvedAt: new Date(),
                approvedBy: admin.id,
                upvotes: 89,
                downvotes: 3,
                viewCount: 445
            }
        }),
        prisma.post.create({
            data: {
                title: 'Turning on interior car lights while driving',
                description: 'My parents always said it was illegal, but it\'s actually not! Still feels wrong every time I do it.',
                category: 'Driving',
                status: 'PENDING',
                userId: users[0].id,
                upvotes: 12,
                downvotes: 1,
                viewCount: 45
            }
        }),
        prisma.post.create({
            data: {
                title: 'Using someone else\'s Netflix account',
                description: 'My friend shared their Netflix password with me. Technically against TOS but not illegal, yet I feel like a pirate!',
                category: 'Entertainment',
                status: 'FLAGGED',
                userId: users[1].id,
                upvotes: 67,
                downvotes: 15,
                viewCount: 234
            }
        })
    ]);
    console.log(`✅ Created ${posts.length} posts\n`);

    // Create Comments
    console.log('💬 Creating comments...');
    const comments = await Promise.all([
        prisma.comment.create({
            data: {
                content: 'OMG I thought I was the only one! I still feel nervous doing this.',
                postId: posts[0].id,
                userId: users[1].id
            }
        }),
        prisma.comment.create({
            data: {
                content: 'This is so relatable! The tag literally says "except by consumer" but we all ignore that part.',
                postId: posts[0].id,
                userId: users[2].id
            }
        }),
        prisma.comment.create({
            data: {
                content: 'I do this all the time and ALWAYS feel guilty. Glad I\'m not alone!',
                postId: posts[1].id,
                userId: users[0].id
            }
        }),
        prisma.comment.create({
            data: {
                content: 'The security guard stare is real! They make you feel like a criminal.',
                postId: posts[1].id,
                userId: users[2].id
            }
        })
    ]);
    console.log(`✅ Created ${comments.length} comments\n`);

    // Create Votes
    console.log('👍 Creating votes...');
    const votes = await Promise.all([
        prisma.vote.create({
            data: {
                postId: posts[0].id,
                userId: users[1].id,
                isUpvote: true
            }
        }),
        prisma.vote.create({
            data: {
                postId: posts[0].id,
                userId: users[2].id,
                isUpvote: true
            }
        }),
        prisma.vote.create({
            data: {
                postId: posts[1].id,
                userId: users[0].id,
                isUpvote: true
            }
        }),
        prisma.vote.create({
            data: {
                postId: posts[1].id,
                userId: users[2].id,
                isUpvote: true
            }
        }),
        prisma.vote.create({
            data: {
                postId: posts[2].id,
                userId: users[0].id,
                isUpvote: true
            }
        })
    ]);
    console.log(`✅ Created ${votes.length} votes\n`);

    // Create Products
    console.log('🛍️  Creating products...');
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Inlegal Store T-Shirt',
                description: 'Show off your love for legal-but-feels-illegal moments with our premium cotton t-shirt!',
                price: 2499,
                stock: 100,
                category: 'Apparel',
                imageUrl: '/images/products/tshirt.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Hoodie',
                description: 'Stay warm while doing perfectly legal things that feel questionable.',
                price: 4999,
                stock: 75,
                category: 'Apparel',
                imageUrl: '/images/products/hoodie.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Cap',
                description: 'Top off your look with our signature cap. Legal vibes only.',
                price: 1999,
                stock: 150,
                category: 'Apparel',
                imageUrl: '/images/products/cap.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Mug',
                description: 'Drink your morning coffee while contemplating all the legal things that feel illegal.',
                price: 1499,
                stock: 50,
                category: 'Accessories',
                imageUrl: '/images/products/mug.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Water Bottle',
                description: 'Stay hydrated while doing things that are totally allowed.',
                price: 1799,
                stock: 120,
                category: 'Accessories',
                imageUrl: '/images/products/bottle.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Sticker Pack',
                description: 'A pack of 10 stickers featuring our favorite inlegal moments!',
                price: 799,
                stock: 200,
                category: 'Accessories',
                imageUrl: '/images/products/stickers.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Tote Bag',
                description: 'Carry your legally acquired items in style.',
                price: 1299,
                stock: 90,
                category: 'Accessories',
                imageUrl: '/images/products/tote.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Phone Case',
                description: 'Protect your phone while browsing legal content that feels illegal.',
                price: 1999,
                stock: 80,
                category: 'Tech',
                imageUrl: '/images/products/phonecase.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Laptop Stickers',
                description: 'Decorate your laptop with our exclusive designs.',
                price: 999,
                stock: 180,
                category: 'Tech',
                imageUrl: '/images/products/laptop-stickers.jpg'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Inlegal Store Poster',
                description: 'Wall art celebrating the gray area of legality.',
                price: 1499,
                stock: 60,
                category: 'Home',
                imageUrl: '/images/products/poster.jpg'
            }
        })
    ]);
    console.log(`✅ Created ${products.length} products\n`);

    // Create Audit Logs
    console.log('📋 Creating audit logs...');
    const auditLogs = await Promise.all([
        prisma.auditLog.create({
            data: {
                action: 'APPROVE',
                targetType: 'Post',
                targetId: posts[0].id,
                adminId: moderator.id,
                details: JSON.stringify({
                    postTitle: posts[0].title,
                    reason: 'Content meets community guidelines'
                }),
                ipAddress: '192.168.1.100'
            }
        }),
        prisma.auditLog.create({
            data: {
                action: 'APPROVE',
                targetType: 'Post',
                targetId: posts[1].id,
                adminId: moderator.id,
                details: JSON.stringify({
                    postTitle: posts[1].title,
                    reason: 'Highly relatable content, featured'
                }),
                ipAddress: '192.168.1.100'
            }
        }),
        prisma.auditLog.create({
            data: {
                action: 'FLAG',
                targetType: 'Post',
                targetId: posts[4].id,
                adminId: admin.id,
                details: JSON.stringify({
                    postTitle: posts[4].title,
                    reason: 'Potential TOS violation discussion'
                }),
                ipAddress: '192.168.1.101'
            }
        })
    ]);
    console.log(`✅ Created ${auditLogs.length} audit logs\n`);

    console.log('✨ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Users: ${users.length + 3} (3 admin/mod + ${users.length} regular)`);
    console.log(`   - Posts: ${posts.length}`);
    console.log(`   - Comments: ${comments.length}`);
    console.log(`   - Votes: ${votes.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Audit Logs: ${auditLogs.length}\n`);
    console.log('🔐 Default Admin Credentials:');
    console.log('   Super Admin: superadmin@inlegal.com');
    console.log('   Admin: admin@inlegal.com');
    console.log('   Moderator: moderator@inlegal.com');
    console.log('   Password: (You need to set actual hashed passwords)\n');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

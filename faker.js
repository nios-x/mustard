import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const users = [];
    for (let i = 0; i < 50; i++) {
        users.push(
            prisma.user.create({
                data: {
                    username: faker.internet.username(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    name: faker.person.fullName(),
                    phone: faker.phone.number(),
                },
            })
        );
    }
    const createdUsers = await prisma.$transaction(users);

    const posts = [];
    for (const user of createdUsers) {
        for (let j = 0; j < 5; j++) {
            posts.push(
                prisma.post.create({
                    data: {
                        content: faker.lorem.paragraph(),
                        userId: user.id,
                    },
                })
            );
        }
    }
    const createdPosts = await prisma.$transaction(posts);

    const likes = [];
    for (const post of createdPosts) {
        const randomUsers = faker.helpers.arrayElements(createdUsers, 10);
        for (const user of randomUsers) {
            likes.push(
                prisma.like.create({
                    data: {
                        userId: user.id,
                        postId: post.id,
                    },
                })
            );
        }
    }
    await prisma.$transaction(likes);

    const comments = [];
    for (const post of createdPosts) {
        for (let k = 0; k < 3; k++) {
            comments.push(
                prisma.comment.create({
                    data: {
                        description: faker.lorem.sentence(),
                        userId: faker.helpers.arrayElement(createdUsers).id,
                        postId: post.id,
                    },
                })
            );
        }
    }
    await prisma.$transaction(comments);

    const friends = [];
    for (let i = 0; i < createdUsers.length - 1; i++) {
        for (let j = i + 1; j < createdUsers.length; j++) {
            if (Math.random() > 0.7) {
                friends.push(
                    prisma.friend.create({
                        data: {
                            user1: createdUsers[i].id,
                            user2: createdUsers[j].id,
                            isAccepted: Math.random() > 0.5,
                        },
                    })
                );
            }
        }
    }
    await prisma.$transaction(friends);

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

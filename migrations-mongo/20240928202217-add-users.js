module.exports = {
    async up(db, client) {
        const user1 = {
            firstName: 'Hadriel',
            lastName: 'Benjo',
            email: 'hadriel@gmail.com',
            active: true,
            createdAt: new Date(),
            updatedAt: null,
        };

        const user2 = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            active: true,
            createdAt: new Date(),
            updatedAt: null,
        };

        await db.collection('users').insertMany([user1, user2]);
    },

    async down(db, client) {
        await db.collection('users').deleteMany({ email: { $in: ['hadriel@gmail.com', 'john.doe@example.com'] } });
    },
};

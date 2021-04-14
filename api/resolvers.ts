export const resolvers = {
    Query: {
        fetchUser: (parent: any, { id }: any, context: any, info: any) => {
            return {
                id: 1,
                email: "test@email.com",
                username: "testtest",
                password: "testest",
            };
        },
    },
    Mutation: {
        insertUser: (parent: any, { email, username, password }: any, context: any, info: any) => {
            console.log("input:", email, username, password);
            return {
                id: 1,
            };
        },
    },
};

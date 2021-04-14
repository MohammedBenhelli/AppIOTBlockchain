import {gql} from "https://deno.land/x/oak_graphql/mod.ts";

export const types = gql`
    type User {
        id: Int
        username: String
        email: String
        password: String
    }

    type UserOutput {
        id: Int
    }

    type Query {
        fetchUser(id: Int): User
    }

    type Mutation {
        insertUser(username: String!, email: String!, password: String!): UserOutput!
    }
`;

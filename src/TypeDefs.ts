import { gql } from "apollo-server";

export const typeDefs = gql`
    type User {
        id: Int!
        fullname: String
        username: String
        mail: String
        role: String
        organisation: Organisation
    }

    type Organisation {
        id: Int!
        name: String
        description: String
        forfait: Forfait
    }

    type Forfait {
        id: Int!
        designation: String
        equipe_max: Int
    }

    type Query {
        user(id: Int!): User
        organisation(id: Int!): Organisation
        forfait(id: Int!): Forfait
    }
    type Forfaits {
        forfaits: [Forfait!]!
    }
`;

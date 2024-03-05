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

    type Forfaits {
        total: Int
        data: [Forfait]
    }

    type Organisations {
        total: Int
        data: [Organisation]
    }

    type Query {
        user(id: Int!): User
        organisation(id: Int!): Organisation
        organisations: Organisations
        forfait(id: Int!): Forfait
        forfaits: Forfaits
    }
`;

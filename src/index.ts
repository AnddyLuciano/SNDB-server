import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import { typeDefs } from "./TypeDefs";
import { user } from "./Resolver/query/User";
import { organisation, organisations } from "./Resolver/query/Organisation";
import { forfait, forfaits } from "./Resolver/query/Forfait";

// Résolveurs pour répondre aux requêtes
const resolvers = {
    Query: {
        user,
        organisation,
        organisations,
        forfait,
        forfaits,
    },
};

// Création du serveur Apollo
const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

// Démarrage du serveur
server.listen(5002).then(({ url }) => {
    console.log(`Serveur GraphQL prêt à l'écoute sur ${url}`);
});

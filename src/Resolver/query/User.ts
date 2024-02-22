import { ExecuteQuery } from "../../ExcecuteQuery";

export const user = async (parent: any, { id }: { id: any }, context: any, info: any) => {
    // Récupération des champs demandés par le client
    const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
        (selection: any) => selection.name.value
    );

    // Construction de la requête SQL en fonction des champs demandés
    const selectFields = requestedFields.join(", "); // Concaténation des champs avec une virgule
    const query = `SELECT ${selectFields} FROM User WHERE user.id = ?`;

    // Exécution de la requête SQL avec les champs demandés
    const user: any = await ExecuteQuery(query, [id]);
    return user[0];
};

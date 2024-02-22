import { ExecuteQuery } from "./ExcecuteQuery";

module.exports = async (parent: any, args: { id: string }, context: any, info: any) => {
    // Récupération des champs demandés par le client
    const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
        (selection: any) => selection.name.value
    );
    console.log(requestedFields);

    // Construction de la requête SQL en fonction des champs demandés
    const selectFields = requestedFields.join(", "); // Concaténation des champs avec une virgule
    const query = `SELECT ${selectFields} FROM User WHERE id = ?`;

    // Exécution de la requête SQL avec les champs demandés
    const user: any = await ExecuteQuery(query, [args.id]);
    return user[0];
};

import { ExecuteQuery } from "../../ExcecuteQuery";

export const forfait = async (parent: any, { id }: { id: any }, context: any, info: any) => {
    // Récupération des champs demandés par le client
    const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
        (selection: any) => selection.name.value
    );

    // Construction de la requête SQL en fonction des champs demandés
    const selectFields = requestedFields.join(", "); // Concaténation des champs avec une virgule
    const query = `SELECT ${selectFields} FROM Forfait WHERE forfait.id = ?`;

    // Exécution de la requête SQL avec les champs demandés
    const forfait: any = await ExecuteQuery(query, [id]);
    console.log(forfait);
    return forfait[0];
};

export const forfaits = async (parent: any, _: any, context: any, info: any) => {
    // Récupération des champs demandés par le client
    const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
        (selection: any) => selection.name.value
    );

    // Construction de la requête SQL en fonction des champs demandés
    const selectFields = requestedFields.join(", "); // Concaténation des champs avec une virgule
    const query = `SELECT ${selectFields} FROM Forfait`;

    // Exécution de la requête SQL avec les champs demandés
    const forfaits: any = await ExecuteQuery(query);
    console.log(forfaits);
    return forfaits;
};

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
    return forfait[0];
};

export const forfaits = async (parent: any, _: any, context: any, info: any) => {
    // Récupération des champs demandés par le client
    const requestedFields = info.fieldNodes[0].selectionSet.selections.reduce(
        (fields: any, selection: any) => {
            fields[selection.name.value] = true;
            return fields;
        },
        {}
    );

    let total: number | undefined;
    let data: any;

    if (requestedFields.total) {
        const query = `SELECT COUNT(*) as total FROM Forfait`;
        const totalForfaits: any = await ExecuteQuery(query);
        total = totalForfaits[0].total;
    }

    if (requestedFields.data) {
        // Construction de la liste des champs demandés pour la requête SQL
        const dataFields =
            info.fieldNodes?.[0].selectionSet?.selections?.[0].selectionSet?.selections
                ?.map((selection: any) => selection.name.value)
                .join(",");
        const query = `SELECT ${dataFields ?? "*"} FROM Forfait`;
        data = await ExecuteQuery(query);
    }
    return { total, data };
};

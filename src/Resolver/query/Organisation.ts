import { ExecuteQuery } from "../../ExcecuteQuery";

export const organisation = async (parent: any, { id }: { id: any }, context: any, info: any) => {
    // Récupération des champs demandés par le client
    const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
        (selection: any) => selection.name.value
    );

    // Construction de la requête SQL en fonction des champs demandés
    const selectFields = requestedFields
        .map((field: string) => {
            // Pour chaque champ demandé, si c'est "forfait", on inclut également les champs du forfait
            if (field === "forfait") {
                return "forfait.id as forfait_id, forfait.designation as forfait_designation, forfait.equipe_max as forfait_equipe_max";
            }
            // Sinon, on garde le nom du champ tel qu'il est
            return `organisation.${field}`;
        })
        .join(", ");
    const query = `SELECT ${selectFields} FROM Organisation INNER JOIN Forfait ON Organisation.id = Forfait.id WHERE organisation.id = ?`;

    // Exécution de la requête SQL avec les champs demandés
    const organisation: any = await ExecuteQuery(query, [id]);

    const forfait_brut: Array<{ [x: string]: any }> = [];
    Object.keys(organisation[0]).map((key) => {
        if (key.includes("forfait")) {
            const name = key.substring(key.indexOf("_") + 1);
            forfait_brut.push({ [name]: organisation[0][key] });
            organisation[0][key] = undefined;
        }
    });

    const forfait: { [x: string]: any } = {};
    for (const obj of forfait_brut) {
        for (const [key, value] of Object.entries(obj)) {
            forfait[key] = value;
        }
    }

    return {
        ...organisation[0],
        forfait: {
            ...forfait,
        },
    };
};

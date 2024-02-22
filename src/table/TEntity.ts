import { connection } from "../Connection";

export const TEntity = () => {
    return ({ tableName, fields }: { tableName: string; fields: string }) => {
        const checkTableQuery = `SHOW TABLES LIKE '${tableName}'`;

        connection.query(checkTableQuery, (err, results) => {
            if (err) {
                console.error("Erreur lors de la vérification de l'existence de la table :", err);
                return;
            }

            // Si la base de données n'existe pas, on la crée
            if (results.length === 0) {
                const createTableQuery = `CREATE TABLE ${tableName} (
                ${fields}
            );
            `;

                connection.query(createTableQuery, (err, results) => {
                    if (err) {
                        console.error("Erreur lors de la création de la table :", err);
                        return;
                    }
                    console.log("Table créée avec succès : ", tableName);
                });
            } else {
                console.log(`Table : ${tableName}`);
            }
        });
    };
};

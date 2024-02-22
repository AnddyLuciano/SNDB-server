import mysql from "mysql";
import { TEntity } from "./table/TEntity";

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

const Tables = TEntity();

// Connexion à la base de données
connection.connect(async (err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        return;
    }
    console.log("Connexion à la base de données réussie");

    // Vérification de l'existence de la base de données
    const databaseName = "sndbdash";
    const checkDatabaseQuery = `SHOW DATABASES LIKE '${databaseName}'`;

    connection.query(checkDatabaseQuery, (err, results) => {
        if (err) {
            console.error(
                "Erreur lors de la vérification de l'existence de la base de données :",
                err
            );
            return;
        }

        // Si la base de données n'existe pas, on la crée
        if (results.length === 0) {
            const createDatabaseQuery = `CREATE DATABASE ${databaseName}`;

            connection.query(createDatabaseQuery, (err, results) => {
                if (err) {
                    console.error("Erreur lors de la création de la base de données :", err);
                    return;
                }
                console.log("Base de données créée avec succès");
            });
        } else {
            console.log("La base de données existe déjà");
        }
        connection.query(`USE ${databaseName};`);
        Tables({
            tableName: "Forfait",
            fields: `
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                designation VARCHAR(100),
                equipe_max INTEGER
        `,
        });
        Tables({
            tableName: "Organisation",
            fields: `
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                description VARCHAR(255),
                id_PLAN VARCHAR(25),
                FOREIGN KEY (id_PLAN) REFERENCES Forfait(id_PLAN)
        `,
        });
        Tables({
            tableName: "User",
            fields: `
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(255),
                username VARCHAR(255),
                mail VARCHAR(255),
                role VARCHAR(255),
                id_ORG VARCHAR(25),
                FOREIGN KEY (id_ORG) REFERENCES Organisation(id_ORG)
        `,
        });
    });
});

export { connection };

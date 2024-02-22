import { connection } from "./Connection";

export function ExecuteQuery(query: string, params?: any) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

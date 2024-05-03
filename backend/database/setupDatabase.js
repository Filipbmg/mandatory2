import db from './connection.js';

const deleteMode = process.argv.includes('delete');
console.log(process.argv);

async function setupDatabase() {
    try {
        if (deleteMode) {
            await db.exec(`DROP TABLE IF EXISTS users`);
        }

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        if (deleteMode) {
            //passwords = 123
            await db.run(`INSERT INTO users (name, email, password) VALUES ('John', 'john@dummy.dk', '$2a$12$eIxxyzAG76X21UfZpQtBR.EGPiu.dzczlHhOFNrEPNyTHeCoURVYO')`);
        }
    }
    catch (error) {
        console.log('Error setting up database: ', error);
    }
}

setupDatabase();

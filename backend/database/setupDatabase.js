import db from './connection.js';

const deleteMode = process.argv.includes('delete');

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
        console.log("Database created")
        if (deleteMode) {
            await db.run(`INSERT INTO users (name, email, password) VALUES ('John', 'john@dummy.dk', '$2b$12$6ooxdTggIhXYgl4/Jkq6D..OaS33wC55WNWwD6uSHul9aewCrRQnC')`);
            console.log("Dummylogin: John@dummy.dk password: password123")
        }
    }
    catch (error) {
        console.log('Error setting up database: ', error);
    }
}

setupDatabase();

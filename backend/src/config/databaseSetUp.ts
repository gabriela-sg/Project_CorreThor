import pool from './db';

const createTables = async () => {
    const createAdminTable = `
        CREATE TABLE IF NOT EXISTS Admin (
            id SERIAL PRIMARY KEY,
            token TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL
        );
    `;

    const createCorrectorTable = `
        CREATE TABLE IF NOT EXISTS Corrector(
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );      
    `;

    const createCorrectionsTable = `
        CREATE TABLE IF NOT EXISTS Corrections(
            id SERIAL PRIMARY KEY,
            correctorId INT NOT NULL REFERENCES Corrector(id),
            class TEXT NOT NULL,
            module TEXT NOT NULL,
            meeting TEXT NOT NULL,
            student TEXT NOT NULL
        );
    `;

    try{
        await pool.query(createAdminTable);
        await pool.query(createCorrectorTable);
        await pool.query(createCorrectionsTable);

    }catch (error){
        console.error('Erro ao criar Tabelas: ', error);
    }finally{
        pool.end();
    }
}

createTables();
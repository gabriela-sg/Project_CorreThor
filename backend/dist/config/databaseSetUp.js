"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        yield db_1.default.query(createAdminTable);
        yield db_1.default.query(createCorrectorTable);
        yield db_1.default.query(createCorrectionsTable);
    }
    catch (error) {
        console.error('Erro ao criar Tabelas: ', error);
    }
    finally {
        db_1.default.end();
    }
});
createTables();

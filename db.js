import path from "path";
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

// 현재 파일 경로
const __filename = fileURLToPath(import.meta.url);
// 현재 파일이 속한 디렉토리
const __dirname = path.dirname(__filename);

// data 폴더 아래 til.db 저장
const db_name = path.join(__dirname, "data", "til.db");

const sequelize = new Sequelize({
    dialect : 'sqlite',
    storage : db_name
});

export const db = sequelize;

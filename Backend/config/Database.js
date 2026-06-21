import { Sequelize } from 'sequelize';

const db = new Sequelize('db_penggajian3', 'root', 'Thul@2005', {
  host: "localhost",
  dialect: "mysql"
});

export default db;
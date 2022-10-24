CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user (
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (uuid)
)

INSERT INTO application_user (username, password) 
VALUES ( 'admin', crypt('admin', 'app_secret')); !-- use o mesmo valor do APP_SECRET como salt--!

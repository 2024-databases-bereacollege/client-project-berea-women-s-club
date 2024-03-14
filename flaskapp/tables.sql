-- https://www.postgresqltutorial.com/

CREATE TABLE othertable (
    otherid integer PRIMARY KEY,
    data varchar
);

CREATE TABLE example (
    id serial PRIMARY KEY,
    username varchar(32) UNIQUE,
    description varchar(255) NOT NULL,
    fkey_other integer REFERENCES othertable(otherid), 
    isInt smallint NOT NULL DEFAULT(0),
    isBool boolean
);

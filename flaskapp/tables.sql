-- https://www.postgresqltutorial.com/

CREATE TABLE donationInflow (
    donationId SERIAL PRIMARY KEY,
    donorName VARCHAR(100),
    category VARCHAR(50),
    donationDate DATE,
    amount NUMERIC(12, 2)
);

CREATE TABLE example (
    id serial PRIMARY KEY,
    username varchar(32) UNIQUE,
    description varchar(255) NOT NULL,
    fkey_other integer REFERENCES othertable(otherid), 
    isInt smallint NOT NULL DEFAULT(0),
    isBool boolean
);

CREATE TABLE Donation_Ouflow (
     donationOuflowId serial PRIMARY KEY,
    donationDate varchar(10) NOT NULL,
    amount integer,
    doneeName varchar(40),
    category varchar(30)
);
-- CREATE TABLE example (
--     id serial PRIMARY KEY,
--     username varchar(32) UNIQUE,
--     description varchar(255) NOT NULL,
--     fkey_other integer REFERENCES othertable(otherid), 
--     isInt smallint NOT NULL DEFAULT(0),
--     isBool boolean
-- );

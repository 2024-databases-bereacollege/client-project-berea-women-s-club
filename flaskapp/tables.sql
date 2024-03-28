-- https://www.postgresqltutorial.com/

CREATE TABLE member (
    memberID SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    phoneNumber BIGINT,
    streetName VARCHAR(150),
    city VARCHAR(50),
    usState VARCHAR(50),
    zipCode INT,
    dateOfBirth DATE,
    dateJoined DATE DEFAULT CURRENT_DATE,
    memberType VARCHAR(),
    paidDues BOOLEAN
);

Create membershipType (
    membershipID SERIAL PRIMARY KEY,
    membertype VARCHAR(150) DEFAULT 'Member',
    FOREIGN KEY (memberID) REFERENCES member(memberID)
);

CREATE TABLE donationInflow (
    donationInflowId SERIAL PRIMARY KEY,
    category VARCHAR(100),
    amount NUMERIC(12, 2),
    donationDate DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (organizationID) REFERENCES organization(organizationID)
);

CREATE TABLE donation_Ouflow (
    donationOuflowId serial PRIMARY KEY,
    donationDate DATE DEFAULT CURRENT_DATE,
    amount NUMERIC(12, 2),
    category varchar(100),
    FOREIGN KEY (organizationID) REFERENCES organization(organizationID)
);

CREATE TABLE event (
    eventID SERIAL PRIMARY KEY,
    eventName VARCHAR(150),
    eventLocation VARCHAR(150),
    streetName VARCHAR(150),
    city VARCHAR(50),
    usState VARCHAR(50),
    zipCode INT,
    eventDate DATE DEFAULT CURRENT_DATE,
    amountRaised NUMERIC(12, 2),
    eventCost NUMERIC(12, 2),
    eventType varchar(100)
);

-- associative entity that connects member to event
CREATE TABLE host (
    eventID INT,
    memberID INT,
    PRIMARY KEY (eventID, memberID),
    FOREIGN KEY (eventID) REFERENCES event(eventID),
    FOREIGN KEY (memberID) REFERENCES member(memberID)
);

CREATE TABLE organization (
    organizationID serial PRIMARY KEY,
    organizationName VARCHAR(150) NOT NULL,
    email VARCHAR(100),
    phoneNumber BIGINT,
    streetName VARCHAR(150),
    city VARCHAR(50),
    usState VARCHAR(50),
    zipCode INT,
    organizationType varchar (100)
);


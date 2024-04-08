// This is not very modular. We're planning on creating a seperate module for each table's operation in the future. 
// We have decided to use Node.js for server development hence the js file. 

import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

db.connect();

async function getMembers(orderBy) {
    let column = 'memberId'; // default ordering
    switch (orderBy) {
      case 'firstName':
        column = 'firstName';
        break;
      case 'lastName':
        column = 'lastName';
        break;
      case 'dateJoined':
        column = 'dateJoined DESC';
        break;
      // Add more cases as needed
    }
  
    const query = `
      SELECT m.*, mt.memberType
      FROM member m
      LEFT JOIN membershipType mt ON m.memberID = mt.memberID
      ORDER BY ${column} LIMIT 2;
    `;
  
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

async function getSpecificMember(memberId) {
    const query = 'SELECT * FROM member WHERE memberID = $1';
  
    try {
      const result = await db.query(query, [memberId]);
      if (result.rows.length > 0) {
        return result.rows[0]; // Return the member details
      } else {
        return null; // No member found
      }
    } catch (error) {
      console.error('Error executing fetchMember query:', error);
      throw error;
    }
  }

async function getMemberDues(year, status) {
  const query = `
    SELECT m.*, mt.memberType, mf.paydate, mf.status
    FROM member m
    JOIN membershipType mt ON m.memberID = mt.memberID 
    JOIN membershipFee mf ON m.memberID = mf.memberID
    WHERE mf.paydate >= $1 AND mf.paydate <= $2 AND mf.status = $3
  `;
  
  // Constructing dates for the beginning and end of the year
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  try {
    const result = await pool.query(query, [startDate, endDate, status]);
    return result.rows; // Return the fetched rows
  } catch (err) {
    console.error('Error executing fetchMemberDues query:', err);
    throw err; // Rethrow or handle as needed
  }
}

async function getMemberDues(year, status) {
    const query = `
      SELECT m.*, mt.memberType, mf.paydate, mf.status
      FROM member m
      JOIN membershipType mt ON m.memberID = mt.memberID 
      JOIN membershipFee mf ON m.memberID = mf.memberID
      WHERE mf.paydate >= $1 AND mf.paydate <= $2 AND mf.status = $3
    `;
    
    // Constructing dates for the beginning and end of the year
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
  
    try {
      const result = await db.query(query, [startDate, endDate, status]);
      return result.rows; // Return the fetched rows
    } catch (err) {
      console.error('Error executing fetchMemberDues query:', err);
      throw err; // Rethrow or handle as needed
    }
  }

async function getNewMembers(year) {
    const query = `
        SELECT m.*, mt.memberType
        FROM member m
        LEFT JOIN membershipType mt ON m.memberID = mt.memberID 
        WHERE datejoined >= $1 AND datejoined <= $2
    `;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    try {
        const result = await db.query(query, [startDate, endDate]);
        return result.rows;
    } catch (err) {
        console.error('Error executing fetchNewMembers query:', err);
        throw err;
    }
}

async function getNumMembers() {
    const query = "SELECT COUNT(*) FROM member;";

    try {
        const result = await db.query(query);
        return result.rows[0];
    } catch (err) {
        console.error('Error executing fetchTotalMembers query:', err);
        throw err;
    }
}

async function getNumMembersYear(year) {
    const query = `
        SELECT COUNT(*) FROM member WHERE datejoined >= $1 AND datejoined <= $2
    `;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    try {
        const result = await db.query(query, [startDate, endDate]);
        return result.rows[0];
    } catch (err) {
        console.error('Error executing fetchTotalMembersYear query:', err);
        throw err;
    }
}

async function addNewMember(memberData) {
    const memberQuery = `
      INSERT INTO member 
      (firstName, lastName, email, phoneNumber, streetName, city, usState, zipCode, dateOfBirth) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING memberID
    `;
    const memberValues = [
      memberData.firstName, memberData.lastName, memberData.email, 
      memberData.phoneNumber, memberData.streetName, memberData.city, 
      memberData.usState, memberData.zipCode, memberData.dateOfBirth
    ];
  
    const memberResult = await db.query(memberQuery, memberValues);
    return memberResult.rows[0].memberid; // Return the new member's ID
  }
  
async function addMembershipType(memberId, memberType) {
    const typeQuery = "INSERT INTO membershipType (memberType, memberID) VALUES ($1, $2)";
    await db.query(typeQuery, [memberType, memberId]);
}
  
async function addMembershipFee(memberId, status) {
    const feeQuery = "INSERT INTO membershipFee (memberID, status) VALUES ($1, $2)";
    await db.query(feeQuery, [memberId, status]);
}

async function updateMemberInformation({ firstName, lastName, email, phoneNumber, streetName, city, usState, zipCode, dateOfBirth, memberType, paymentStatus, memberID }) {
    await db.query('BEGIN'); // Start transaction
  
    try {
      const updateMemberQuery = `
        UPDATE member
        SET
          firstName = $1,
          lastName = $2,
          email = $3,
          phoneNumber = $4,
          streetName = $5,
          city = $6,
          usState = $7,
          zipCode = $8,
          dateOfBirth = $9
        WHERE memberID = $10
      `;
      await db.query(updateMemberQuery, [firstName, lastName, email, phoneNumber, streetName, city, usState, zipCode, dateOfBirth, memberID]);
  
      const updateMembershipTypeQuery = `
        UPDATE membershipType
        SET
          memberType = $1
        WHERE memberID = $2
      `;
      await db.query(updateMembershipTypeQuery, [memberType, memberID]);
  
      const updateMembershipFeeQuery = `
        UPDATE membershipFee
        SET
          status = $1
        WHERE memberID = $2
      `;
      await db.query(updateMembershipFeeQuery, [paymentStatus, memberID]);
  
      await db.query('COMMIT'); // Commit transaction
    } catch (error) {
      await db.query('ROLLBACK'); // Rollback transaction on error
      throw error; // Rethrow the error to be handled by the caller
    }
  }

async function deleteMember(memberId) {
    const deleteQuery = 'DELETE FROM member WHERE memberID = $1';
  
    try {
      await db.query(deleteQuery, [memberId]);
    } catch (error) {
      console.error('Error executing deleteMember query:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async function fetchAllOrganizations(limit = 5) {
    const query = 'SELECT * FROM organization LIMIT $1';
    const results = await db.query(query, [limit]);
    return results.rows;
  }
  
  async function fetchOrganizationCount() {
    const query = 'SELECT count(*) FROM organization';
    const result = await db.query(query);
    return result.rows[0]; // Return the count directly
  }
  
  async function fetchSpecificOrganization(id) {
    const query = 'SELECT * FROM organization WHERE organizationID = $1';
    const result = await db.query(query, [id]);
    return result.rows;
  }
  
  async function addOrganization(data) {
    const { organizationName, email, phoneNumber, streetName, city, usState, zipCode, organizationType } = data;
    const query = 'INSERT INTO organization (organizationName, email, phoneNumber, streetName, city, usState, zipCode, organizationType) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const result = await db.query(query, [organizationName, email, phoneNumber, streetName, city, usState, zipCode, organizationType]);
    return result.rows;
  }
  
  async function updateOrganization(id, data) {
    const { organizationName, email, phoneNumber, streetName, city, usState, zipCode, organizationType } = data;
    const query = `
      UPDATE organization 
      SET 
        organizationName = $1, 
        email = $2, 
        phoneNumber = $3, 
        streetName = $4, 
        city = $5, 
        usState = $6, 
        zipCode = $7, 
        organizationType = $8
      WHERE organizationID = $9 
      RETURNING *;
    `;
    const result = await db.query(query, [organizationName, email, phoneNumber, streetName, city, usState, zipCode, organizationType, id]);
    return result.rows;
  }
  
  async function deleteOrganization(id) {
    const query = 'DELETE FROM organization WHERE organizationID = $1';
    await db.query(query, [id]);
  }
  async function fetchAllEvents() {
    const { rows } = await db.query('SELECT * FROM event');
    return rows;
  }
  
  async function fetchEventById(eventID) {
    const { rows } = await db.query('SELECT * FROM event WHERE eventID = $1', [eventID]);
    return rows;
  }
  
  async function sortEvents(sortBy) {
    let orderBy = 'eventID'; // default ordering
    switch (sortBy) {
      case 'date':
        orderBy = 'eventDate DESC';
        break;
      case 'type':
        orderBy = 'eventType';
        break;
      case 'raised':
        orderBy = 'amountRaised';
        break;
      case 'cost':
        orderBy = 'eventCost';
        break;
    }
    const { rows } = await db.query(`SELECT * FROM event ORDER BY ${orderBy}`);
    return rows;
  }
  
  async function fetchAmountRaisedYearly() {
    const query = `
      SELECT EXTRACT(YEAR FROM eventDate) AS eventYear, SUM(amountRaised) AS totalRaised
      FROM event
      GROUP BY EXTRACT(YEAR FROM eventDate)
    `;
    const { rows } = await db.query(query);
    return rows;
  }
  
  async function fetchAmountRaisedMonthly(year) {
    const query = `
      SELECT 
        EXTRACT(MONTH FROM eventDate) AS eventMonth, 
        SUM(amountRaised) AS totalRaised
      FROM event
      WHERE EXTRACT(YEAR FROM eventDate) = $1
      GROUP BY EXTRACT(MONTH FROM eventDate)
      ORDER BY EXTRACT(MONTH FROM eventDate)
    `;
    const { rows } = await db.query(query, [year]);
    return rows;
  }
  
  async function insertEvent(eventData) {
    const { eventName, eventLocation, streetName, city, usState, zipCode, eventDate, amountRaised, eventCost, eventType } = eventData;
    const query = `
      INSERT INTO event (eventName, eventLocation, streetName, city, usState, zipCode, eventDate, amountRaised, eventCost, eventType)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const { rows } = await db.query(query, [eventName, eventLocation, streetName, city, usState, zipCode, eventDate, amountRaised, eventCost, eventType]);
    return rows[0];
  }
  
  async function updateEvent(eventID, eventData) {
    const { eventName, eventLocation, streetName, city, usState, zipCode, eventDate, amountRaised, eventCost, eventType } = eventData;
    const query = `
      UPDATE event
      SET
        eventName = $1,
        eventLocation = $2,
        streetName = $3,
        city = $4,
        usState = $5,
        zipCode = $6,
        eventDate = $7,
        amountRaised = $8,
        eventCost = $9,
        eventType = $10
      WHERE eventID = $11
      RETURNING *;
    `;
    const { rows } = await db.query(query, [eventName, eventLocation, streetName, city, usState, zipCode, eventDate, amountRaised, eventCost, eventType, eventID]);
    return rows;
  }
  
  async function deleteEvent(eventID) {
    const { rowCount } = await db.query('DELETE FROM event WHERE eventID = $1', [eventID]);
    return rowCount;
  }

  async function fetchMemberEvents(firstname) {
    const query = `
      SELECT m.firstname, e.eventname 
      FROM event e 
      LEFT JOIN host h ON e.eventid = h.eventid 
      LEFT JOIN member m ON h.memberid = m.memberid 
      WHERE m.firstname = $1
    `;
    const { rows } = await db.query(query, [firstname]);
    return rows;
  }
  
  async function fetchEventMembers(eventname) {
    const query = `
      SELECT e.eventname, m.firstname 
      FROM event e 
      LEFT JOIN host h ON e.eventid = h.eventid 
      LEFT JOIN member m ON h.memberid = m.memberid 
      WHERE e.eventname = $1
    `;
    const { rows } = await db.query(query, [eventname]);
    return rows;
  }

  async function fetchDonationInflows(limit = 5) {
    const query = `
      SELECT di.*, o.organizationName 
      FROM donationinflow di 
      LEFT JOIN organization o ON di.organizationid = o.organizationid 
      LIMIT $1
    `;
    const { rows } = await db.query(query, [limit]);
    return rows;
  }
  
  async function fetchDonationInflowById(donationInflowId) {
    const query = `
      SELECT di.*, o.organizationName 
      FROM donationinflow di 
      LEFT JOIN organization o ON di.organizationid = o.organizationid 
      WHERE di.donationinflowid = $1
    `;
    const { rows } = await db.query(query, [donationInflowId]);
    return rows;
  }
  
  async function fetchAmountRaisedYearly() {
    const query = `
      SELECT EXTRACT(YEAR FROM donationdate) AS donationYear, SUM(amount) AS totalRaised
      FROM donationinflow
      GROUP BY EXTRACT(YEAR FROM donationdate)
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  async function insertDonationInflow(donationData) {
    const { organizationid, category, amount, donationDate } = donationData;
    const query = `
      INSERT INTO donationinflow (organizationid, category, amount, donationdate) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const { rows } = await db.query(query, [organizationid, category, amount, donationDate]);
    return rows[0];
  }
  
  async function updateDonationInflow(donationInflowId, donationData) {
    const { organizationid, category, amount, donationDate } = donationData;
    const query = `
      UPDATE donationinflow 
      SET organizationid = $1, category = $2, amount = $3, donationdate = $4 
      WHERE donationinflowid = $5 
      RETURNING *;
    `;
    const { rows } = await db.query(query, [organizationid, category, amount, donationDate, donationInflowId]);
    return rows[0];
  }
  
  async function deleteDonationInflow(donationInflowId) {
    const query = 'DELETE FROM donationinflow WHERE donationinflowid = $1 RETURNING *;';
    const { rows } = await db.query(query, [donationInflowId]);
    return rows[0]; // Return the deleted record
  }

  async function fetchDonationOutflows() {
    const query = `
      SELECT do.*, o.organizationName 
      FROM donationOutflow do 
      LEFT JOIN organization o ON do.organizationID = o.organizationID
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
  
  async function fetchDonationOutflowById(donationOutflowId) {
    const query = `
      SELECT do.*, o.organizationName 
      FROM donationOutflow do 
      LEFT JOIN organization o ON do.organizationID = o.organizationID 
      WHERE donationOutflowId = $1
    `;
    const { rows } = await pool.query(query, [donationOutflowId]);
    return rows;
  }
  
  async function fetchDonationOutflowsOrderedBy(orderCriteria) {
    let orderBy = 'do.donationOutflowId';
    switch (orderCriteria) {
      case 'amount':
        orderBy = 'do.amount DESC';
        break;
      case 'category':
        orderBy = 'do.category';
        break;
      case 'date':
        orderBy = 'do.donationDate';
        break;
    }
    const query = `
      SELECT do.*, o.organizationName 
      FROM donationOutflow do 
      LEFT JOIN organization o ON do.organizationID = o.organizationID 
      ORDER BY ${orderBy}
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
  
  async function fetchAmountDonatedYearly() {
    const query = `
      SELECT EXTRACT(YEAR FROM donationDate) AS donationYear, SUM(amount) AS totalDonated
      FROM donationOutflow
      GROUP BY EXTRACT(YEAR FROM donationDate)
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
  async function insertDonationOutflow(donationData) {
    const { organizationID, amount, category, donationDate } = donationData;
    const query = `
      INSERT INTO donationOutflow (organizationID, amount, category, donationDate) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [organizationID, amount, category, donationDate]);
    return rows[0];
  }
  
  async function updateDonationOutflow(donationOutflowId, donationData) {
    const { organizationID, amount, category, donationDate } = donationData;
    const query = `
      UPDATE donationOutflow 
      SET organizationID = $1, amount = $2, category = $3, donationDate = $4 
      WHERE donationOutflowId = $5 
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [organizationID, amount, category, donationDate, donationOutflowId]);
    return rows[0];
  }
  
  async function deleteDonationOutflow(donationOutflowId) {
    const query = 'DELETE FROM donationOutflow WHERE donationOutflowId = $1 RETURNING *;';
    const { rows } = await pool.query(query, [donationOutflowId]);
    return rows[0]; // Return the deleted record
  }
  

export {getMembers, getMemberDues, getNewMembers, 
    getNumMembers, getNumMembersYear, 
    addNewMember, addMembershipType, addMembershipFee, updateMemberInformation,
    deleteMember, fetchAllOrganizations,
    fetchOrganizationCount,
    fetchSpecificOrganization,
    addOrganization,
    updateOrganization,
    deleteOrganization, fetchAllEvents,
    fetchEventById,
    sortEvents,
    fetchAmountRaisedYearly,
    fetchAmountRaisedMonthly,
    insertEvent,
    updateEvent,
    deleteEvent, fetchMemberEvents,
    fetchEventMembers, insertDonationInflow,
    updateDonationInflow,
    deleteDonationInflow, fetchDonationInflows,
    fetchDonationInflowById,
    fetchAmountRaisedYearly,};

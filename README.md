# Milestone 1: Business Rules and ER Diagram

## Business Rules

### Club Structure
- The club is governed by **4 officers** and **5 board members**.
- All officers have **full access to the database**.

### Membership
- Officers must be able to track both **current and past members** of the club.
- Access to members' contact information is essential, including:
  - First Name
  - Last Name
  - Address
  - Phone Number
  - Email
  - Status (Active/Inactive)
  - Dues

### Financial Operations
- Members are required to pay **annual dues**, which are contributed to both state and national umbrella organizations.
- The club's primary goal is fundraising, with proceeds donated to various recipient organizations categorized under:
  - Arts
  - Women
  - Children
  - Environment
- Specific annual donations include contributions to **FRYSC Berea Independent School District** every winter.
- Fundraising methods may include:
  - Painting Events
  - Art Events
  - Vendor Markets
  - Silent Auctions

### Donations and Expenses
- The club tracks **event registration fees** and has two main sources of donations:
  - Cash
  - In-Kind Donations (non-monetary items)
- Expenses include items such as PO Box fees, insurance, paperwork, and event costs.
- It is essential to monitor login and logout times.

### Reporting
- The system must generate reports for:
  - Expenses
  - Donations
  - Sources of cash
  - Categories of donations

### System Requirements
- The Treasurer's monitoring of incoming and outgoing funds is a priority.
- The system should be user-friendly for all club members.

## Entities

### Officer
An individual with significant responsibilities within the organization (Holds a position of authority, responsible for strategic decision-making and operational oversight).

### Board Member
A member of the organization's governing body (Involved in policy-making and strategic governance).

### Member
An individual who is part of the organization (Participates in activities, pays dues, and may have voting rights).

### Expense Report
A document detailing the expenses incurred by the organization (Crucial for financial tracking and management).

### Income Report
A summary of the organization's income sources (Essential for financial oversight).

### Donation Inflow
Tracks donations received by the organization (Ensures transparency and accountability in financial dealings).

### Donation Outflow
Tracks donations given out from the organization (Ensures transparency and accountability in financial dealings).

### Event
Organized activities or gatherings aimed at achieving specific organizational goals (Includes fundraising events, community service activities).

### Organization
External entities that interact with the club (Includes partners and recipients of donations, categorized by their focus area).

### Umbrella Organization
A higher-level entity providing oversight, resources, or affiliation benefits (The club may be a part of or associated with this entity for additional support and guidance).

### Balance Sheet
A financial statement reflecting the organization's financial status at a given time (Includes assets, liabilities, and equity, critical for understanding financial health).
## ER Diagram

![ER Diagram](./ER%20Diagram.jpg)


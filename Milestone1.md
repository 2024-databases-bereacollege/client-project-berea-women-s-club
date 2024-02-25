# Milestone 1: Business Rules and ER Diagram

### Please note that this is a work in progress and we still need to meet with our client to get answer to some questions. 

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
An individual with significant responsibilities within the organization, responsible for strategic decision-making and operational oversight. Attributes include:
- **First Name, Last Name**: The officer's legal names. (Individual's full name)
- **Email Address**: The officer's primary email for communication. (Contact information)
- **Date of Birth, Age**: For calculating age or for identification purposes. (Personal information)
- **Date Joined**: The date the officer became a part of the organization. (Membership information)
- **Phone Number (Multivalued)**: Multiple contact numbers. (Contact information)
- **Address (Multivalued)**: Can have more than one address (e.g., work, home). (Contact information)
- **ID**: A unique identifier for the officer. (Unique identification)
- **Permissions**: Access rights within the organization's systems. (System access level)
- **Position**: The official title or role within the organization. (Role in the organization)
- **Dues**: Any membership dues or fees associated with their role. (Financial obligation)
- **Status**: Active or inactive status within the organization. (Current standing)

### Board Member
A member of the organization's governing body, involved in policy-making and strategic governance. Attributes similar to an Officer, reflecting their role in governance.

### Member
An individual who is part of the organization, contributing to and participating in its activities. Attributes include:
- **Name**: Full legal name. (Individual's full name)
- **Email Address, Phone Number, Address (Multivalued)**: Contact information. (Contact details)
- **Date of Birth**: For age verification or demographic analysis. (Personal information)
- **Date Joined**: When they became a member. (Membership information)
- **ID**: Unique identification within the organization. (Unique identification)
- **Permissions**: Access rights to organization's resources or information. (System access level)
- **Position**: Any specific role or title held within the organization, if applicable. (Role in the organization)
- **Dues**: Annual or periodic fees paid for membership. (Financial obligation)
- **Status**: Indicates whether they are currently an active member. (Current standing)

### Expense Report
A document detailing the expenses incurred by the organization, crucial for financial tracking and management. Includes:
- **Date**: When the expense was incurred. (Date of transaction)
- **Expenses**: The amount spent. (Financial outlay)
- **Expense Type**: Categorization of the expense. (Nature of expense)
- **Description of Expenses**: Further details about the expense. (Additional information)

### Income Report
A summary of the organization's income sources, essential for financial oversight. Contains:
- **Date**: When the income was received. (Date of transaction)
- **Income Type**: Classification of the income source. (Nature of income)
- **Description of Income**: Additional details on the income. (Additional information)

### Donation Inflow
Tracks donations received by  the organization, ensuring transparency and accountability. Attributes include:
- **Donator Name**: Source or recipient of the donation. (Involved parties)
- **Amount**: Monetary value of the donation. (Financial figure)
- **Date**: When the donation was made. (Date of transaction)
- **Category**: Type or purpose of the donation. (Classification)
- **Donation Destination (Optional)**: For inflow, where the donation is intended to be used. (Targeted use)

### Donation Outflow
Tracks donations given out from the organization, ensuring transparency and accountability. Attributes include:
- **Donee Name**: Source or recipient of the donation. (Involved parties)
- **Amount**: Monetary value of the donation. (Financial figure)
- **Date**: When the donation was made. (Date of transaction)
- **Category**: Type or purpose of the donation. (Classification)
- **Donation Destination (Optional)**: For inflow, where the donation is intended to be used. (Targeted use)

### Event
Organized activities or gatherings aimed at achieving specific organizational goals. Features:
- **Location**: Where the event takes place. (Venue)
- **Amount Raised**: Funds collected from the event. (Financial outcome)
- **Amount Spent**: Costs incurred in hosting the event. (Expenditure)
- **Date**: When the event occurred. (Date of event)
- **Event Name**: The official title of the event. (Identifier)

### Organization
External entities that interact with the club, including partners and recipients of donations. Information includes:
- **Organization Name**: Legal name of the entity. (Entity identification)
- **Address, Email Address, Phone Number**: Contact details. (Contact information)
- **Amount Donated/Received**: Financial transactions with the club. (Financial record)
- **Organization Type**: Receiver or giver. (Role classification)
- **Nonprofit or For-Profit Status**: Legal status. (Organizational nature)
- **Category**: Sector or area of focus. (Field of operation)

### Umbrella Organization
A higher-level entity that provides oversight, resources, or affiliation benefits. Key attributes:
- **Required Member Dues**: Fees associated with membership. (Financial obligation)
- **Required Reports**: Documentation or data reporting obligations. (Reporting requirement)

## ER Diagram

![ER Diagram](./ER%20Diagram.png)


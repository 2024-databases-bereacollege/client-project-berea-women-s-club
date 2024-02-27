# Berea Women Club Database Schema

### Datebase Dream Team
### Team Members & Roles
### 1. Zaki Ayoubi - Quality Control 
### 2. David Brothers - Communication Manager
### 3. Clarisse Muterateka - Project Manager
### 4. Jarine Fietsop - Project Analyst


## Schema Design Process

The schema design process involved several key steps:

1. **Conceptualization**: Starting with a conceptual E-R diagram to visualize the Berea Women Club's data requirements.
2. **Identification**: Distinguishing key entities like Organization, Member, Officer, Events, and Financial Reports.
3. **Defining Relationships**: Establishing the connections between different entities based on the club's operations and data flow.
4. **Attribute Specification**: Enumerating all necessary attributes for each entity to ensure comprehensive data coverage.


## Reflection

The original E-R Diagram has several advantages and some areas for improvement. The E-R model serves as a foundational step in database design, facilitating a clear visualization of entities, their attributes, and relationships, which is crucial for both conceptual understanding and logical design.
## Advantages of the Original E-R Model:
Clarity and Simplification: The original E-R model provided a high-level overview of the Berea Women Club data requirements, making it easier to identify the key entities and their relationships. This clarity is beneficial for stakeholders to understand the system's data structure without delving into complex database schemas.
Identification of Key Entities and Relationships: By clearly defining entities and their relationships, the model helped in identifying the crucial data points and how they interact, ensuring that all necessary information is captured and appropriately linked.
Attribute Specification: This level of detail ensured that the database would be capable of storing all necessary information in an organized manner.
## Areas for Improvement:
Incorporation of Business Rules: More explicitly integrating business rules into the conceptual model could ensure that the database design closely aligns with organizational needs and constraints. This proactive approach can reduce the need for later adjustments.
## Changes: 
Added a cardinality between officer and Income Report () . 
Changed the cardinality between Officer and Balance sheet from to  . 
Modified the verbiage between “Organization” and “Donation outflow” from the work “donates” to “contributes to”. 
We removed the Balance Sheet, Income statemet, Expense Report, and Parent Organization entities as they were redundant. 
We have adjusted our ER_Diagram and our Relational Schema to represent these changes. 

## Relational Schema

![Relational Schema](./RelationalSchema.png)

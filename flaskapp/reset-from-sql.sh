# Remove objects from the database
psql -c "DROP table IF EXISTS member;"
psql -c "DROP table IF EXISTS donatonInflow;"
psql -c "DROP table IF EXISTS donationOutflow;"
psql -c "DROP table IF EXISTS  event;"
psql -c "DROP table IF EXISTS  host;"
psql -c "DROP table IF EXISTS  organization;"


# Create tables
< tables.sql psql

# Load data back into database
< data.sql psql

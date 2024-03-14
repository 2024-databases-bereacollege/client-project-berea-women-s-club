# Remove objects from the database
psql -c "DROP table IF EXISTS example;"
psql -c "DROP table IF EXISTS othertable;"
psql -c "DROP table IF EXISTS  Donation_Ouflow;"


# Create tables
< tables.sql psql

# Load data back into database
< data.sql psql

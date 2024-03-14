# Remove objects from the database
psql -c "DROP table example;"
psql -c "DROP table othertable;"

psql -c "DELETE FROM migratehistory;"
rm -rf migrations
rm -rf migrations.json

pem init

# Use peewee-migrate to create tables from Peewee models
pem add models.OtherTable
pem add models.Example

pem watch
pem migrate

rm -rf migrations
rm -rf migrations.json

# Load data back into database
< data.sql psql

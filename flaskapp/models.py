from peewee import *

# Database Configuration
################################
mydb = PostgresqlDatabase("postgres",host="db",user="postgres",password="postgres")

class baseModel(Model):
    class Meta:
        database = mydb

# Class Definitions
# https://docs.peewee-orm.com/en/latest/peewee/models.html
class OtherTable (baseModel):
    otherid = PrimaryKeyField()
    data = CharField(null=False)

class Example (baseModel):
    username = CharField(32,unique=True)
    description = CharField(255)
    other = ForeignKeyField(OtherTable)
    isInt = BooleanField(default=0)
    isBool = BooleanField()
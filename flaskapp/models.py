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

class member (baseModel):
    memberID = PrimaryKeyField()
    firstName = CharField(255)
    lastName = CharField(255)
    email = CharField(255)
    phoneNumber = IntegerField(10)
    streetName = CharField(255)
    city = CharField(255)
    usState = CharField(255)
    zipCode = IntegerField(9)
    dateOfBirth = DateField()
    dateJoined = DateField()
    paidDues = BooleanField()
    


class donationInflow (baseModel):
    donationInflowID = PrimaryKeyField()
    category = CharField(100)
    amount = IntergerField(900)
    donationDate = DateField()
    memberID = ForeignKeyField('self', null=True, backref='member')



class donationOutflow (baseModel):
    donationInflowID = PrimaryKeyField()
    category = CharField(100)
    amount = IntergerField(900)
    donationDate = DateField()
    organizationID = ForeignKeyField('self', null=True, backref='organization')


class event (baseModel):
    eventID = PrimaryKeyField()
    eventName = CharField(255)
    eventLocation = CharField(255)
    streetName = CharField(255)
    city = CharField(255)
    usState = CharField(255)
    zipCode = IntegerField(9)
    eventDate = DateField()
    amountRaised = IntegerField(999)
    eventCost = IntegerField(999)
    eventType = CharField(255)

class host (baseModel):
    primary_key = CompositeKey(eventID, memberID)
    memberID = ForeignKeyField('self', null=True, backref='member')
    eventID = ForeignKeyField('self', null=True, backref='event')

class organization(baseModel):
    organizationID = PrimaryKeyField()
    organizationName = CharField(255)
    email = CharField(255)
    phoneNumber = IntegerField(10)
    streetName = CharField(255)
    city = CharField(255)
    usState = CharField(255)
    organizationType = CharField(255)
  

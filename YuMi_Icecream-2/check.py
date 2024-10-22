from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
ca = certifi.where()


uri = "mongodb+srv://thanactbw:Moongazer_0673@cluster0.cyzfrsk.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, tlsCAFile=ca, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
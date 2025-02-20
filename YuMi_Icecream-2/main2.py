import requests
import json
import time
from requests.auth import HTTPDigestAuth
from threading import Thread, Event

robot_ip = '192.168.125.1'
print('###########')
print('Start......')
firebaseDB = requests.Session()
firebaseDB.headers = [('Content-Type',"application/x-www-form-urlencoded")]
rws = requests.Session()

rws.auth = HTTPDigestAuth("Default User","robotics")
#rws.headers = [('Content-Type',"application/x-www-form-urlencoded")]
rws.headers = [('Content-Type',"application/x-www-form-urlencoded")]

r=rws.get('http://'+robot_ip+'/rw?json=1')
#print(json.dumps(r.json(),indent=4))

Flavor = ''




def CheckPos(event: Event):
    while(True):
        Pos = ""
        if event.is_set():
            print('The thread pause')
            
        else :
            r= rws.get('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/nPos?json=1')
            Pos = r.json()['_embedded']['_state'][0]['value']
            Pos.split(',')
            #print(Pos[1])
            #print(Pos[3])
            #print(Pos[5])
            print(Pos)
            if (Pos[1] == '0'):
                obj = {"Pos1": "Empty"}
                r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
        
            if (Pos[3] == '0'):
                obj = {"Pos2": "Empty"}
                r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
        
            if (Pos[5] == '0'):
                obj = {"Pos3": "Empty"}
                r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
            
        time.sleep(1)



def main():
    global t
    event = Event()
    t = Thread(target=CheckPos,name="a1",args=(event,)) 
    t.start()
    r= rws.get('http://'+robot_ip+'/rw/iosystem/signals/custom_DO_7?json=1')
    print(r.json()["_embedded"]["_state"][0]["lvalue"])

    DB = firebaseDB.get('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/CurrentOrder.json')
    cOrderID = DB.json()

    while(True):
        event.clear()
        listOrder = []
        processing = False
        DB = firebaseDB.get('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json')
        Queue = DB.json()
        print("Queue : "+json.dumps(Queue))
        if Queue != None:
            event.set()
            print(json.dumps(Queue,indent=4))
            for key in Queue.keys():
                listOrder.append(key)
            
            cOrder = Queue[listOrder[0]]
            print(listOrder)
            print('--------------')
            print('----Queue-----')
            print(json.dumps(Queue,indent=4))
            print('--------------')
            print('----Current Order-----')
            print(json.dumps(cOrder,indent=4))
            print('--------------')
            obj = {"CurrentOrder": listOrder[0]}
            print(json.dumps(obj,indent=4))
            
            r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
            print(r.status_code)

            DB = firebaseDB.get('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/CurrentOrder.json')
            cOrderID = DB.json()

            print(json.dumps(cOrderID,indent=4))
            if(cOrderID != None):
                print(cOrderID)
                DB = firebaseDB.get('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue/'+cOrderID+'.json')
                print(json.dumps(DB.json(),indent=4))
                cOrder = json.loads(json.dumps(DB.json()))
                
                if (cOrder['Flavor'] == 'Milk'):
                    Flavor = 'Milk'
                    obj = {"value":'\"Milk"'}
                    r= rws.post('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/sCommand?action=set',data=obj)
                    obj = {"Command": "Processing"}
                    r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                    print('Milk '+ str(r.status_code))
                    processing = True

                elif(cOrder['Flavor'] == 'Chocolate'):
                    Flavor = 'Chocolate'
                    obj = {"value":'\"Chocolate"'}
                    r= rws.post('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/sCommand?action=set',data=obj)
                    obj = {"Command": "Processing"}
                    r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                    print('Chocolate '+ str(r.status_code))
                    processing = True

                else:
                    print('Something wrong')
                retry = 0
                while(processing):
                    event.set()
                    r= rws.get('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/sCommand?json=1')
                    status = r.json()['_embedded']['_state'][0]['value']
                    print(status)
                    
                    #print(json.dumps(r.json()['_embedded']['_state'][0]['value'],indent=4))
                    if(status == '"Finish1"'):
                        obj = {"Pos1": cOrder}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        # print(r.status_code)
                        obj = {"Command": "Finish"}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        print(r.status_code)
                        print('Finish1')

                        r= rws.get('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/nPos{1}?json=1')
                        Pos1 = r.json()['_embedded']['_state'][0]['value']
                        print(Pos1)

                        r=firebaseDB.delete('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue/'+cOrderID+'.json',data = json.dumps(obj))

                        processing = False
                        event.clear()
                    elif (status == '"Finish2"'):
                        obj = {"Pos2": cOrder}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        # print(r.status_code)
                        obj = {"Command": "Finish"}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        print(r.status_code)
                        print('Finish2')

                        r= rws.get('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/nPos{2}?json=1')
                        Pos2 = r.json()['_embedded']['_state'][0]['value']
                        print(Pos2)

                        r=firebaseDB.delete('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue/'+cOrderID+'.json',data = json.dumps(obj))

                        processing = False
                        event.clear()
                    elif (status == '"Finish3"'):
                        obj = {"Pos3": cOrder}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        # print(r.status_code)
                        obj = {"Command": "Finish"}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        print(r.status_code)
                        print('Finish3')

                        r= rws.get('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/nPos{3}?json=1')
                        Pos3 = r.json()['_embedded']['_state'][0]['value']
                        print(Pos3)

                        r=firebaseDB.delete('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue/'+cOrderID+'.json',data = json.dumps(obj))

                        processing = False
                        event.clear()
                    elif (status == '"Ready"'):
                        obj = {"value" : '\"'+Flavor+'"'}
                        r= rws.post('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/sCommand?action=set',data=obj)
                        print(r)
                    else:
                        retry+=1
                        obj = {"Command": "Processing"}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        print('Processing  '+ str(retry))
                        obj = {"Progress": str(retry)}
                        r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
                        if(retry >= 10 and status =="Ready"):
                            obj = {"value" : '\"'+Flavor+'"'}
                        # obj = {"value":'\"Chocolate"'}
                            r= rws.post('http://'+robot_ip+'/rw/rapid/symbol/data/RAPID/T_ROB_L/MainModuleL/sCommand?action=set',data=obj)
                    event.clear()
                    time.sleep(0.5)
        else:
            obj = {"CurrentOrder": "Empty"}
            r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
            print(r.status_code)
            obj = {"Command": ""}
            r=firebaseDB.patch('https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json',data = json.dumps(obj))
        time.sleep(0.5)

if __name__ == "__main__":
    
    main()
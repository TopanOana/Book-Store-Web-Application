from faker import Faker
import random

fake = Faker('ro_RO')

#fake.setLocale('ro')

with open('populateEmployees.sql', 'w') as f:
    # delete all the existing records and foreign key relations

    generated_name_set = set()

    # generate new records to insert
    for i in range(1000):
        if (i % 1000 == 0):
            print(f'Generated {i * 1000} records')

        values = []
        for j in range(1000):
            #generate fake firstname 
            first_name = fake.first_name()
            first_name = first_name.replace("'", "''")
            
            #generate fake last name 
            last_name = fake.last_name()
            last_name = last_name.replace("'", "''")
                        
            # generate random phone number
            phonenumber = fake.phone_number()
            phonenumber = phonenumber.replace(" ","")
            
            #generate salary
            salary = random.randint(1000,5000)
            
            #generate fulltime
            fulltime = bool(random.randint(0,1))

            #generate storeid
            storeid = random.randint(1,1000000)
            
            
            values.append(
                f'(\'{first_name}\', \'{last_name}\', \'{phonenumber}\', {salary}, {fulltime}, {storeid})'
            )

        print(
            f'INSERT INTO EMPLOYEE (first_name, last_name, phonenumber, salary, full_time, storeID) VALUES {", ".join(values)};',
            file=f)

from faker import Faker
import random

fake = Faker()

fake.setLocale('ro')

with open('populateStores.sql', 'w') as f:
    # delete all the existing records and foreign key relations

    generated_name_set = set()

    # generate new records to insert
    for i in range(10000):
        if (i % 100 == 0):
            print(f'Generated {i * 100} records')

        values = []
        for j in range(100):
            #generate fake store name? -> using company name
            name = fake.company()
            if name in generated_name_set:
                name += f"_{i * 10000 + j}"
            else:
                generated_name_set.add(name)
            name = name.replace("'", "''")

            # generate fake address -> using locale ro
            address = fake.addres()
            address = address.replace("'", "''")

            # generate fake opening and closing hours
            openinghour = random.randint(6,12)
            closinghour = random.randint(13,22)
            
            # generate random contact number
            contactnumber = fake.phone_number()
            contactnumber = contactnumber.replace(" ","")
            

            values.append(
                f'(\'{name}\', \'{address}\', \'{contactnumber}\', {openinghour}, {closinghour})'
            )

        print(
            f'INSERT INTO STORE (store_name, address, contact_number, opening_hour, closing_hour) VALUES {", ".join(values)};',
            file=f)

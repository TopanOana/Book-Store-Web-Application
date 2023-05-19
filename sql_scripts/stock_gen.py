
import random


with open('populateStocks.sql', 'w') as f:
    # delete all the existing records and foreign key relations

    generated_pairs = set()

    # generate new records to insert
    for i in range(1000):
        if (i % 1000 == 0):
            print(f'Generated {i * 1000} records')

        values = []
        for j in range(1000):
            
            bookid = random.randint(1,1000000)
            storeid = random.randint(1,1000000)
            
            while (bookid,storeid) in generated_pairs:
                bookid = random.randint(1,1000000)
                storeid = random.randint(1,1000000)
            
            quantity = random.randint(1, 300)
            
            
            values.append(
                f'({bookid}, {storeid}, {quantity})'
            )

        print(
            f'INSERT INTO STOCK (bookID, storeID, quantity) VALUES {", ".join(values)};',
            file=f)

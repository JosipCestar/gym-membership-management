const crypto = require("crypto");



const clanovi = [
    {
      _id: crypto.randomUUID(),
      PIN: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      plan: 'Standard',
      date: new Date(2023, 0, 15).toISOString(), // Ensure date is in ISO string format
      phone_number: '123-456-7890'
    },
    {
      _id: crypto.randomUUID(),
      PIN: 2,
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      plan: 'Premium',
      date: new Date(2023, 2, 22).toISOString(), // Ensure date is in ISO string format
      phone_number: '098-765-4321'
    }
  ];
  

module.exports = {
    clanovi
}
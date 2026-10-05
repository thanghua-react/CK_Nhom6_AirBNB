import { faker } from "@faker-js/faker";

export const bookingData = {
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  totalprice: faker.number.int({
    min: 100,
    max: 1000,
  }),
  depositpaid: faker.datatype.boolean(),
  bookingdates: {
    checkin: faker.date.past(),
    checkout: faker.date.future(),
  },
  additionalneeds: faker.helpers.arrayElement([
    "Breakfast",
    "Lunch",
    "Dinner",
    "Extra pillows",
    "Late checkout",
  ]),
};
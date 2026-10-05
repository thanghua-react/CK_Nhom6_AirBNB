import test, { expect } from "@playwright/test";
import { bookingData } from "../../data/bookingData.ts";

test.describe.serial("verify update function", () => {
  let bookingID: number;
  let token: string;

  test.beforeAll(async ({ request }) => {
    // chuẩn bị dữ liệu trước khi chạy test, bookingID và token
    const response = await request.post(
      "https://restful-booker.herokuapp.com/auth",
      {
        data: {
          username: "admin",
          password: "password123",
        },
      },
    );
    const responseBody = await response.json();
    //cập nhật giá trị của token
    token = responseBody.token;

    const responseBooking = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        data: bookingData,
      },
    );

    const responseBookingBody = await responseBooking.json();
    // console.log(responseBookingBody);
    bookingID = responseBookingBody.bookingid;
  });

  test("TC02: verify update successful", async ({ request }) => {
    const response = await request.put(
      `https://restful-booker.herokuapp.com/booking/${bookingID}`,
      {
        data: bookingData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${token}`,
        },
      },
    );

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.firstname).toBe(bookingData.firstname);
    expect(responseBody.lastname).toBe(bookingData.lastname);
  });
});

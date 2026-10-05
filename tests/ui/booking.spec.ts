import { test, expect } from "../../fixtures/page-fixture.ts";
import { addDays, nightsBetween } from "../../utils/dateHelper.ts";

// Dates are relative to today so the tests do not expire
const CHECK_IN = addDays(30);
const CHECK_OUT = addDays(37);

test.describe("verify booking function", () => {
  test("booking succeeds for a logged in user", async ({
    loggedInUser,
    homePage,
    roomsPage,
    bookingPage,
  }) => {
    //step 1: open the first room of a location
    await homePage.openHoChiMinhRooms();
    await roomsPage.openFirstRoom();

    //step 2: choose check-in / check-out dates and guests
    await bookingPage.openDatePicker();
    await bookingPage.chooseDate(CHECK_IN);
    await bookingPage.chooseDate(CHECK_OUT);
    await bookingPage.closeDatePicker();
    await bookingPage.increaseGuestsTo(2);
    await expect(bookingPage.guestCount).toContainText("2");

    //step 3: book and confirm
    await bookingPage.clickBookingButton();
    await bookingPage.clickConfirm();

    //step 4: verify the success notice
    await expect(bookingPage.successNotice).toBeVisible();
  });

  test("booking is rejected for a guest who is not logged in", async ({
    page,
    homePage,
    roomsPage,
    bookingPage,
  }) => {
    //step 1: open the first room of a location
    await page.goto("/");
    await homePage.openHoChiMinhRooms();
    await roomsPage.openFirstRoom();

    //step 2: choose dates and guests
    await bookingPage.openDatePicker();
    await bookingPage.chooseDate(CHECK_IN);
    await bookingPage.chooseDate(CHECK_OUT);
    await bookingPage.closeDatePicker();
    await bookingPage.increaseGuestsTo(2);

    //step 3: try to book
    await bookingPage.clickBookingButton();

    //step 4: verify the login-required warning
    await expect(bookingPage.loginRequiredNotice).toBeVisible();
  });

  test("booking is rejected when check-in and check-out are the same day", async ({
    loggedInUser,
    homePage,
    roomsPage,
    bookingPage,
  }) => {
    //step 1: open the first room of a location
    await homePage.openHoChiMinhRooms();
    await roomsPage.openFirstRoom();

    //step 2: choose the same day for check-in and check-out
    await bookingPage.openDatePicker();
    await bookingPage.chooseDate(CHECK_IN);
    await bookingPage.chooseDate(CHECK_IN);
    await bookingPage.closeDatePicker();

    //step 3: try to book
    await bookingPage.clickBookingButton();
    await bookingPage.clickConfirm();

    //step 4: verify the system answers with a notice that is not a success
    await expect(bookingPage.anyNotice.first()).toBeVisible();
    await expect(bookingPage.successNotice).toBeHidden();
  });

  test("price per night is the same on the room card and the detail page", async ({
    page,
    homePage,
    roomsPage,
    bookingPage,
  }) => {
    //step 1: read the price on the first room card
    await page.goto("/");
    await homePage.openHoChiMinhRooms();
    const cardPrice = await roomsPage.getFirstCardPricePerNight();

    //step 2: open the room and verify the detail page shows the same price
    await roomsPage.openFirstRoom();
    await expect.poll(() => bookingPage.getPricePerNight()).toBe(cardPrice);
  });

  test("total price is calculated correctly", async ({
    page,
    homePage,
    roomsPage,
    bookingPage,
  }) => {
    //step 1: open the first room of a location
    await page.goto("/");
    await homePage.openHoChiMinhRooms();
    await roomsPage.openFirstRoom();

    //step 2: choose check-in / check-out dates
    await bookingPage.openDatePicker();
    await bookingPage.chooseDate(CHECK_IN);
    await bookingPage.chooseDate(CHECK_OUT);
    await bookingPage.closeDatePicker();

    //step 3: verify total = price per night * nights + cleaning fee
    const nights = nightsBetween(CHECK_IN, CHECK_OUT);
    const expectedTotal =
      (await bookingPage.getPricePerNight()) * nights + (await bookingPage.getCleaningFee());
    await expect(bookingPage.totalBeforeTaxes).toHaveText(String(expectedTotal));
  });
});

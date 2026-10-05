import { test, expect } from "../../fixtures/page-fixture.ts";

test.describe("verify room detail", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.goto("/");
    await homePage.openHoChiMinhRooms();
  });

  test("TC_11: open the room detail from a room card", async ({ page, roomsPage }) => {
    //step 1: remember the link of the first card, then open it
    await expect(roomsPage.roomCards.first()).toBeVisible();
    const href = await roomsPage.getFirstCardHref();
    await roomsPage.openFirstRoom();

    //step 2: verify the detail page url matches the card link
    expect(new URL(page.url()).pathname).toBe(new URL(href, page.url()).pathname);
  });

  test("room detail shows all information for a guest", async ({ roomsPage, roomDetailPage }) => {
    //step 1: open the first room
    await roomsPage.openFirstRoom();

    //step 2: verify every section of the page is shown
    await expect(roomDetailPage.roomName).toBeVisible();
    await expect(roomDetailPage.roomLocation).toBeVisible();
    await expect(roomDetailPage.roomImage).toBeVisible();
    await expect(roomDetailPage.maxGuests).toBeVisible();
    await expect(roomDetailPage.bookingForm).toBeVisible();
    await expect(roomDetailPage.loginToReviewAlert).toBeVisible();
    await expect(roomDetailPage.commentsList).toBeVisible();
  });
});

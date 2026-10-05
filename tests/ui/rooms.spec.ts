import { test, expect } from "../../fixtures/page-fixture.ts";

test("room cards show image, name, capacity and price", async ({ page, homePage, roomsPage }) => {
  //step 1: open the room list of a location
  await page.goto("/");
  await homePage.openHoChiMinhRooms();

  //step 2: verify every card shows the required information
  await expect(roomsPage.roomCards.first()).toBeVisible();
  const cards = await roomsPage.roomCards.all();
  for (const card of cards) {
    await expect(roomsPage.getCardImage(card)).toBeVisible();
    await expect(roomsPage.getCardName(card)).toBeVisible();
    await expect(roomsPage.getCardCapacity(card)).toBeVisible();
    await expect(roomsPage.getCardPrice(card)).toBeVisible();
  }
});

import { test, expect } from "../../fixtures/page-fixture.ts";

// The list holds 100+ rooms, so only the first cards are checked
const CARDS_TO_CHECK = 10;

test("room cards show image, name, capacity and price", async ({ page, homePage, roomsPage }) => {
  //step 1: open the room list of a location
  await page.goto("/");
  await homePage.openHoChiMinhRooms();

  //step 2: verify the first cards show the required information
  await expect(roomsPage.roomCards.first()).toBeVisible();
  const cards = (await roomsPage.roomCards.all()).slice(0, CARDS_TO_CHECK);
  for (const card of cards) {
    // Images are lazy-loaded, so scroll the card into view first
    await card.scrollIntoViewIfNeeded();
    await expect(roomsPage.getCardImage(card)).toBeVisible();
    await expect(roomsPage.getCardName(card)).toBeVisible();
    await expect(roomsPage.getCardCapacity(card)).toBeVisible();
    await expect(roomsPage.getCardPrice(card)).toBeVisible();
  }
});

import { test, expect } from "../../fixtures/page-fixture.ts";

test("TC_07: search rooms by location", async ({ page, homePage }) => {
  //step 1: go to home page
  await page.goto("/");

  //step 2: choose a location
  await homePage.chooseLocation("Hồ Chí Minh");

  //step 3: click search
  await homePage.clickSearchButton();

  //step 4: verify the result page matches the location
  await expect(page).toHaveURL(/ho-chi-minh/);
});

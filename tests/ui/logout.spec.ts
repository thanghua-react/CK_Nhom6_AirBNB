import { test, expect } from "../../fixtures/page-fixture.ts";

test.describe("verify logout function", () => {
  test.beforeEach(async ({ loggedInUser }) => {
    // loggedInUser fixture opens the home page and logs in
  });

  test("logout from the home page", async ({ homePage }) => {
    //step 1: open user menu and sign out
    const header = homePage.getHeaderComponent();
    await header.openUserMenu();
    await header.logout();

    //step 2: verify the logout notice and guest state
    await expect(homePage.logoutNotice).toBeVisible();
    await expect(header.guestMenuIcon).toBeVisible();
  });

  test("logout from the room list page", async ({ homePage }) => {
    //step 1: open the room list of a location
    await homePage.openHoChiMinhRooms();

    //step 2: open user menu and sign out
    const header = homePage.getHeaderComponent();
    await header.openUserMenu();
    await header.logout();

    //step 3: verify the logout notice and guest state
    await expect(homePage.logoutNotice).toBeVisible();
    await expect(header.guestMenuIcon).toBeVisible();
  });

  test("logout from the room detail page", async ({ homePage, roomsPage }) => {
    //step 1: open the room list, then the first room
    await homePage.openHoChiMinhRooms();
    await roomsPage.openFirstRoom();

    //step 2: open user menu and sign out
    const header = homePage.getHeaderComponent();
    await header.openUserMenu();
    await header.logout();

    //step 3: verify the logout notice and guest state
    await expect(homePage.logoutNotice).toBeVisible();
    await expect(header.guestMenuIcon).toBeVisible();
  });

  test("logout from the profile page", async ({ page, homePage }) => {
    //step 1: go to the profile (dashboard) page
    const header = homePage.getHeaderComponent();
    await header.openUserMenu();
    await header.clickUserMenuOption("Dashboard");
    await expect(page).toHaveURL(/info-user/);

    //step 2: sign out
    await header.openUserMenu();
    await header.logout();

    //step 3: verify the logout notice, guest state and redirect to home
    await expect(homePage.logoutNotice).toBeVisible();
    await expect(header.guestMenuIcon).toBeVisible();
    await expect(homePage.banner).toBeVisible();
  });
});

import path from "path";
import { test, expect } from "../../fixtures/page-fixture.ts";
import { env } from "../../utils/env.ts";

const AVATAR_VALID = path.resolve("data/files/avatar.jpg");
const AVATAR_INVALID = path.resolve("data/files/avatar-wrong-format.txt");
// The edit form rejects names with digits or "-" (e.g. the test account name), so use a plain name
const VALID_NAME = "Nhom Sau";

test.describe("verify profile function", () => {
  test.beforeEach(async ({ loggedInUser, homePage }) => {
    // loggedInUser fixture logs in; then open the profile (dashboard) page
    const header = homePage.getHeaderComponent();
    await header.openUserMenu();
    await header.clickUserMenuOption("Dashboard");
  });

  test("view profile page", async ({ page, profilePage }) => {
    //step 1: verify the profile url and the booking history title
    await expect(page).toHaveURL(/info-user/);
    await expect(profilePage.bookingHistoryTitle).toBeVisible();
  });

  test("update phone number", async ({ profilePage }) => {
    //step 1: open the update modal and change the phone number
    await profilePage.openUpdateModal();
    await profilePage.updateName(VALID_NAME);
    await profilePage.updatePhone(env.registerPhone);
    await profilePage.clickUpdateButton();

    //step 2: verify the success notice
    await expect(profilePage.updateSuccessNotice).toBeVisible();
  });

  test("update email fails when the email already exists", async ({
    profilePage,
  }) => {
    //step 1: open the update modal and enter an email owned by another user
    await profilePage.openUpdateModal();
    await profilePage.updateName(VALID_NAME);
    await profilePage.updateEmail(env.registerExistingEmail);
    await profilePage.clickUpdateButton();

    //step 2: verify the duplicate email message
    await expect(profilePage.getMessage("Email đã tồn tại !")).toBeVisible();
  });

  test("upload a valid avatar", async ({ profilePage }) => {
    //step 1: remember the current avatar
    const avatarBefore = await profilePage.getAvatarSrc();

    //step 2: upload a new image
    await profilePage.uploadAvatar(AVATAR_VALID);

    //step 3: verify the success notice and the avatar has changed
    await expect(profilePage.uploadSuccessNotice).toBeVisible();
    await expect.poll(() => profilePage.getAvatarSrc()).not.toBe(avatarBefore);
  });

  test("upload fails for an invalid file format", async ({ profilePage }) => {
    //step 1: try to upload a text file
    await profilePage.uploadAvatar(AVATAR_INVALID);

    //step 2: verify the format message
    await expect(
      profilePage.getMessage("Chỉ cho phép dịnh dạng (jpg, jpeg, png, gif)"),
    ).toBeVisible();
  });

  test("booking history is displayed", async ({ profilePage }) => {
    //step 1: verify the title and at least one booking
    await expect(profilePage.bookingHistoryTitle).toBeVisible();
    await expect(profilePage.bookingItems.first()).toBeVisible();
  });
});

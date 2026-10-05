import { RegisterPage } from "./../pages/RegisterPage";
import { LoginPage } from "./../pages/LoginPage";
import { HomePage } from "./../pages/HomePage";
import { test as base } from "@playwright/test";

type MyFixture = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  //thêm các page khác nếu cần
};

export const test = base.extend<MyFixture>({
  homePage: ({ page }, use) => {
    const homePage = new HomePage(page);
    //khai báo sử dụng homePage trong test
    use(homePage);
  },

  loginPage: ({ page }, use) => {
    const loginPage = new LoginPage(page);
    use(loginPage);
  },

  registerPage: ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    use(registerPage);
  },
});

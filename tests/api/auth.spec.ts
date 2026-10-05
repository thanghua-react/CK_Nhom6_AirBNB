import test, { expect } from "@playwright/test";

test("TC01: verify login successfull", async ({ request }) => {
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
  const token = responseBody.token;
  expect(response.status()).toBe(200); //kiểm tra status code trả về có phải là 200 hay không
  expect(token).toBeDefined(); //kiểm tra token có được trả về hay không
  //   console.log(responseBody);
});

const { saucedemo } = inject();

Given('the user is on the SauceDemo login page', async () => {
  await saucedemo.loginToSauceDemo();
});

When('the user enters a valid credentials', async () => {
  await saucedemo.validUserLogin();
});

Then('the user should be redirected to the products page', async () => {
  await saucedemo.productsPage();
});

When('the user adds the items to the cart', async () => {
  await saucedemo.addItemsToCart();
});

Then('the cart should display "2" items', async () => {
  await saucedemo.displayCartBadge();
});

When('the user clicks on the cart icon', async () => {
  await saucedemo.clickCart();
});

Then('the cart should contain the added items', async () => {
  await saucedemo.checkCartItems();
});

Then('the remove button removes the item {string} from the cart', async (itemName) => {
  await saucedemo.removeCartItem(itemName);
});

When('the user enters {string} in the {string} field', async (value, field) => {
  await saucedemo.enterDetails(value, field);
});

When('the user should be logged out and redirected to the login page on clicking the logout button', async () => {
  await saucedemo.logoutUser();
});

When('the user should be redirected on clicking the {string} button', async (buttonName) => {
  await saucedemo.buttonFunction(buttonName);
});

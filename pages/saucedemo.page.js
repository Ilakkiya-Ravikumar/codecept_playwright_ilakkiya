const { I } = inject();
const { pageURLs } = require('../configs/environmentFile');

module.exports = {

  acceptedUserNames: locate("//div[@id='login_credentials']"),
  acceptedPassword: locate("//div[@class='login_password']"),
  usernamefield: locate("//input[@id='user-name']"),
  passwordfield: locate("//input[@id='password']"),
  loginButton: locate("//input[@id='login-button']"),
  sauceLabsBackpack: locate("//button[@id ='add-to-cart-sauce-labs-backpack']"),
  sauceLabsBikeLight: locate("//button[@id ='add-to-cart-sauce-labs-bike-light']"),
  cartbadge: locate("//span[@data-test='shopping-cart-badge'][contains(text(), '2')]"),
  shoppingcart: locate("//a[@data-test='shopping-cart-link']"),
  removeButton : itemName => locate(`//button[contains(@data-test, "remove-${itemName}")]`),
  details: field => locate(`//input[@class='input_error form_input'][@id='${field}']`),
  openMenu: locate("//button[contains(text(),'Open Menu')]"),
  logout: locate("//*[contains(text(),'Logout')]"),
  button: buttonName => locate(`//*[@id='${buttonName}']`),

  async loginToSauceDemo () {

    await I.amOnPage(pageURLs.SAUCEDEMO_URL);
    console.log("Page loaded");
    await I.waitForPageLoad();
  },

  async validUserLogin () {

    let usernamesElement = await I.grabTextFromAll(this.acceptedUserNames);
    let usernamesText = usernamesElement[0];
    let usernamesArray = usernamesText.split('\n');
    let firstUsername = usernamesArray[1].trim();
    console.log("firstuser", firstUsername);
    let passwordElement = await I.grabTextFromAll(this.acceptedPassword);
    let passwordText = passwordElement[0];
    let passwordArray = passwordText.split('\n');
    let firstPassword = passwordArray[1].trim();
    console.log("firstpassword", firstPassword);
    console.log("user",firstUsername,"logged in");
    await I.fillField(this.usernamefield, firstUsername);
    await I.fillField(this.passwordfield, firstPassword);
    await I.clickWhenClickable(this.loginButton);
  },

  async productsPage () {
    if(I.waitInUrl('/inventory.html')){
      console.log("In products page");
    }
    else{
      console.log("Error in loading products page");
    }
  },

  async addItemsToCart () {

    await I.clickWhenClickable(this.sauceLabsBackpack);
    await I.clickWhenClickable(this.sauceLabsBikeLight);
  },

  async displayCartBadge () {

    let cartBadgeText = await I.grabTextFrom(this.cartbadge);
    if (parseInt(cartBadgeText, 10) === 2) {
      console.log('2 items added to cart');
    }
    else {
      console.log(`There are ${cartBadgeText} items in the cart`);
    }
  },

  async clickCart () {
    await I.clickWhenClickable(this.shoppingcart);
    if(I.waitInUrl('/cart.html')){
      console.log("In cart page");
    }
    else{
      console.log("Error in loading cart page");
    }
  },

  async checkCartItems () {
    const itemsToCheck = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light'
    ];
    for (let item of itemsToCheck) {
      I.see(item, '.cart_item .inventory_item_name');
      console.log(`Item ${item} present in cart`);
    }
  },

  async removeCartItem (itemName) {
    await I.clickWhenClickable(this.removeButton(itemName));
    console.log(`Item ${itemName} removed from cart`);
  },

  async enterDetails (value, field) {
    await I.fillField(this.details(field), value);
  },

  async logoutUser () {
    await I.clickWhenClickable(this.openMenu);
    await I.clickWhenClickable(this.logout);
    if(I.waitInUrl(pageURLs.SAUCEDEMO_URL)){
      console.log("User logged out");
    }
    else{
      console.log("Error logging out user");
    }
  },

  async buttonFunction (buttonName) {
    await I.scrollTo(this.button(buttonName));
    await I.clickWhenClickable(this.button(buttonName));
    if(buttonName === 'checkout' && I.waitInUrl('/checkout-step-one.html')){
      console.log("In checkout page");
    }
    else{
      console.log("Error in loading checkout page");
    }
    if(buttonName === 'continue' && I.waitInUrl('/checkout-step-two.html')){
      console.log("In overview page");
    }
    else{
      console.log("Error in loading overview page");
    }
    if(buttonName === 'finish' && I.waitInUrl('/checkout-complete') && I.see('Thank you for your order!')){
      console.log("Order placed, Thank you!");
    }
    else{
      console.log("Error placing order");
    }
  },
}
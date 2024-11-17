@saucedemo

Feature: Login and add, remove items in cart, checkout and logout on saucedemo Website

  Scenario: User logs in, adds and removes items in the cart,checks out and logs out
    Given the user is on the SauceDemo login page
    When the user enters a valid credentials
    Then the user should be redirected to the products page
    
    When the user adds the items to the cart
    Then the cart should display "2" items

    When the user clicks on the cart icon
    Then the cart should contain the added items
    And the remove button removes the item "sauce-labs-backpack" from the cart

    And the user should be redirected on clicking the "checkout" button

    When the user enters "John" in the "first-name" field
    And the user enters "Doe" in the "last-name" field
    And the user enters "12345" in the "postal-code" field
    And the user should be redirected on clicking the "continue" button

    And the user should be redirected on clicking the "finish" button

    And the user should be logged out and redirected to the login page on clicking the logout button
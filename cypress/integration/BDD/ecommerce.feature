Feature: End to end Ecommerce validation

    application Regression
    @Regression
    Scenario: Ecommerce product delivery
    Given I open Ecommerce page
    When I add items to Cart
    When Validate the total prices
    Then select the country submit and verify thankyou

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce page
    When I fill the form details 
    |name | gender |
    |bobz | Male |
    Then validate the form behaviour
    Then select the shop page
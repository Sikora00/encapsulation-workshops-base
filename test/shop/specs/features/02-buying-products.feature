Feature: Buying products

  Product can be bought by a customer if he have enough money in the wallet

  Scenario: Customer by product he is afford to.
    Given There is a product called "red apple" that cost $1
    And I am "John Doe"
    And I have $10 in my wallet
    When I buy this product
    Then I have this product on my products list
    And I have $9 left in the wallet

  Scenario: Customer can not buy product when he have not enough money
    Given There is a product called "yellow pear" that cost $2
    And I am "John Doe"
    And I have $1 in my wallet
    When I buy this product
    Then I see message "You have not enough money to buy it"

Feature: Shop for products

  Shop sell products if have them in stock

  Background:
    Given There is "red apple" with sku "1" and the price $1
    And There is a shop with $0 on the bank account

  Scenario: Sell products to customers
    Given There is a shop with 1 red apple in the stock
    And I am a customer
    When I buy red apple from the shop
    Then Shop have $1 on the bank account
    And Shop have 0 red apples in the stock

  Scenario: Can not buy if product is out of stock
    Given There is a shop with 0 red apples in the stock
    And I am a customer
    When I buy red apple from the shop
    Then I see error "There is no red apple available right now to buy"

Feature: Withdraw money from the wallet
  Money can be withdrawn if there is enough founds in the wallet

  Scenario: Withdraw money from the wallet
    Given There is a wallet with $5
    When I withdraw the money $2 from the wallet
    Then I have $2 in money
    And $3 is left in the wallet

  Scenario: Can not withdraw money from the wallet if there is not enough founds
    Given There is a wallet with $5
    When I withdraw the money $6 from the wallet
    Then I see message "You have not enough money in your wallet."

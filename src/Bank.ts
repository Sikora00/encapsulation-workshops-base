import Person from "./Person";
import Wallet from "./Wallet";

export default class Bank {
    fromWalletToCash(amount: number, person: Person, wallet: Wallet): void {
        if (wallet.getBalance() < amount) {
            throw new Error('You have not enough money in your wallet.');
        }

        wallet.withdrawMoney(amount);
        person.addCash(amount);
    }
}
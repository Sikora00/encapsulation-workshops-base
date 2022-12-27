import Person from "./Person";

export default class Bank {
    fromWalletToCash(amount: number, person: Person): void {
        if (person.getWallet().getBalance() < amount) {
            throw new Error('You have not enough money in your wallet.');
        }

        person.getWallet().withdrawMoney(amount);
        person.addCash(amount);
    }
}
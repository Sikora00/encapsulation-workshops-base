export default class Wallet {
    private balance: number = 0;
     
    addMoney(amount: number): void {
        this.balance += amount;
    }
     
    getBalance(): number {
        return this.balance;
    }
     
    withdrawMoney(amount: number): void {
        if (this.balance < amount) {
        throw new Error('You have not enough money in your wallet.');
        }
     
        this.balance -= amount;
    }
}
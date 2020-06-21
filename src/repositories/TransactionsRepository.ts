import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    const total = this.transactions.reduce((prevVal, transaction) => {
      if (transaction.type === 'income') {
        income += transaction.value;
        return prevVal + transaction.value;
      }
      outcome += transaction.value;
      return prevVal - transaction.value;
    }, 0);
    // const income = this.transactions.reduce((prevVal, transaction) => {
    //   if (transaction.type === 'income') {
    //     return prevVal + transaction.value;
    //   }
    //   return prevVal;
    // }, 0);
    // const outcome = this.transactions.reduce((prevVal, transaction) => {
    //   if (transaction.type === 'outcome') {
    //     return prevVal + transaction.value;
    //   }
    //   return prevVal;
    // }, 0);
    const finalBalance: Balance = {
      income,
      outcome,
      total,
    };

    return finalBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

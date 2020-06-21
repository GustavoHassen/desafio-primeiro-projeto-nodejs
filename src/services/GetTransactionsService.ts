import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public excute(): Response {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const response: Response = { transactions, balance };
    return response;
  }
}

export default GetTransactionsService;

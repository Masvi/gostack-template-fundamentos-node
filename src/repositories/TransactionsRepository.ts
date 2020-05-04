import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionWithBalanceDTO {
  transactions: Array<Transaction>;
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionWithBalanceDTO {
    const { income, outcome, total } = this.getBalance();
    const obj = {
      transactions: this.transactions,
      balance: {
        income,
        outcome,
        total,
      },
    };

    return obj;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(item => item.type === 'income')
      .reduce((acc, cur) => acc + Number(cur.value), 0);

    const outcome = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((acc, cur) => acc + Number(cur.value), 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

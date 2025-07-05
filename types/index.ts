export interface Transaction {
    _id: string;
    amount: number;
    description: string;
    date: string;
    category: string;
}

export interface Budget {
    category: string;
    amount: number;
    month: string;
}
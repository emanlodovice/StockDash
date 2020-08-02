export class StockPrice {
  stock: [
    {
      name: string,
      price: {
        currency: string,
        amount: number,
      },
      percent_change: number | null,
      volume: number,
      symbol: string
    }
  ]
  as_of: string // date string
}
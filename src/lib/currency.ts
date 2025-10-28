export const formatCurrency = (symbol: string, amount: number) =>
  `${symbol}${amount.toFixed(2)}`;

export const makeQuoteId = (date = new Date()) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `Q-${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}-${date.getHours()}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
};

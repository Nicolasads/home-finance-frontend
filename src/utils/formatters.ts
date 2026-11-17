const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

export const formatDate = (isoDate: string) => {
  if (!isoDate) return "-";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

export const toIsoDate = (date: Date = new Date()) =>
  date.toLocaleDateString("en-CA");

export const formatMonthLabel = (monthKey: string) => {
  const [year, month] = monthKey.split("-").map(Number);

  return new Date(year, month - 1).toLocaleDateString("pt-BR", {
    month: "short",
  });
};

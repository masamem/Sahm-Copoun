/* سوق الضوء: local Saudi Riyal artwork, readable amounts and inherited color. */
export function RiyalAmount({ value }: { value: string | number }) {
  const amount = String(value).replace(/\s*ر\.س\s*$/, "").trim();
  return (
    <span className="riyal-amount" dir="ltr" aria-label={`${amount} ريال سعودي`}>
      <span className="riyal-symbol" aria-hidden="true" />
      <span>{amount}</span>
    </span>
  );
}

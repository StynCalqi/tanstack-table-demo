const DecimalsSelect = ({ selectedDecimal, setSelectedDecimal }) => (
  <article className="flex flex-col items-center mb-4">
    <label>Choose decimals</label>
    <select
      value={selectedDecimal}
      onChange={(e) => setSelectedDecimal(e.target.value)}
    >
      <option value="1">One decimal</option>
      <option value="2">Two decimals</option>
      <option value="3">Three decimals</option>
    </select>
  </article>
);

export default DecimalsSelect;

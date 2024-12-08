function CountrySelector(props) {
  const { selectedCountry, onCountryChange } = props;
  return (
    <select
      className="select select-secondary w-full max-w-xs"
      id="country-selector"
      value={selectedCountry}
      onChange={onCountryChange}
    >
      <option value="gb">United Kingdom</option>
      <option value="us">United States</option>
      <option value="de">Germany</option>
      <option value="is">Iceland</option>
      <option value="no">Norway</option>
      <option value="au">Australia</option>
    </select>
  );
}

export default CountrySelector;

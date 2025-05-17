const Dropdown = ({ countries, onChange }) => {
    return (
      <select onChange={onChange} className="dropdown">
        {countries.map((country, index) => (
          <option key={index} value={country.cca2.toLowerCase()}>
            {country.name.common}
          </option>
        ))}
      </select>
    );
  };
  
  export default Dropdown;
  
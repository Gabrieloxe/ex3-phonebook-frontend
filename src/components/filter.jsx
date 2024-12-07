const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div className="filter-container">
      <label className="filter-label">Filter</label>
      <input
        className="filter-input"
        value={filterValue}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
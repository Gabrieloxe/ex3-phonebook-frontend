import { Input } from 'antd';

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div className='filter-container'>
      <Input
        placeholder='Filter contacts'
        value={filterValue}
        onChange={handleFilterChange}
        allowClear
      />
    </div>
  );
};

export default Filter;

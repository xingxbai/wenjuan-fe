import React, { FC, useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input;
const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const curValue = event.target.value;
    setValue(curValue);
  }

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setValue(searchParams.get(LIST_SEARCH_PARAM_KEY) || '');
  }, [searchParams]);

  function handleSearch(value: string) {
    setValue(value);
    // 1.
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
    // 2.
    //setSearchParams(`${LIST_SEARCH_PARAM_KEY}=${value}`);
  }

  return (
    <Search
      placeholder="input search text"
      onSearch={handleSearch}
      onChange={handleChange}
      allowClear
      enterButton
      value={value}
      style={{ width: '260px' }}
    />
  );
};
export default ListSearch;

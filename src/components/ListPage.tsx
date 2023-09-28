import React, { FC, useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '../constant/index';

type PropsType = {
  total: number;
};
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const current = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(current);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10;
    setPageSize(pageSize);
  }, [searchParams]);

  const nav = useNavigate();
  console.log('rd ~ file: ListPage.tsx:28 ~ nav:', useLocation());
  const { pathname } = useLocation();
  function handleChange(page: number, size: number) {
    // 如果分页size改变，current去首页
    searchParams.set(
      LIST_PAGE_PARAM_KEY,
      size !== pageSize ? '1' : page.toString(),
    );
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, size.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }
  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      current={current}
      showTotal={(total) => `Total ${total} items`}
      onChange={handleChange}
    ></Pagination>
  );
};
export default ListPage;

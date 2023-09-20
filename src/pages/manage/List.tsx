import React, { useEffect, useState } from "react";
import { Pagination } from 'antd';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
const List: React.FC = () => {

  
  const [queryParams, setQueryParams] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(()=> {
    console.log(44444, queryParams)
  }, [queryParams, page, pageSize])


  // const nav = useNavigate()
  // const { pathname } = useLocation()
  const [searchParams]= useSearchParams()
  const handlePaginationChange = (page: number, size: number) => {    // 改变pageSize情况
    if (size !== pageSize) {
      setPage(1)
    } else {
      setPage(page)
    }
    setPageSize(size)
  }
  return (
    <div>
    <Pagination
      current={page}
      pageSize={pageSize}
      total={total}
      showSizeChanger
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
      onChange={handlePaginationChange}
    />
    </div>
  )
}

export default List
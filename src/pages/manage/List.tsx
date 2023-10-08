import React, { useEffect, useState } from 'react';
import ListPage from '../../components/ListPage';
import ListSearch from '../../components/ListSearch';
const List: React.FC = () => {
  const [queryParams] = useState({});
  const [page] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    console.log(1111, queryParams);
  }, [queryParams, page, pageSize]);

  // const nav = useNavigate()
  // const { pathname } = useLocation()
  return (
    <div>
      <ListSearch></ListSearch>
      <ListPage total={139} />
    </div>
  );
};

export default List;

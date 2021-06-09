/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import ReactTable from 'react-table';
import Loader from '../../components/Loader';

const OperationsLog = ({ deviceId }) => {
  const dispatch = useDispatch();
  let operationsLog = useSelector((state) => state.operationsLogState.operationsLog);
  operationsLog = operationsLog || [];
  const loading = useSelector((state) => state.operationsLogState.isLoading);

  useEffect(() => {
    dispatch({ type: 'OPERATIONS_LOG_REQUEST', deviceId });
  }, []);

  const convertUnixTime = (unix_timestamp) => {
    const formattedTime = moment(unix_timestamp).format('MMMM Do YYYY, HH:mm:ss');
    return formattedTime;
  };

  operationsLog = operationsLog.map((item, index) => ({
    ...item,
    index: index + 1,
    updatedTime: convertUnixTime(item.updatedTime),
  }));

  return (
    <div>
      {loading && <Loader />}
      {operationsLog &&
        <ReactTable
          data={operationsLog}
          columns={[
            {
              Header: 'ID',
              accessor: 'index',
              width: 50
            },
            {
              Header: 'Action type',
              accessor: 'actionType',
            },
            {
              Header: 'Status',
              accessor: 'status',
            },
            {
              Header: 'Created By',
              accessor: 'Created_By',
            },
            {
              Header: 'Time',
              accessor: 'updatedTime',
            },
          ]}
          defaultPageSize={10}
          showPaginationBottom
          className="-striped -highlight custom-table"
        />
      }
    </div>
  );
};

export default OperationsLog;

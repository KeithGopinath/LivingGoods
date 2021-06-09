/*eslint-disable*/
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Loader from '../../components/Loader';
import './style.scss'
import ReactTable from 'react-table';
import { removeUnderscore } from '../../utils/containerFunctions';

const AuditLog = ({ deviceId }) => {
  const dispatch = useDispatch();
  const auditLogs = useSelector((state) => state.auditLogsState.auditLogs);
  const loading = useSelector((state) => state.auditLogsState.isLoading);

  useEffect(() => {
    dispatch({ type: 'AUDIT_LOG_REQUEST', deviceId });
  }, []);

  // Device info data
  const DeviceInfo = (item) => {
    let deviceInfo = []
    for (let key in item) {
      item[key] &&
        deviceInfo.push(Object.assign({ value: item[key].toString(), key: key }))
    }
    deviceInfo = removeUnderscore(deviceInfo);
    deviceInfo = deviceInfo.map((item, index) => ({
      index: index + 1,
      value: item.value,
      key: item.key
    }))
    return deviceInfo
  }

  return (
    <div>
      {loading && <Loader />}
      {auditLogs &&
        <Scrollbars style={{ height: 530 }}>
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            {auditLogs.map((item, index) => {
              return (
                <div key={`auditkey${index + 1}`} className="panel panel-default">
                  <div className="panel-heading" role="tab">
                    <h4 className="panel-title">
                      <a className="collapsed" role="button" data-toggle="collapse" href={`#collapse${index + 1}`} data-parent="#accordion">
                        <span className="acc-title">Report {item.version}{item.Last_Modified_Date}</span>
                      </a>
                    </h4>
                  </div>
                  <div id={`collapse${index + 1}`} className="panel-collapse collapse" role="tabpanel">
                    <div className="panel-body">
                      <ReactTable
                        data={DeviceInfo(item)}
                        columns={[
                          {
                            Header: 'ID',
                            accessor: 'index',
                            width: 50
                          },
                          {
                            Header: 'Device Details',
                            accessor: 'key',
                          },
                          {
                            accessor: 'value',
                            sortable: false,
                          },
                        ]}
                        defaultPageSize={10}
                        showPaginationBottom
                        className="-striped -highlight custom-table"
                      />
                    </div>
                  </div>
                </div>
              );
            })
            }
          </div>
        </Scrollbars>
      }
    </div>
  );
};

export default AuditLog;

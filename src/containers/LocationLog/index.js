/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import floor from 'lodash/floor';
import ReactTable from 'react-table';
import moment from 'moment';
import Map from '../../components/Map';
import Loader from '../../components/Loader';

const LocationLog = ({ deviceId }) => {
    const dispatch = useDispatch();
    const locationLogs = useSelector((state) => state.locationLogsState.locationLogs);
    const [mapLat, setMapLat] = useState('');
    const [mapLong, setMapLong] = useState('');
    const loading = useSelector((state) => state.locationLogsState.isLoading);

    useEffect(() => {
        dispatch({ type: 'LOCATION_LOG_REQUEST', deviceId });
    }, []);

    useEffect(() => {
        if(locationLogs && locationLogs.length>0){
            setMapLat(locationLogs[0].latlong[0]);
            setMapLong(locationLogs[0].latlong[1]);
        }
    }, [locationLogs]);

    const locationLogsModified = () => {
        const result = locationLogs && locationLogs.map((item, index) => ({
            index: index + 1,
            time: convertUnixTime(item.updatedTime),
            latitude: isNaN(item.latlong[0]) ? item.latlong[0] : item.latlong[0] ? floor(item.latlong[0], 5) : "--",
            longitude: isNaN(item.latlong[1]) ? item.latlong[1] : item.latlong[1] ? floor(item.latlong[1], 5) : "--",
        }));
        return result;
    };

    const changeMap = (data) => {
        setMapLat(data.original.latitude);
        setMapLong(data.original.longitude);
    };

    const convertUnixTime = (unix_timestamp) => {
        const formattedTime = moment(unix_timestamp).format('MMMM Do YYYY, HH:mm:ss');
        return formattedTime;
    };

    return (
        <div>
            <Row>
                <Col md={8}>
                    {loading && <Loader />}
                    {locationLogsModified() && (
                        <ReactTable
                            data={locationLogsModified()}
                            columns={[
                                {
                                    Header: 'ID',
                                    accessor: 'index',
                                    width: 50
                                },
                                {
                                    Header: 'Latitude',
                                    accessor: 'latitude',
                                    width: 100
                                },
                                {
                                    Header: 'Longitude',
                                    accessor: 'longitude',
                                    width: 100
                                },
                                {
                                    Header: 'Time',
                                    accessor: 'time',
                                    width: 210
                                },
                                {
                                    Header: 'View',
                                    accessor: 'view',
                                    width: 50,
                                    sortable: false,
                                    Cell: (original) => (
                                        <FontAwesomeIcon className="icons" onClick={() => changeMap(original)} icon={faMapMarkerAlt} size="lg"></FontAwesomeIcon>
                                    ),
                                },
                            ]}
                            defaultPageSize={10}
                            showPaginationBottom
                            className="-striped -highlight custom-table"
                        />
                    )}
                </Col>
                <Col md={4}>
                    {locationLogs && <Map lat={mapLat} lng={mapLong} />}
                </Col>
            </Row>
        </div>
    );
};

export default LocationLog;

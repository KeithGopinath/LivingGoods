/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Col, Row, FormGroup, ControlLabel } from 'react-bootstrap';
import Select from 'react-select';
import ChartistGraph from 'react-chartist';
import { VectorMap } from 'react-jvectormap';
import Card from '../../components/Card';
import StatsCard from '../../components/StatsCard';
import { getCountRequest } from '../../actionCreators/Count';
import { getCountByLocationRequest } from '../../actionCreators/CountByLocation';
import { getCountByModelRequest } from '../../actionCreators/CountByModel';
import { getHealthRequest } from '../../actionCreators/Health';
import { getVendorChartRequest } from '../../actionCreators/VendorChart';
import { getStatusChartRequest } from '../../actionCreators/StatusChart';
import Headerbar from '../../components/HeaderBar';
import Sidebar from '../../components/SideBar';
import { history } from '../../routes';
import PieChart, { Legend, Series, Label, Font } from 'devextreme-react/pie-chart';
import ctPointLabels from 'chartist-plugin-pointlabels';
import { CChart } from '@coreui/react-chartjs'


const Dashboard = () => {
  const [branchName, setBranchName] = useState();

  const dispatch = useDispatch();

  const count = useSelector((state) => state.countState.count);
  const health = useSelector((state) => state.healthState.health);
  const vendorChart = useSelector((state) => state.vendorChartState.vendorChart);
  const statusChart = useSelector((state) => state.statusChartState.statusChart);
  const countByLocation = useSelector((state) => state.countByLocationState.countByLocation);
  const countByModel = useSelector((state) => state.countByModelState.countByModel);

  const mapData = {
    UG: 500,
    KE: 300,
  };

  useEffect(() => {
    dispatch(getCountByModelRequest());
    dispatch(getCountRequest());
    dispatch(getHealthRequest());
    dispatch(getVendorChartRequest());
    dispatch(getStatusChartRequest());
    dispatch(getCountByLocationRequest());
  }, []);

  useEffect(() => {
    setBranchName({ value: 0, label: countByModel && countByModel[0].BranchName })
  }, [countByModel]);

  const vendor = vendorChart && vendorChart.byVendor;
  const battery = health && health.batterySlab;
  const ram = health && health.ramSlab;

  // Vendor pie chart
  let vendorPie = []
  for (let key in vendor) {
    vendorPie.push(Object.assign({ count: vendor[key], brand: key }))
  }

  // status bar chart
  const deviceStatusLabels = [];
  const deviceStatusDataPoints = [];
  for (let key in statusChart) {
    deviceStatusLabels.push(key.replace(/\_/g, ' '))
    deviceStatusDataPoints.push(statusChart[key])
  }

  const deviceStatusData = [{
    label: 'Number of devices',
    backgroundColor: 'rgba(100,149,237)',
    borderColor: 'rgba(255,99,132)',
    pointBackgroundColor: 'rgba(255,99,132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(255,99,132)',
    tooltipLabelColor: 'rgba(255,99,132)',
    data: deviceStatusDataPoints
  }]

  const labels = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'];

  // duplicate array with label key and 0 value for Ram and Battery
  const ramArr = labels.reduce((acc, curr) => (acc[curr] = 0, acc), {});
  const batteryArr = labels.reduce((acc, curr) => (acc[curr] = 0, acc), {});

  // comparing ramArray and labels and replacing the values in ramArray
  if (ram) {
    for (const [key, val] of Object.entries(ram)) {
      if (key in ramArr) {
        ramArr[key] = val;
      }
    }
  }

  // comparing batteryArray and labels and replacing the values in batteryArray
  if (battery) {
    for (const [key, val] of Object.entries(battery)) {
      if (key in batteryArr) {
        batteryArr[key] = val;
      }
    }
  }

  const ramValue = Object.values(ramArr);
  const batteryValue = Object.values(batteryArr);

  const dataHealth = {
    labels,
    series: [
      batteryValue,
      ramValue,
    ],
  };

  const optionsHealth = {
    low: 0,
    high: 50,
    showArea: false,
    height: '300px',
    axisX: {
      showGrid: false,
    },
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      right: 50,
    },
    plugins: [ctPointLabels({
      textAnchor: 'middle', labelInterpolationFnc: (value) => { if (typeof value === "undefined") return "0"; else return value; }
    })]
  };

  // Device count by location chart
  const countByLocationLabels = [];
  const countByLocationDataPoints = [];
  countByLocation && countByLocation.map((data) => {
    countByLocationLabels.push(data.BranchName)
    countByLocationDataPoints.push(data.Count)
  })

  const countByLocationData = [
    {
      label: 'Number of devices',
      backgroundColor: 'rgba(255,69,0)',
      borderColor: 'rgba(255,99,132)',
      pointBackgroundColor: 'rgba(255,99,132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132)',
      tooltipLabelColor: 'rgba(255,99,132)',
      data: countByLocationDataPoints
    }
  ]

  // Device count by type on location chart
  const branchOptions = countByModel && countByModel.map((data, index) => ({
    value: index,
    label: `${data.BranchName}`
  }))

  var uniq = {}
  var filteredBranchOptions = branchOptions && branchOptions.filter(obj => !uniq[obj.label] && (uniq[obj.label] = true));

  const onBranchChange = (name) => {
    setBranchName(name);
  }

  const countByTypeLabels = []
  const countByTypeDataPoints = []

  countByModel && countByModel.filter(val => val.BranchName.includes(branchName && branchName.label)).map((data) => {
    countByTypeLabels.push(data.ModelName)
    countByTypeDataPoints.push(data.Count)
  })

  const countByTypeData = [
    {
      label: 'Number of devices',
      backgroundColor: 'rgba(186,85,211)',
      pointBackgroundColor: 'rgba(255,99,132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132)',
      tooltipLabelColor: 'rgba(255,99,132)',
      data: countByTypeDataPoints
    }
  ]

  return (
    <div className="wrapper">
      <Sidebar history={history} />
      <div className="main-panel">
        <Headerbar headerName="Dashboard" />
        <div className="main-content">
          <Grid fluid>
            <Row>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-users text-warning" />}
                  statsText="Users"
                  statsValue={count && count.totalUsers}
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-users text-success" />}
                  statsText="Active Users"
                  statsValue={count && count.activeUser}
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-phone text-warning" />}
                  statsText="Devices"
                  statsValue={count && count.totalDevices}
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-phone text-success" />}
                  statsText="Active Devices"
                  statsValue={count && count.inUseDevices}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card
                  title="Device Status"
                  // category="Based on individual device status"
                  content={
                    <Row>
                      <Col md={5}>
                        <div className='status-chart'>
                          <CChart
                            type="bar"
                            datasets={deviceStatusData}
                            options={{
                              aspectRatio: 1.2,
                              tooltips: {
                                enabled: true
                              },
                              scales: {
                                xAxes: [{
                                  gridLines: {
                                    display: false
                                  }
                                }],
                                yAxes: [{
                                  gridLines: {
                                    display: true
                                  }
                                }]

                              }
                            }}
                            labels={deviceStatusLabels}
                          />
                        </div>
                      </Col>
                      <Col md={7}>
                        <VectorMap
                          map="africa_mill"
                          backgroundColor="transparent"
                          zoomOnScroll={false}
                          focusOn={{
                            x: 1.5,
                            y: 0.5,
                            scale: 2.6
                          }}
                          containerStyle={{
                            width: '100%',
                            height: '360px',
                          }}
                          containerClassName="map"
                          regionStyle={{
                            initial: {
                              fill: '#e4e4e4',
                              'fill-opacity': 0.9,
                              stroke: 'none',
                              'stroke-width': 0,
                              'stroke-opacity': 0,
                            },
                          }}
                          series={{
                            regions: [
                              {
                                values: mapData,
                                scale: ['#AAAAAA', '#444444'],
                                normalizeFunction: 'polynomial',
                              },
                            ],
                          }}
                        />
                      </Col>
                    </Row>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <Card
                  title="Vendors"
                  // category="Mix of different types of Vendors"
                  content={<PieChart
                    id="pie"
                    palette="Bright"
                    dataSource={vendorPie}
                    resolveLabelOverlapping="shift"
                  >
                    <Legend
                      orientation="horizontal"
                      itemTextPosition="right"
                      horizontalAlignment="center"
                      verticalAlignment="bottom"
                      columnCount={7} />
                    {/* <Export enabled={true} /> */}
                    <Series argumentField="brand" valueField="count">
                      <Label
                        visible={true}
                        position="columns"
                      >
                        <Font size={16} />
                        {/* <Connector visible={true} width={0.3} /> */}
                      </Label>
                    </Series>
                  </PieChart>}
                />
              </Col>
              <Col md={7}>
                <Card
                  title="Device Health"
                  // category="Based on Ram and battery"
                  calendar
                  content={
                    <ChartistGraph
                      data={dataHealth}
                      type="Line"
                      options={optionsHealth}
                    />
                  }
                  legend={
                    <div>
                      <i className="fa fa-circle text-info" /> Battery
                  <i className="fa fa-circle text-danger" /> RAM
                  <p id="ylabel">no of devices</p>
                      <p id="xlabel">health %</p>
                    </div>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card
                  title="Device Count By Location"
                  content={
                    <CChart
                      type="bar"
                      datasets={countByLocationData}
                      options={{
                        aspectRatio: 3,
                        tooltips: {
                          enabled: true
                        },
                        scales: {
                          xAxes: [{
                            gridLines: {
                              display: false
                            }
                          }],
                          yAxes: [{
                            gridLines: {
                              display: true
                            }
                          }]

                        }
                      }}
                      labels={countByLocationLabels}
                    />
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card
                  title="Devices By Model On Location"
                  content={
                    <div>
                      <Col md={4}>
                        <FormGroup>
                          <ControlLabel>
                            Branch:
                        </ControlLabel>
                          <Select
                            name="branchName"
                            value={branchName}
                            onChange={onBranchChange}
                            options={filteredBranchOptions}
                            isSearchable
                          />
                        </FormGroup>
                      </Col>
                      <CChart
                        type="doughnut"
                        datasets={countByTypeData}
                        options={{
                          aspectRatio: 3,
                          tooltips: {
                            enabled: true
                          }
                        }}
                        labels={countByTypeLabels}
                      />
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

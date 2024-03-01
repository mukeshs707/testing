import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor"
import { Link } from "react-router-dom"
import moment from "moment"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import axios from "axios"
// import { toast } from "react-toastify"
import { dateformat, dateTimeformat } from "admin/commonFunction"
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination"
import { apiRoute } from "routes/apiRoutes"

const CardUser = ({ resultGraphStats, dataColors }) => {

  const apexCardUserChartColors = getChartColorsArray(dataColors)

  const series = [
    {
      name: "Transactions",
      data: [120, 160, 450, 360, 400, 600, 752, 850, 700, 800, 950, 1460],
    },
  ]

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: apexCardUserChartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories:
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
    },

    markers: {
      size: 3,
      strokeWidth: 3,

      hover: {
        size: 4,
        sizeOffset: 2,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  }

  return (
    <React.Fragment>
      <Card className="mb-2">
        <CardBody className="border">
          <Row>
            <Col lg="9" sm="6" className="pt-3">
              <h4 className="card-title mb-4">Transactions</h4>
              <div className="mt-4">
                <div id="wallet-balance-chart" className="mt-2">
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={300}
                    className="apex-charts"
                  />
                </div>
              </div>
            </Col>
            <Col lg="3">
              <div className="mt-0">
                <Row className="mt-4">
                  <Col xs="12" className="mb-0">
                    <Card
                      className="pb-0 mb-2"
                      style={{ backgroundColor: "rgb(41 42 50)" }}
                    >
                      <div className="p-4">
                        <Link to="/admin/dashboard">
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p
                                className="mb-2 text-white"
                                style={{ fontSize: "15px" }}
                              >
                                Today's Transactions
                              </p>
                              <h5 className="mb-0" style={{ color: "white" }}>
                                $950.00
                              </h5>
                            </div>
                            <div className="avatar-sm ms-auto">
                              <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                <i
                                  className="bx bxs-user-circle"
                                  style={{ color: "#4c4747" }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Card>

                    <Card
                      className="pb-0 mb-2"
                      style={{ backgroundColor: "rgb(41 42 50)" }}
                    >
                      <div className="p-4">
                        <Link to="/admin/dashboard">
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p
                                className="mb-2 text-white"
                                style={{fontSize: "15px" }}
                              >
                                Last 7 Days
                              </p>
                              <h5 className="mb-0" style={{ color: "white" }}>
                                $2456.00
                              </h5>
                            </div>
                            <div className="avatar-sm ms-auto">
                              <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                <i
                                  className="bx bxs-user-circle"
                                  style={{ color: "#4c4747" }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Card>

                    <Card
                      className="pb-0 mb-2"
                      style={{ backgroundColor: "rgb(41 42 50)" }}
                    >
                      <div className="p-4">
                        <Link to="/admin/dashboard">
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p
                                className="mb-2 text-white"
                                style={{ fontSize: "15px" }}
                              >
                                Last 30 Days
                              </p>
                              <h5 className="mb-0" style={{ color: "white" }}>
                                $9658.00
                              </h5>
                            </div>
                            <div className="avatar-sm ms-auto">
                              <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                <i
                                  className="bx bxs-user-circle"
                                  style={{ color: "#4c4747" }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>

      </Card>
    </React.Fragment>
  )
}

CardUser.propTypes = {
  options: PropTypes.any,
  series: PropTypes.any,
}

export default CardUser

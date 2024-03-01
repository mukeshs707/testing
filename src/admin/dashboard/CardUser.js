import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap"

//Import Images
import avatar1 from "../../assets/images/Logo.png"
import axios from "axios"
//import components
import { JobWidgetCharts } from '../JobCharts';

import '../../assets/scss/style.css'

function CardUser(props) {
  const [settingsMenu, setSettingsMenu] = useState(false)
  const graph1 = [{
    name: "Job View",
    data: [36, 21, 65, 22, 35, 50, 87, 98],
  }];

  return (
    <React.Fragment>

      <Row>
        <Col lg="12">
          <Card className="mb-2">
            <CardBody className="border">
              <Row className="background-user-image">
                <Col lg="3" className="p-0 pt-3 ps-3 m-0">
                  <div className="d-flex">
                    <div className="me-3">

                      <img
                        src={avatar1}
                        alt=""
                        className="avatar-md rounded img-thumbnail p-3"
                        // style={{
                        //   backgroundColor: "white",
                        //   height: "4.5rem",
                        //   width: "14.0rem",
                        // }}
                      />
                    </div>

                  </div>
                </Col>

                <Col lg="9" className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      <Col xs="3">
                        <div className="py-4">
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2 font-size-16">Total Deals</p>
                              <h5 className="mb-0"> 365 </h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div className="py-4">
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2 font-size-16">Liquidity Pools</p>
                              <h5 className="mb-0"> 152 </h5>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col xs="3">
                        <div className="py-4">
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2 font-size-16">
                                Total Tranactions
                              </p>
                              <h5 className="mb-0"> $10965.00 </h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div className="py-4">
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2 font-size-16">
                                Today's Tranactions
                              </p>
                              <h5 className="mb-0"> $950.00 </h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CardUser

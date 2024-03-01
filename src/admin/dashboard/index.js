import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router'
import { Card, CardBody, Col, Row, Container, Badge, CardTitle, Table } from "reactstrap";
//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

// Pages Components
import CardUser from "./CardUser";
import ChartUser from "./Chart";
import NFTUser from "./NFT";
import Transactions from "./Transactions";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import '../../assets/scss/style.css'

const Dashboard = props => {

  //meta title
  document.title = "Dashboard";
  const history = useHistory();
  const BASE_PATH = process.env.REACT_APP_BASE_PATH;


  return (
    <React.Fragment>
      <div className="page-content margin-custom">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          /> */}

          <Row>
            <Col xl="12">
              <CardUser resultStats="" dataColors='["--bs-primary", "--bs-warning"]' />
            </Col>
            <Col xl="12">
              <ChartUser resultGraph="" resultGraphStats="" dataColors='["--bs-secondary", "--bs-warning"]' />
            </Col>
          </Row>

        </Container>
      </div>

    </React.Fragment>
  );
};


Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);

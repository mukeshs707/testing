import React from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, CardTitle } from "reactstrap";
import ChartistGraph from "react-chartist"
import { Link } from "react-router-dom"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import RadialChart from "./RadialChart"

// import NFTImage6 from '../../assets/images/project/car-club.png'
// const NFTImage6 = 'https://www.thenationalnews.com/resizer/NjyJNGFNNLwF-1Pgz9i0p-kJ5xA=/arc-photo-thenational/eu-central-1-prod/public/PMMVOE25V7RB6GFYJR27KFPPCY.jpg';
const NFTImage4 = 'https://img.traveltriangle.com/blog/wp-content/uploads/2019/05/Worlds-Largest-Ferris-Wheel.jpg';
const NFTImage8 = 'https://offloadmedia.feverup.com/secretdubai.co/wp-content/uploads/2022/05/24115355/The-Pods-featured-image-e1653381624319.jpg';
const NFTImage2 = 'https://images.otstatic.com/prod1/47794124/3/huge.jpg';


const piechart = ({ resultCollection }) => {

    const BASE_PATH = process.env.REACT_APP_BASE_PATH;

    return (
        <React.Fragment>
            <Card className="mb-2">
                <CardBody className="border">
                    <Row>
                        <Col lg="4" className="border-end d-none">
                            <h4 className="card-title mb-4">NFT Categories</h4>
                            <Row className="justify-content-center">

                                <Col sm={4}>
                                    <Row className="mt-2">
                                        <Col xs="12" className="mb-0">
                                            <div className="me-3">
                                                <p className="text-muted mb-2"> <span className="bg-primary" style={{ padding: '0px 12px 0px 7px', borderRadius: '12px', marginRight: '5px' }}></span> Blue Coral </p>
                                                <h5 className="mb-0 ps-4">08</h5>
                                            </div>

                                            <div className="me-3 mt-3">
                                                <p className="text-muted mb-2"> <span className="bg-success" style={{ padding: '0px 12px 0px 7px', borderRadius: '12px', marginRight: '5px' }}></span> The Little Things </p>
                                                <h5 className="mb-0 ps-4">10</h5>
                                            </div>

                                            <div className="me-3 mt-3">
                                                <p className="text-muted mb-2"> <span className="bg-danger" style={{ padding: '0px 12px 0px 7px', borderRadius: '12px', marginRight: '5px' }}></span> Blu Kiosk </p>
                                                <h5 className="mb-0 ps-4">09</h5>
                                            </div>
                                            <div className="me-3 mt-3">
                                                <p className="text-muted mb-2"> <span className="bg-warning" style={{ padding: '0px 12px 0px 7px', borderRadius: '12px', marginRight: '5px' }}></span> MUMUSO </p>
                                                <h5 className="mb-0 ps-4">12</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={8}>
                                    <RadialChart dataColors='["#143","--bs-success", "--bs-danger", "--bs-warning"]' />
                                </Col>
                            </Row>

                        </Col>
                        <Col lg="12" sm="12" className="ps-4">
                            <Row>
                                <Col xl="6" xs="6">
                                    <h4 className="card-title mb-4">Recent Collections</h4>
                                </Col>
                                <Col xl="6" xs="6" className="text-end">
                                    <Link to="/admin/nft/collections" className="btn btn-light me-1 btn-sm"> View All </Link>
                                </Col>
                                {
                                    resultCollection.map((value, index) => {
                                        return <Col xl="2" xs="6" className="mt-3" key={index}>
                                            <Link to={`/admin/nft/collection/${value._id}`}>
                                                <Card>
                                                    <div className="nft-category-image">
                                                        <img
                                                            src={BASE_PATH +'' +value.logoImg}
                                                            alt=""
                                                            className="card-img-top img-fluid rounded"
                                                        />
                                                    </div>
                                                    <div className="py-2">
                                                        <b>{value.name}</b> <br />
                                                        <span className="text-black">  Price : {value.ticket_price} ETH{" "} </span>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </Col>
                                    })
                                }

                            </Row>
                        </Col>
                    </Row>
                </CardBody>

            </Card>
        </React.Fragment>
    );
};

export default piechart;

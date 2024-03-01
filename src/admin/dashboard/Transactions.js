import React from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, CardTitle, Table } from "reactstrap";
import { Link } from "react-router-dom"

// import img3 from "../../assets/images/small/img-3.jpg";
// import img4 from "../../assets/images/small/img-4.jpg";
// import img6 from "../../assets/images/small/img-6.jpg";
// import img7 from "../../assets/images/small/img-7.jpg";

// import event2 from "../../assets/images/events/event-1.jpg";
// import event3 from "../../assets/images/events/event-2.jpg";
import { dateformat, dateTimeformat } from "admin/commonFunction";

const event2 = 'https://i0.wp.com/opvapeshop.com/wp-content/uploads/2019/11/IMG_2511.jpeg?fit=1568%2C1176&ssl=1';
const event3 = 'https://www1.lovethatdesign.com/wp-content/uploads/2021/09/Love-That-Design-L_eto-Cafe-Dubai-10-1024x767.jpg';
const NFTImage3 = 'https://dynamicassets.azureedge.net/uploads/offer/mainPicture/5c7275d8b1a1f.jpg';
const NFTImage4 = 'https://0.rc.xiniu.com/g1/M00/4A/65/CgAGS2Cs0KCAc-k6AB-zgwpRdxE408.png';
const NFTImage5 = 'https://0.rc.xiniu.com/g1/M00/4A/65/CgAGS2Cs0SyAJHmNAAIcipWQs1Y19.jpeg';
const NFTImage6 = 'https://www.aquariumsource.com/wp-content/uploads/2020/07/betta-fish-laying-bottom-of-tank-380x220.jpg';
const NFTImage7 = 'https://www.visitsealife.com/sydney/media/xopndkc2/blacktip-reef-shark-3.jpg?anchor=center&mode=crop&format=webp&quality=80&width=600&height=460';
const NFTImage8 = 'https://indiansinuae.org/wp-content/uploads/2021/07/large-aquarium-dubai-united-arab-emirates.jpg';
const NFTImage9 = 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/95/b8.jpg';
const NFTImage10 = 'https://bluewatersdubai.ae/-/media/Project/MeraasEcosystem/Bluewater/Shop/The-Little-Things/1.jpg';
const NFTImage11 = 'https://bluewatersdubai.ae/-/media/Project/MeraasEcosystem/Bluewater/Shop/The-Little-Things/4.jpg';
const NFTImage12 = 'https://www.figstop.com/wp-content/uploads/2022/01/Marvel-Action-Figures-Little-Things-Bluewaters-Dubai.jpg';
const NFTImage13 = 'https://kadabook-development.s3.amazonaws.com/media/Place_Images/blu-kiosk-dubai-mall/Gallery/98aa75d2-ec1c-47cc-be3d-5ca5b8215edc-h.jpeg';
const NFTImage14 = 'https://lh5.googleusercontent.com/p/AF1QipNt_fpS0NwzfyUp8nmPYTo4qioo9yhPMQRHepGo=w500-h500-k-no';


const transactions = ({ latestTransaction, resultEvent }) => {

    const BASE_PATH = process.env.REACT_APP_BASE_PATH;

    return (
        <React.Fragment>
            <Card>
                <CardBody className="border">
                    <Row>
                        <Col xl={8} className="border-end pe-3">
                            <Row>
                                <Col xl="6" xs="6">
                                    <h4 className="card-title mb-4">Recent Transactions</h4>
                                </Col>
                                <Col xl="6" xs="6" className="text-end">
                                    <Link to="/admin/transactions" className="btn btn-light me-1 btn-sm"> View All </Link>
                                </Col>

                                <Col xl="12" xs="12" className="mt-3">

                                    <div className="table-responsive">
                                        <Table className="table align-middle table-nowrap">
                                        <thead className="table-light">
                                            <tr>
                                                <th> Collection </th>
                                                <th> User </th>
                                                <th> Type </th>
                                                <th> NFT's </th>
                                                <th> Amount </th>
                                            </tr>
                                        </thead>
                                            <tbody>

                                                {
                                                    latestTransaction.length == 0 ? (
                                                        <tr>
                                                            <td>No Record Found</td>
                                                        </tr>
                                                    ) : (
                                                        latestTransaction.map((element, index) => {
                                                            return (

                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <img
                                                                                src={BASE_PATH + element?.collection?.logoImg}
                                                                                className="avatar-sm me-3 rounded-circle"
                                                                                alt="img"
                                                                            />
                                                                            <div className="">
                                                                                <h5 className="font-size-14 mb-1"> {element?.collection?.name} </h5>
                                                                                <p className="text-muted mb-0">Created At : {dateformat(element?.collection?.createdAt)}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="">
                                                                            <h5 className="font-size-14 mb-0">{element?.userdetails?.name}</h5>
                                                                            <p className="p-0"> {element?.userdetails?.email} </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="">
                                                                            <h5 className="font-size-14 mb-0">Mint</h5>
                                                                            <p className="font-size-14 text-muted mb-0">
                                                                                {element.txhash && element.txhash.slice(0, 10)}.....{element.txhash && element.txhash.slice(
                                                                                    element.txhash.length - 4,
                                                                                    element.txhash.length
                                                                                )} &nbsp; <i className="mdi mdi-content-copy" onClick={() => handleCopy(element.txhash)} style={{ cursor: 'pointer' }}></i>
                                                                                &nbsp; <a href={`https://goerli.etherscan.io/tx/${element.txhash}`} target="_blank" rel="noreferrer"> <i className="mdi mdi-open-in-new ms-1"></i> </a>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="">
                                                                            <h5 className="font-size-14 text-muted mb-0">
                                                                                {element.nfts && Number(element?.nfts)}
                                                                            </h5>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="">
                                                                            <h5 className="font-size-14 text-muted mb-0">
                                                                                {element?.value} ETH
                                                                            </h5>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={4} className="ps-3">

                            <Row>
                                <Col xl="6" xs="6">
                                    <h4 className="card-title mb-4">Recent Events</h4>
                                </Col>
                                <Col xl="6" xs="6" className="text-end">
                                    <Link to="/admin/event/shows" className="btn btn-light me-1 btn-sm"> View All </Link>
                                </Col>

                                {
                                    (resultEvent.length > 0) && resultEvent.map((value, index) => {
                                        return <Col xl={6} key={index}>
                                            <Card>
                                                <img
                                                    className="card-img-top img-fluid rounded"
                                                    src={BASE_PATH + '' + value.logo}
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <div className="p-3">
                                                    <b> {value.name} </b> <br />
                                                    {dateTimeformat(value.createdAt)}
                                                </div>
                                            </Card>
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

export default transactions;

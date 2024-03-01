import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Card, CardBody, Col, Row, CardTitle } from "reactstrap";
import { Link } from "react-router-dom"


const img3 = 'https://www.timeoutdubai.com/cloud/timeoutdubai/2022/02/16/Botanica-10-1024x768.jpg';
const img4 = 'https://www.timeoutdubai.com/cloud/timeoutdubai/2022/04/29/KyYMsEXl-D29A8361-1200x800.jpg';
const img5  = "https://mydubai.media/wp-content/uploads/2021/11/image-104.jpg";
const img6  = "https://imagevars.gulfnews.com/2021/11/18/reader-picture_17d32f350ad_original-ratio.jpg";
const img7  = "https://images.otstatic.com/prod1/47794124/3/huge.jpg";
const img11 = "https://dubaitraveladventure.com/wp-content/uploads/2018/10/then-ain-dubai-1024x1024.jpg";

const NFTImage1 = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Ferris_Wheel_Ain_Dubai_in_Dubai_02.jpg';
const NFTImage2 = 'https://dubaieyewheel.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-13-at-12.02.43-AM-300x300.jpeg';
const NFTImage3 = 'https://www.traveller.com.au/content/dam/images/h/2/1/0/x/2/image.related.socialLead.620x349.h210wq.png/1642123242787.jpg';
const NFTImage4 = 'https://images.prismic.io/mystique/54b948bc-e603-47cc-a2b7-48085cb1bf0e_ain+dubai+1.jpg?auto=compress%2Cformat&w=1200&h=450&q=75&crop=faces&fm=webp&rect=0,0,797,498';
const NFTImage5 = 'https://media.npr.org/assets/img/2021/10/26/gettyimages-1194524615_sq-972b7802bd5a897861640c76900c982e71cbc818.jpg';
const NFTImage6 = 'https://media.npr.org/assets/img/2021/10/26/gettyimages-1194524615_sq-972b7802bd5a897861640c76900c982e71cbc818.jpg';
const NFTImage7 = 'https://cdn.pixabay.com/photo/2020/12/13/23/18/ferris-wheel-5829622_1280.jpg';

const NFTTrending = () => {
    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
    };


    return (
        <React.Fragment>
            <Row className="">
                <Col xl="6" xs="6">
                    <h4 className="card-title">Trending NFT's</h4>
                </Col>
                <Col xl="6" xs="6" className="text-end">

                </Col>
                <Col xl="12">
                    <Row style={{ padding: '0px 40px 0px 35px' }}>
                        <Slider {...settings}>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={img7}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>Pancake Squad </b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={img3}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>SPACE ID Badges </b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={img11}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>Thetan Hero</b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={img4}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>The Minting Space </b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={img5}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>Pancake Squad </b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={img6}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>The Caesars Palace</b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={NFTImage1}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>Mobox Avatar - Binance</b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={NFTImage3}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>3D Invisible Friends</b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl="2" xs="6" className="mt-3 px-2">
                                <Link to="/admin/nft/detail/1">
                                    <Card>
                                        <div className="nft-category-image">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={NFTImage7}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <b>Keepers of the Inn</b>
                                                <b>$ 23.00</b>
                                            </div>
                                            <span> <i className="mdi mdi-account"></i> Jared </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                        </Slider>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default NFTTrending;

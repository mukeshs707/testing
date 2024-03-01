import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { apiRoute } from "routes/apiRoutes";

import "./category.css";
import dummy from "../../assets/images/dummy.jpg"
import rightArrow from "../../assets/images/right-arrow.png"

const Login = props => {

    //meta title
    document.title = "Login";
    const BASE_PATH = process.env.REACT_APP_BASE_PATH;
    const [categoriesCoin, setCategoriesCoin] = useState([]);

    const getCategoriesCoin = async () => {
        await axios
            .get(apiRoute.categoryWithLink)
            .then((response) => {
                console.log(response, "responseeee");

                setCategoriesCoin(response.data.data.coins);
            })
            .catch((error) => {
                // toast.error(error.response.data.error);
                console.log(error);
            });
    };
    console.log(categoriesCoin, "category");
    useEffect(() => {
        getCategoriesCoin();
    }, []);

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    {/* <i className="bx bx-home h2" /> */}
                </Link>
            </div>
            <div className="my-5 pt-sm-5">
                <Container>
                    <div>
                        {
                            categoriesCoin.map((value, index) => {
                                return <div className="card ellipsis pb-4 pt-2 px-3 mb-4" key={index}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="list-heading d-flex align-items-center justify-content-between mb-4">
                                                <h2 className="mt-2"> {value.name} </h2>
                                                <Link className="text-capitalize" to={`/categories-detail/${value._id}`}>  <img src={rightArrow} alt="" height="20px" /> </Link>
                                            </div>
                                            {
                                                (value.link && value.link.length > 0) ? value.link.map((link, ind) => {
                                                    return <div className="list-block position-relative" key={ind}>
                                                        <div className="list-icon position-absolute">
                                                            <img src={BASE_PATH + link.icon} alt="" />
                                                        </div>
                                                        <div className="list-content">
                                                            <a href={link.link}>
                                                                <h3>{link.name}</h3>
                                                                <p>{link.desc}</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                })
                                                    :
                                                    <div className="">
                                                        <h5> No Record Found! </h5>
                                                    </div>

                                            }

                                        </div>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(Login);

Login.propTypes = {
    history: PropTypes.object,
};

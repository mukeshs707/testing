import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { apiRoute } from "routes/apiRoutes";

import "./category.css";
import dummy from "../../assets/images/dummy.jpg"
import leftArrow from "../../assets/images/left-arrow.png"

const Login = props => {

    //meta title
    document.title = "Login";
    const BASE_PATH = process.env.REACT_APP_BASE_PATH;
    const [categoriesCoin, setCategoriesCoin] = useState([]);
    const [category, setCategories] = useState("");
    const { id } = useParams();

    console.log(id, 'id>>>>>>')

    const getCategoriesCoin = async () => {
        await axios
            .get(`${apiRoute.categoryWithDetail}?categoryId=${id}`)
            .then((response) => {
                console.log(response, "responseeee");

                setCategoriesCoin(response.data.data.coins.items);
                setCategories(response.data.data.category);
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


                    <div className="row">
                        <div className="col-12">
                            <div className="list-heading mb-4 mb-lg-5">
                                <h2 className="mt-0"> <Link to="/categories-with-coin" className="me-1"><img src={leftArrow} /></Link> {category.name}</h2>
                            </div>
                            {
                                (categoriesCoin && categoriesCoin.length > 0) ? categoriesCoin.map((value, index) => {
                                    return <div className="list-block position-relative" key={index}>
                                        <div className="list-icon position-absolute">
                                            <img src={BASE_PATH + value.icon} alt="" />
                                        </div>
                                        <div className="list-content">
                                            <h3>{value.name}</h3>
                                            <p>{value.desc}</p>
                                        </div>
                                    </div>
                                })
                                : <div>
                                    <div className="list-content">
                                        <h3>No Record Found!</h3>
                                    </div>
                                </div>
                            }

                        </div>
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

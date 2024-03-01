import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { apiRoute } from "routes/apiRoutes"
import axios from "axios"
import { Card, CardBody, Col, Row, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import { element } from "prop-types"

const BluKioskImage =
  "https://dubai-experience.de/wp-content/uploads/2022/01/ain-dubai-innen.jpg"
const LitleThingImage =
  "https://images.prismic.io/mystique/f03c7b58-80ac-488e-ba31-348eff556f79_bluewaters-island-ain-dubai-view.jpg?auto=compress%2Cformat&w=1200&h=450&q=75&crop=faces&fm=webp&rect=0,0,6000,4000"
const LETOImage =
  "https://www.thenationalnews.com/resizer/NjyJNGFNNLwF-1Pgz9i0p-kJ5xA=/arc-photo-thenational/eu-central-1-prod/public/PMMVOE25V7RB6GFYJR27KFPPCY.jpg"
const LetsVapeImage = "https://images.otstatic.com/prod1/47794124/3/huge.jpg"

const NFTImage2 =
  "https://www.timeoutdubai.com/cloud/timeoutdubai/2022/02/16/Botanica-16.jpg"
const NFTImage3 =
  "https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Ain-Dubai-Guide-A-28-03-1024x640.jpg"
const NFTImage5 =
  "https://img.traveltriangle.com/blog/wp-content/uploads/2019/05/Worlds-Largest-Ferris-Wheel.jpg"
const NFTImage6 =
  "https://www.caterermiddleeast.com/cloud/2022/04/20/D29A8385-683x1024.jpg"
const NFTImage7 =
  "https://emirateswoman.com/wp-content/uploads/2016/06/dubai-eye.jpg"

const NFTCategories = () => {
  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  const BASE_PATH = process.env.REACT_APP_BASE_PATH
  const [listingData, setData] = useState([])
  const [searchName, setSearchName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const perPage = 10

  // const fetchData = (pagenumber, pagelimit, search = "") => {
  //   try {
  //     axios
  //       .get(
  //         apiRoute.collectionListing +
  //           "?page=" +
  //           pagenumber +
  //           "&limit=" +
  //           pagelimit +
  //           "&search=" +
  //           search
  //       )
  //       .then(res => {
  //         console.log(res)
  //         setData(res.data.data.collection)

  //         //   let pageCount = Math.ceil(
  //         //     res.data.data.collection.totalItems / perPage
  //         //   )
  //         //   setTotalCount(pageCount)
  //       })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // useEffect(() => {
  //   fetchData(currentPage, perPage)
  // }, [])

  return (
    <React.Fragment>
    {(listingData.length != 0) ? (
      <Row>
            <Col xl="6" xs="6">
              <h4 className="card-title mt-2">NFT Collections</h4>
            </Col>
            <Col xl="6" xs="6" className="text-end"></Col>
            <Col xl="12">
              <Row style={{ padding: "0px 40px 0px 35px" }}>
                <Slider {...settings}>
                  {listingData.map((element, index) => {
                    return (
                      <Col xl="2" xs="6" className="mt-3 px-2" key={index}>
                        <Link to={`/admin/nft/collection/${element._id}`}>
                          <Card>
                            <div className="nft-category-image">
                              <img
                                className="card-img-top img-fluid rounded"
                                src={BASE_PATH + element.logoImg}
                              />
                            </div>
                            <div className="p-2">
                              <b className="d-block">{element.name}</b>
                              <span>
                                {" "}
                                <i className="mdi mdi-view-dashboard"></i>0/
                                {element.nftlimit} Items{" "}
                              </span>
                            </div>
                          </Card>
                        </Link>
                      </Col>
                    )
                  })}
                </Slider>
              </Row>
            </Col>
      </Row>
      ) : ''}
    </React.Fragment>
  )
}

export default NFTCategories

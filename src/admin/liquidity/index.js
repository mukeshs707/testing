import PropTypes, { element } from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  Col,
  Row,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  FormFeedback,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { toast } from "react-toastify";
import { apiRoute } from "routes/apiRoutes";
import { LoaderContext } from "context/ContextProvider";
import * as Yup from "yup";
import { useFormik } from "formik";
import "flatpickr/dist/themes/material_blue.css";
import noDataImage from "../../assets/images/nodata-found.png";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import { withTranslation } from "react-i18next";
import { dateformat, dateTimeformat } from "admin/commonFunction";

const Transaction = (props) => {
  const perPage = 10

  document.title = "Coin Website";
  const BASE_PATH = process.env.REACT_APP_BASE_PATH;

  const [currentPage, setCurrentPage] = useState(1);
  let [incermentInd, setIncrementInd] = useState(1);
  const [data, setData] = useState([]);
  const [varyingModal, setVaryingModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    link: "",
    img: "",
    category_id: "",
  });
  const [img, setprofileImg] = useState("");
  const [editImg, setEditProfileImg] = useState("");
  const [edit, setEdit] = useState({
    id: "",
    description: "",
    name: "",
    link: "",
    img: "",
    category_id: "",
    category_name: "",
  });
  const [searchName, setSearchName] = useState("")

  const [totalCount, setTotalCount] = useState(0)

  const changeValues = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const changeValuesEdit = (event) => {
    setEdit({ ...formValues, [event.target.name]: event.target.value });
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: formValues.name,
      description: formValues.description,
      link: formValues.link,
      category_id: formValues.category_id,
      img: img,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required."),
      description: Yup.string().required("This field is required."),
      link: Yup.string().required("This field is required."),
      img: Yup.string().required("A file is required"),
      category_id: Yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      createCategory(values);
    },
  });

  const validation1 = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name1: edit.name,
      link1: edit.link,
      description1: edit.description,
      category_id1: edit.category_id,
    },
    validationSchema: Yup.object({
      name1: Yup.string().required("This field is required."),
      description1: Yup.string().required("This field is required."),
      link1: Yup.string().required("This field is required."),
      category_id1: Yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      updateCoin(values);
    },
  });

  const updateCoin = (data) => {
    var formData = new FormData();
    formData.append("coinId", edit.id);
    formData.append("name", data.name1);
    formData.append("desc", data.description1);
    formData.append("link", data.link1);
    formData.append("coinIcon", editImg);
    formData.append("category_id", data.category_id1);

    try {
      axios
        .put(apiRoute.updateCoinWebsite + `?coinId=${edit.id}`, formData)
        .then((res) => {
          // console.log(res);
          setUpdateModal(!updateModal);
          toast.success("Coin Updated Successfully");
          getCoinWebsites(currentPage, perPage);

          setEditProfileImg("");
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    } catch (err) {
      console.log(err);
      setloading(false);
      toast.error("An error occurred !");
    }
  };

  const createCategory = async (data) => {
    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("desc", data.description);
    formData.append("link", data.link);
    formData.append("coinIcon", data.img);
    formData.append("category_id", data.category_id);

    await axios
      .post(apiRoute.coinWebsiteCreate, formData)
      .then((response) => {
        toast.success(response.data.message);
        setVaryingModal(!varyingModal);
        setFormValues({
          name: "",
          description: "",
          link: "",
          img: "",
          category_id: "",
        });
        setprofileImg("");
        getCoinWebsites(currentPage, perPage);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };
  function tog_varyingModal() {
    setVaryingModal(!varyingModal);
  }
  function tog_updateModal(id, name, description, link, img, category_id) {
    
    setUpdateModal(!updateModal);
    setFormValues({ name, description, link, img, category_id });
  }

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    await axios
      .get(apiRoute.getCategories)
      .then((response) => {
        let responseData = response.data.data.category;
        setCategories(responseData.items);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const [resposneToggler, setResponseToggler] = useState(false)

  const [coinWebsites, setCoinWebsites] = useState([]);
  const getCoinWebsites = async (pagenumber, pagelimit, searchName = "") => {
    await axios
      .get(`${apiRoute.coinWebsiteListing}?page=${pagenumber}&limit=${pagelimit}&search=${searchName}`, )
      .then((response) => {
        let responseData = response.data.data.coins;
        setCoinWebsites([...responseData]);
        let pageCount = Math.ceil(response.data.data.totalItems / perPage)

        // console.log(pageCount, "pageCount <>>>>>>>>>>>>>>>>>")
        setTotalCount(pageCount)
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {
    getCategories();
    getCoinWebsites(currentPage, perPage);
  }, [resposneToggler]);

  const handlePageClick = page => {
    setCurrentPage(page)
    getCoinWebsites(page, perPage, searchName)
  }

  const handleSearchClick = event => {
    setSearchName(event.target.value)
    setCurrentPage(1)
    getCoinWebsites(1, perPage, event.target.value)
  }


  const deleteCoin = (coin_id) => {
    try {
      axios
        .delete(apiRoute.deleteCoinWebsite + `?coinId=${coin_id}`)
        .then((res) => {
          toast.success("Coin Website deleted successfully");
          getCoinWebsites(currentPage, perPage);
        });
    } catch (err) {
      toast.error("An error occurred !");
    }
  };

  const ConfirmDelete = (id) => {
    // let URL = BASE_URL + "user/delete/" + userId
    Swal.fire({
      title: "Are you sure?",
      text: "you want to delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCoin(id);
      }
    });
  };
  const handleFileChange = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setEdit({ ...edit, newIcon: url });
    setEditProfileImg(file);
  };

  const editCategory = (
    id,
    name,
    link,
    category_name,
    description,
    category_id,
    img
  ) => {
    tog_updateModal();

    setEdit({
      id: id,
      description: description,
      name: name,
      link: link,
      img: img,
      category_id: category_id,
      category_name: category_name,
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom py-2">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">
                      {" "}
                      Coin Website
                    </h5>

                    <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                      <div
                        className="position-relative"
                        style={{ marginTop: "10px" }}
                      >
                        <label htmlFor="search-bar-0" className="search-label">
                          <span id="search-bar-0-label" className="sr-only">
                            Search this table
                          </span>
                          <input
                            id="search-bar-0"
                            type="text"
                            className="form-control"
                            placeholder={`Search...`}
                            onChange={handleSearchClick}
                          />
                        </label>
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        to="#!"
                        className="btn btn-secondary me-1"
                        onClick={() => {
                          tog_varyingModal();
                        }}
                      >
                        <i className="bx bx-plus"></i> Create New
                      </Link>
                    </div>
                  </div>
                </CardBody>
                <CardBody>
                  <Table
                    id="tech-companies-1"
                    className="table table-striped table-bordered"
                  >
                    <Thead>
                      <Tr>
                        <Th style={{ width: "200px" }}>Sr. No.</Th>
                        <Th>Coin</Th>
                        <Th>Link</Th>
                        <Th>Category</Th>
                        <Th style={{ width: "300px" }}>Created At</Th>
                        <Th style={{ width: "250px" }}>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {coinWebsites?.length != 0 ? (
                        coinWebsites?.map((element, index) => {
                          currentPage > 1
                            ? (incermentInd = (currentPage - 1) * perPage + 1)
                            : 0;
                          return (
                            <tr key={index}>
                              <td>
                                <span className="co-name">
                                  {" "}
                                  {incermentInd + index}{" "}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={BASE_PATH + element.icon}
                                    className="avatar-sm me-3 rounded-circle"
                                    alt="img"
                                  />
                                  <div className="">
                                    <h5 className="font-size-14 mb-1">
                                      {element.name}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {element.desc.slice(0, 50) + "..."}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>{element?.link}</td>
                              <td>{element?.category?.name}</td>
                              <td>{dateTimeformat(element.createdAt)}</td>
                              <td>
                                <ul className="list-unstyled hstack gap-1 mb-0">
                                  <li>
                                    <Link
                                      to="#!"
                                      className="btn btn-sm btn-soft-primary"
                                      onClick={() => {
                                        editCategory(
                                          element._id,
                                          element.name,
                                          element.link,
                                          element.category.name,
                                          element.desc,
                                          element.category._id,
                                          element.icon
                                        );
                                      }}
                                    >
                                      <i className="mdi mdi mdi-square-edit-outline" />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#!"
                                      className="btn btn-sm btn-soft-danger ms-1"
                                      onClick={() => {
                                        ConfirmDelete(element._id);
                                      }}
                                    >
                                      <i
                                        className="mdi mdi-delete-outline"
                                        id="deletetooltip"
                                      />
                                    </Link>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={12} style={{ textAlign: "center" }}>
                            No Records Found
                          </td>
                        </tr>
                      )}
                    </Tbody>
                  </Table>
                  <Row className="mt-2">
                    <Col md={9}></Col>
                    <Col md={3}>
                    <Pagination
                        {...bootstrap5PaginationPreset}
                        current={currentPage}
                        total={totalCount}
                        onPageChange={page => handlePageClick(page)}
                        className="pagination justify-content-end"
                      />
                    </Col>
                  </Row>
                </CardBody>
                {/* <CardBody>
                  <Table
                    id="tech-companies-1"
                    className="table table-striped table-bordered"
                  >
                    <Thead>
                      <Tr>
                        <Th>Sr. No.</Th>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Link</Th>
                      
                        <Th>Image</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {loaderStatus ? (
                        <Tr>
                          <Td colSpan="6"> Loading ... </Td>
                        </Tr>
                      ) : listingData.length != 0 ? (
                        listingData.map((element, index) => {
                          currentPage > 1
                            ? (incermentInd = (currentPage - 1) * perPage + 1)
                            : 0;
                          return (
                            <tr key={index}>
                              <td>
                                <span className="co-name">
                                  {" "}
                                  {incermentInd + index}{" "}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="">
                                    <h5 className="font-size-14">
                                      {element.name}
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>{element.email}</td>
                              <td>{dateformat(element.createdAt)}</td>
                              <td>
                                {console.log(
                                  Boolean(element.isApproved),
                                  ">>>>>>>>>>>>>"
                                )}
                                <div className="square-switch mytoggle">
                                  <input
                                    type="checkbox"
                                    id={`square-switch${element._id}`}
                                    switch="success"
                                    defaultChecked={Boolean(element.isApproved)}
                                    value={element._id}
                                    onClick={handleChangeCheck}
                                  />
                                  <label
                                    htmlFor={`square-switch${element._id}`}
                                    data-on-label="Active"
                                    data-off-label="Inactive"
                                  />
                                </div>
                              </td>
                              <td>
                                <ul className="list-unstyled hstack gap-1 mb-0">
                                  <li>
                                    <Link
                                      to={`/admin/user/edit/${element._id}`}
                                      className="btn btn-sm btn-soft-primary"
                                    >
                                      <i className="mdi mdi mdi-square-edit-outline" />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="btn btn-sm btn-soft-danger"
                                      onClick={() => {
                                        ConfirmDeleteUser(element._id);
                                      }}
                                    >
                                      <i
                                        className="mdi mdi-delete-outline"
                                        id="deletetooltip"
                                      />
                                    </Link>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6}>No Records Found</td>
                        </tr>
                      )}
                    </Tbody>
                  </Table>

                  <Row className="mt-2">
                    <Col md={9}></Col>
                    <Col md={3}>
                      <Pagination
                        {...bootstrap5PaginationPreset}
                        current={currentPage}
                        total={totalCount}
                        onPageChange={page => handlePageClick(page)}
                        className="pagination justify-content-end"
                      />
                    </Col>
                  </Row>
                </CardBody> */}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        isOpen={varyingModal}
        toggle={() => {
          tog_varyingModal();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {" "}
            Coin Website{" "}
          </h5>
          <button
            type="button"
            onClick={() => {
              setVaryingModal(false);
            }}
            className="btn-close"
          ></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          className="validation-cls"
        >
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="floatingnameInput">Category</label>
              <select
                className="form-control"
                name="category_id"
                onChange={changeValues}
              >
                <option value=""> Select Category </option>
                {categories.map((value, index) => {
                  return (
                    <option key={index} value={value._id}>
                      {" "}
                      {value.name}{" "}
                    </option>
                  );
                })}
              </select>
              {validation.touched.category_id &&
              validation.errors.category_id ? (
                <FormFeedback type="invalid">
                  {validation.errors.category_id}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="floatingnameInput">Image</label>
              <input
                type="file"
                name="img"
                className="form-control"
                id="floatingnameInput"
                placeholder="Upload  Image"
                onChange={(event) => {
                  setprofileImg(event.currentTarget.files[0]);
                }}
              />
              {validation.touched.img && validation.errors.img ? (
                <FormFeedback type="invalid">
                  {validation.errors.img}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name">Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="category-name"
                placeholder="Write here..."
                onBlur={validation.handleBlur}
                onChange={changeValues}
                value={formValues.name}
              />
              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">
                  {validation.errors.name}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name">Link:</label>
              <input
                type="text"
                className="form-control"
                name="link"
                id="link"
                placeholder="Write here..."
                onBlur={validation.handleBlur}
                onChange={changeValues}
                value={formValues.link}
              />
              {validation.touched.link && validation.errors.link ? (
                <FormFeedback type="invalid">
                  {validation.errors.link}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="floatingnameInput1">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="floatingnameInput1"
                rows={3}
                placeholder="Write here..."
                style={{ height: "130px" }}
                onBlur={validation.handleBlur}
                onChange={changeValues}
                value={formValues.description}
              ></textarea>
              {validation.touched.description &&
              validation.errors.description ? (
                <FormFeedback type="invalid">
                  {validation.errors.description}
                </FormFeedback>
              ) : null}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setVaryingModal(false);
              }}
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={updateModal}
        toggle={() => {
          tog_updateModal();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {" "}
            Update Coin Website{" "}
          </h5>
          <button
            type="button"
            onClick={() => {
              setUpdateModal(false);
            }}
            className="btn-close"
          ></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation1.handleSubmit();
            return false;
          }}
          className="validation-cls"
        >
          <div className="modal-body">
            <div>
              {/* <label htmlFor="formFile" className="form-label">
              Category Icon:
              </label> */}

              <label htmlFor="formFile" className="form-label">
                <div className="position-relative">
                  <img
                    src={`${edit?.newIcon ?? BASE_PATH + edit.img}`}
                    className=""
                    style={{ height: "87px", width: "90px" }}
                  />
                  <i
                    className="bx bx-edit"
                    style={{
                      fontSize: "19px",
                      position: "absolute",
                      bottom: "4px",
                      backgroundColor: "white",
                      padding: "1px",
                      right: "4px",
                      borderRadius: "2px",
                    }}
                  ></i>
                </div>
              </label>
              <input
                name="categoryIcon"
                className="form-control"
                type="file"
                id="formFile"
                hidden
                onChange={(event) => handleFileChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="floatingnameInput">Category</label>
              <select
                className="form-control"
                name="category_id"
                onChange={(e) => {
                  setEdit({ ...edit, category_id: e.target.value });
                }}
              >
                <option value=""> Select Category </option>
                {categories.map((value, index) => {
                  return (
                    <option
                      key={index}
                      value={value._id}
                      selected={
                        edit && edit.category_id == value._id ? true : false
                      }
                    >
                      {" "}
                      {value.name}{" "}
                    </option>
                  );
                })}
              </select>
              {validation1.touched.category_id1 &&
              validation1.errors.category_id1 ? (
                <FormFeedback type="invalid">
                  {validation1.errors.category_id1}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name">Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="category-name"
                placeholder="Write here..."
                onBlur={validation1.handleBlur}
                value={edit ? edit.name : ""}
                onChange={(e) => {
                  setEdit({ ...edit, name: e.target.value });
                }}
              />
              {validation1.touched.name1 && validation1.errors.name1 ? (
                <FormFeedback type="invalid">
                  {validation1.errors.name1}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name">Link:</label>
              <input
                type="text"
                className="form-control"
                name="link"
                id="link"
                placeholder="Write here..."
                onBlur={validation1.handleBlur}
                value={edit ? edit.link : ""}
                onChange={(e) => {
                  setEdit({ ...edit, link: e.target.value });
                }}
              />
              {validation1.touched.link1 && validation1.errors.link1 ? (
                <FormFeedback type="invalid">
                  {validation1.errors.link1}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="floatingnameInput1">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="floatingnameInput1"
                rows={3}
                placeholder="Write here..."
                style={{ height: "130px" }}
                onBlur={validation1.handleBlur}
                value={edit ? edit.description : ""}
                onChange={(e) => {
                  setEdit({ ...edit, description: e.target.value });
                }}
              ></textarea>
              {validation1.touched.description1 &&
              validation1.errors.description1 ? (
                <FormFeedback type="invalid">
                  {validation1.errors.description1}
                </FormFeedback>
              ) : null}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setUpdateModal(false);
              }}
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

Transaction.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Transaction);

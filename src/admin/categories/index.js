import PropTypes, { element } from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
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
import { toast } from "react-toastify";
import { apiRoute } from "routes/apiRoutes";
import { LoaderContext } from "context/ContextProvider";
import * as Yup from "yup";
import { useFormik } from "formik";
import "flatpickr/dist/themes/material_blue.css";
import noDataImage from "../../assets/images/nodata-found.png";
import { dateformat, dateTimeformat } from "admin/commonFunction";

import { withTranslation } from "react-i18next";

const Categories = (props) => {
  //meta title
  document.title = "Categories";
  const [currentPage, setCurrentPage] = useState(1);
  let [incermentInd, setIncrementInd] = useState(1);
  const [edit, setEdit] = useState({
    id: "",
    name: "",
  });
  const [searchCategory, setSearchCategory] = useState("")
  const [varyingModal, setVaryingModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
  });
  const changeValues = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: formValues.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required."),
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
    },
    validationSchema: Yup.object({
      name1: Yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      updateCategory(values);
    },
  });

  const createCategory = async (data) => {
    await axios
      .post(apiRoute.categoriesCreate, data)
      .then((response) => {
        toast.success(response.data.message);
        getCategories();
        setVaryingModal(!varyingModal);
        setFormValues({ name: "" });
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };
  function tog_varyingModal() {
    setVaryingModal(!varyingModal);
  }
  function tog_updateModal(id, name) {
    setUpdateModal(!updateModal);
    setFormValues({ name });
  }
  const [categories, setCategories] = useState([]);

  const getCategories = async (searchCategory = "") => {
    await axios
      .get(apiRoute.getCategories +`?search=${searchCategory}`)
      .then((response) => {
        let responseData = response.data.data.category;
        setCategories(responseData.items);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);


  const handleSearchClick = event => {
    setSearchCategory(event.target.value)
    getCategories( event.target.value)
  }



  const deleteCategories = (cat_id) => {
    try {
      axios
        .delete(apiRoute.deleteCategories + `?categoryId=${cat_id}`)
        .then((res) => {
          // console.log(res)
          // toast.success("FAQ Deleted Successfully")
          // alerShow("Success", " FAQ Deleted Successfully");
          toast.success("Category deleted successfully");
          getCategories();
        });
    } catch (err) {
      // console.log(err)
      // toast.error("An error occurred !")
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
        deleteCategories(id);
      }
    });
  };
  const editFAQ = (id, name) => {
    handleShow();
    setEdit({ id, name });
  };

  const updateCategory = (data) => {

    let bodyData = {
      categoryId: edit.id,
      name: data.name1,
    };

    try {
      axios
        .put(apiRoute.updateCategories + `?categoryId=${edit.id}&name=${data.name1}`, bodyData)
        .then((res) => {
          console.log(res);
          // setloading(false);
          setUpdateModal(!updateModal);
          toast.success("Category Updated Successfully");

          getCategories();
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

  const editCategory = (id, name, icon) => {
    tog_updateModal();

    setEdit({ id, name });
    console.log(edit);
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
                      Categories{" "}
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
                        <i className="bx bx-plus"></i> Create Category
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
                        <Th>Name</Th>
                        <Th style={{ width: "300px" }}>Created At</Th>
                        <Th style={{ width: "250px" }}>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {categories?.length != 0 ? (
                        categories?.map((element, index) => {
                          currentPage > 1
                            ? (incermentInd = (currentPage - 1) * perPage + 1)
                            : 0;
                          return (
                            <tr key={index}>
                              <td>
                                <span className="co-name">
                                  {incermentInd + index}
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
                              <td>{dateTimeformat(element.createdAt)}</td>
                              <td>
                                <ul className="list-unstyled hstack gap-1 mb-0">
                                  <li>
                                    <Link
                                      to="#!"
                                      className="btn btn-sm btn-soft-primary"
                                      // onClick={() => {
                                      //   editFAQ(element._id, element.name);
                                      // }}
                                      onClick={() => {
                                        editCategory(element._id, element.name);
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
                </CardBody>
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
            New Category{" "}
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
              <label htmlFor="recipient-name" className="col-form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="category-name"
                placeholder="Enter Category Name"
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
            Update Category{" "}
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
          // onSubmit={updateCategory}
          className="validation-cls"
        >
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Name:
              </label>
              <input
                type="text"
               
                className="form-control"
                name="name"
                id="category-name"
                placeholder="Enter Category Name"
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

Categories.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Categories);

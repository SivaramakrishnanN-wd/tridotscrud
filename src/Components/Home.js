import React, { useState, useEffect } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  const [data, setData] = useState({
    productname: "",
    price: "",
    oldprice: "",
    category: "",
    isActive: false,
    description: "",
  });
  const [productDetailsList, setProductDetailsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  
  
  useEffect(() => {
    const savedProductList =
      JSON.parse(localStorage.getItem("productList"));
    setProductDetailsList(savedProductList);
  }, []);

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productDetailsList));
  }, [productDetailsList]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === -1) {
      setProductDetailsList((prevList) => [...prevList, data]);
    } else {
      const updatedList = [...productDetailsList];
      updatedList[editingIndex] = data;
      setProductDetailsList(updatedList);
      setEditingIndex(-1);
    }
    setData({
      productname: "",
      price: "",
      oldprice: "",
      category: "",
      isActive: false,
      description: "",
    });
    setShowModal(false);
    setShowModalProduct(false);
  };

  const handleDelete = (index) => {
    const updatedList = productDetailsList.filter((_, i) => i !== index);
    setProductDetailsList(updatedList);
    console.log(updatedList);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setData(productDetailsList[index]);
    setShowModal(true);
  };
  const handleAdd = () => {
    setShowModalProduct(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowModalProduct(false);
  };

  return (
    <>
      <div className="all_products">
        <div className="add" style={{ margin: "5rem" }}>
          <Button onClick={handleAdd}>Create</Button>
        </div>
        <div className="pro_show">
          {productDetailsList && productDetailsList.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {productDetailsList.map((product, index) => (
                <Card key={index} style={{ width: "18rem", margin: "1rem" }}>
                  <Card.Body>
                    <Card.Title>{product.productname}</Card.Title>
                    <Card.Text>Price: {product.price}</Card.Text>
                    <Card.Text>Old Price: {product.oldprice}</Card.Text>
                    <Card.Text>Category: {product.category}</Card.Text>
                    <Card.Text>
                      Active: {product.isActive ? "Yes" : "No"}
                    </Card.Text>
                    <Card.Text>Description: {product.description}</Card.Text>
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="danger"
                    >
                      Delete
                    </Button>{" "}
                    <Button onClick={() => handleEdit(index)} variant="primary">
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            "No Product Available"
          )}
        </div>
      </div>
      <Modal show={showModalProduct}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="editProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productname"
                value={data.productname}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editOldPrice">
              <Form.Label>Old Price</Form.Label>
              <Form.Control
                type="number"
                name="oldprice"
                value={data.oldprice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={data.category}
                onChange={handleChange}
              >
                <option>Vegetables</option>
                <option>Fruits & Nuts</option>
                <option>Dairy & Creams</option>
                <option>Packaged Food</option>
                <option>Staples</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="editIsActive">
              <Form.Check
                type="checkbox"
                label="is Active"
                name="isActive"
                checked={data.isActive}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">
              {editingIndex === -1 ? "Add" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="editProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productname"
                value={data.productname}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editOldPrice">
              <Form.Label>Old Price</Form.Label>
              <Form.Control
                type="number"
                name="oldprice"
                value={data.oldprice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={data.category}
                onChange={handleChange}
              >
                <option>Vegetables</option>
                <option>Fruits & Nuts</option>
                <option>Dairy & Creams</option>
                <option>Packaged Food</option>
                <option>Staples</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="editIsActive">
              <Form.Check
                type="checkbox"
                label="is Active"
                name="isActive"
                checked={data.isActive}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">
              {editingIndex === -1 ? "Add" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

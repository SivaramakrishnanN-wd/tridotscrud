import React, { useState, useEffect } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";

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
  const [editingIndex, setEditingIndex] = useState(-1); // Initialize as -1 when not editing
  const [showModal, setShowModal] = useState(false);

  // Load product list from localStorage when the component mounts
  useEffect(() => {
    const savedProductList =
      JSON.parse(localStorage.getItem("productList")) || [];
    setProductDetailsList(savedProductList);
  }, []);

  // Update localStorage when the product list changes
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
      // Adding a new product
      setProductDetailsList((prevList) => [...prevList, data]);
    } else {
      // Updating an existing product
      const updatedList = [...productDetailsList];
      updatedList[editingIndex] = data;
      setProductDetailsList(updatedList);
      setEditingIndex(-1); // Reset the editing index
    }

    // Clear the form after submission
    setData({
      productname: "",
      price: "",
      oldprice: "",
      category: "",
      isActive: false,
      description: "",
    });

    // Close the modal
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = productDetailsList.filter((_, i) => i !== index);
    setProductDetailsList(updatedList);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setData(productDetailsList[index]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingIndex(-1);
    setData({
      productname: "",
      price: "",
      oldprice: "",
      category: "",
      isActive: false,
      description: "",
    });
    setShowModal(false);
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="d-grid gap-2"
        style={{ margin: "5rem" }}
      >
        <Form.Group className="m-3" controlId="formName">
          <Form.Control
            type="text"
            name="productname"
            placeholder="Enter the Product Name"
            required
            value={data.productname}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="m-3" controlId="formPrice">
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter the Price"
            required
            value={data.price}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="m-3" controlId="formOldPrice">
          <Form.Control
            type="number"
            name="oldprice"
            placeholder="Enter the Old Price"
            required
            value={data.oldprice}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="m-3">
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
        <Form.Group className="m-3">
          <Form.Check
            type="checkbox"
            label="is Active"
            name="isActive"
            checked={data.isActive}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="m-3">
          <Form.Control
            as="textarea"
            rows="4"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">{editingIndex === -1 ? "Add" : "Update"}</Button>
      </Form>

      {productDetailsList.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
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
                <Card.Text>Active: {product.isActive ? "Yes" : "No"}</Card.Text>
                <Card.Text>Description: {product.description}</Card.Text>
                <Button onClick={() => handleDelete(index)} variant="danger">
                  Delete
                </Button>
                <Button onClick={() => handleEdit(index)} variant="primary">
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
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
    </div>
  );
}

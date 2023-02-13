import "../App.css";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";

import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [, setRender] = useState(false);
  const [remove, setRemove] = useState(false);
  const [remove1, setRemove1] = useState(false);
  const [deleteAction, setDeleteAction] = useState({
    actionType: "",
    id: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "https://ebilling.iphtechnologies.com/API/api/getbill"
    );
    // console.log("1234", result);

    setData(result?.data);
    data?.bill.length > 2 ? setRemove1(true) : setRemove1(false);
  };

  const handleCheckbox = (index = "", e) => {
    if (index === "") {
      data?.bill.map((item) => {
        item.isChecked = e.target.checked;
        return item;
      });
    } else {
      data.bill[index].isChecked = e.target.checked;
    }
    setRender(Math.random());
    e.target.checked ? setRemove(true) : setRemove(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = (actionType = "deleteAll", id) => {
    setShow(true);

    setDeleteAction({ ...deleteAction, id: id, actionType: actionType });
  };

  const deleteAll = async () => {
    await axios.post(
      "https://ebilling.iphtechnologies.com/API/api/bill/delete",
      {
        ids: data?.bill.filter((item) => item?.isChecked === true),
      }
    );
    loadUsers();
    window.location.reload();
  };

  console.log(deleteAction);

  const deleteUser = async (id) => {
    await axios.post(
      "https://ebilling.iphtechnologies.com/API/api/bill/delete",
      {
        ids: [id],
      }
    );
    loadUsers();
    setShow(false);
    window.location.reload();
  };

  return (
    <Container className="my-5 py-5">
      <Row className="text-right">
        <Col md="12" className="text-end">
          {remove && (
            <Button
              className="btn btn-danger btn-warning"
              onClick={() => handleShow()}
            >
              Delete Bill
            </Button>
          )}
          {/* <a href="/create-new-bill" className="btn btn btn-warning m-3 "> */}
          <a href="/create-new-bill" className="btn btn btn-warning m-3 ">
            Create New Bill
          </a>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Delete Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            color: "black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Are you sure want to Delete this Bill
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              deleteAction.actionType === "deleteAll"
                ? deleteAll()
                : deleteUser(deleteAction.id)
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Table className="striped bordered hover">
        <thead>
          <tr>
            <td>
              {data?.bill.length > 0 && (
                <Form.Check onChange={(e) => handleCheckbox("", e)} />
              )}
            </td>

            <th>Invoice No.</th>
            <th>Paid To</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.bill?.map((values, index) => {
              return (
                <tr key={index}>
                  {
                    <td>
                      <Form.Check
                        value={values.id}
                        checked={values.isChecked}
                        onChange={(e) => handleCheckbox(index, e)}
                      />
                    </td>
                  }
                  <td>{values.invoice_no}</td>
                  <td>{values.paid_to}</td>
                  <td>{moment(values.created_at).format("DD MMM, YYYY")}</td>
                  <td>
                    <NavLink className="btn btn-light btn-sm" to="/View">
                      View
                    </NavLink>
                    <NavLink
                      className="btn btn-primary  btn-sm mx-2"
                      to="/Edit"
                    >
                      Edit
                    </NavLink>

                    <Button
                      className="btn btn-danger  btn-sm"
                      onClick={() => handleShow("delete", values.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

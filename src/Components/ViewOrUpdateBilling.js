import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useReactToPrint } from "react-to-print";
import Pdf from "react-to-pdf";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsPercent } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";

import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import moment from "moment";

function ViewOrUpdateBilling(props) {
  const [checked, setChecked] = React.useState(false);
  const [discount, setDiscount] = React.useState(false);
  const [disctval, setDisctval] = useState(5);
  const [remove, setRemove] = useState(true);
  const [applygst, setApplygst] = useState(false);
  const [applydisct, setApplydisct] = useState(false);
  const [gst, setGst] = useState(18);
  const [selects, setSelects] = useState(true);
  const [Date] = useState(null);
  const [date1, setDate1] = useState();
  const [Data1, setData1] = useState([]);
  const [Data, setData] = useState();
  const [render, setRender] = useState();

  let { id } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.1.110:8000/api/getbill")
      .then((res) => {
        setData(res.data.bill.filter((item) => item.id === parseInt(id, 10)));

        console.log("res", res.data.bill);
      })
      .catch((error) => {});
  }, []);

  const handleChange = (index, e) => {
    let datas = [...Data];
    datas[0].bill_description[index][e.target.name] = e.target.value;

    setData(datas);
  };

  const handleChange1 = (event) => {
    setSelects(event.target.value);
  };
  const handleChange2 = (event) => {
    setGst(event.target.value);
  };
  const handleChange3 = (event) => {
    setChecked(event.target.checked);
    event.target.checked ? setApplygst(true) : setApplygst(false);
  };

  const handleChange4 = (event) => {
    setDiscount(event.target.discount);
    event.target.checked ? setDiscount(true) : setDiscount(false);
    event.target.checked ? setApplydisct(true) : setApplydisct(false);
  };

  const handleChange5 = (event) => {
    setDisctval(event.target.value);
  };

  console.log(checked);
  var total = 0;
  var quantity = 0;
  var gsttotal = 0;
  var discountVal = 0;

  const { ToWords } = require("to-words");
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Rupee",
        plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });
  // in number textfield only to enter numbers not any other symbols and character
  function numberonly(evt) {
    var ch = String.fromCharCode(evt.which);

    if (!/[0-9 || .]/.test(ch)) {
      evt.preventDefault();
    }
  }

  function numberonly1(evt) {
    var ch = String.fromCharCode(evt.which);

    if (!/[0-9]/.test(ch)) {
      evt.preventDefault();
    }
  }

  // submit and console all the form data
  const submit = async (e1) => {
    e1.preventDefault();
  };

  const componentRef = useRef(); // to take print of all the form pages
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // React to Download
  const ref = React.createRef();
  return (
    <Container
      style={{ width: "835px", marginTop: "10px" }}
      className="my-5 py-5"
      xs
    >
      <Form
        onSubmit={submit}
        className="my-5 position-relative border p-2 shadow rounded"
      >
        <div ref={ref}>
          <div
            ref={componentRef}
            style={{
              border: "1.5px solid black",
              margin: "40px 20px 0px 20px",
              padding: "5px",
            }}
          >
            <Row>
              <Col md="6" className="align-self-center">
                <Image />
              </Col>
              <Col md="6">
                <Form.Text>
                  Address: 25, 2nd Floor, JB Emperor Square, 1212S, Near Apollo
                  Medics Hospital, LDA Colony, Lucknow 226012 <br />
                  Email: Info@iphtechnologies.com
                  <br />
                  Contact : 9580511301/04
                </Form.Text>
              </Col>
              <Col md="12"></Col>
            </Row>
            <hr style={{ border: "1px solid #000000" }} />
            <h6 style={{ textAlign: "center" }}>Payment Voucher</h6>
            <hr style={{ border: "1px solid #000000" }} />

            <Row className="bg-light p-2 m-0 rounded my-2">
              <Col md="6" className="ps-0">
                <FloatingLabel controlId="invoice_num" label="Invoice No">
                  <Form.Control
                    value={Data && Data[0]?.invoice_no}
                    name="invoice_num"
                    placeholder="Leave a comment here"
                    className="square rounded"
                  />
                </FloatingLabel>
              </Col>
              <Col md="6" className="pe-0">
                <InputGroup className="h-100 justify-content-end">
                  <InputGroup.Text id="date1">Date</InputGroup.Text>
                  <Form.Control
                    className="form-control rounded-0 w-auto h-100"
                    required
                    fullWidth
                    // name="date1"
                    value={moment(Data && Data[0]?.created_at).format(
                      "DD/MM/YYYY"
                    )}
                    format="dd/mm/yyyy"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FloatingLabel
                  controlId="paidto"
                  label="Paid To"
                  className="mb-3"
                >
                  <Form.Control
                    value={Data && Data[0]?.paid_to}
                    name="paidto"
                    placeholder="Leave a comment here"
                    className="square rounded mb-1"
                  />
                </FloatingLabel>
              </Col>
              <Col md="12">
                <FloatingLabel
                  controlId="address"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    value={Data && Data[0]?.address}
                    name="address"
                    as="textarea"
                    placeholder="Leave a comment here"
                    className="square rounded mb-1"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-center align-middle">
                    Date
                  </th>
                  <th colSpan={3} className="text-center">
                    Discription
                  </th>
                  <th rowSpan={2} className="text-center align-middle">
                    Payments
                  </th>
                  {/* <th rowSpan={2} className="text-center align-middle">
                    Delete Row
                  </th> */}
                </tr>
                <tr>
                  <th>Details</th>
                  <th>Item Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Data &&
                  Data[0].bill_description.map((values, index) => {
                    total +=
                      values.quantity * values.item_price
                        ? parseFloat(values.quantity * values.item_price)
                        : 0;

                    quantity += values.quantity
                      ? parseFloat(values.quantity)
                      : 0;

                    gsttotal = Boolean(Data ? Data[0].has_gst : 0)
                      ? (
                          parseFloat(total) +
                          ((Data[0]?.has_gst || 0) * parseFloat(total)) / 100
                        ).toFixed(2)
                      : total;

                    discountVal = Boolean(Data ? Data[0].has_discounts : 0)
                      ? (
                          parseFloat(gsttotal) -
                          ((Data[0]?.has_discounts || 0) *
                            parseFloat(gsttotal)) /
                            100
                        ).toFixed(2)
                      : gsttotal;

                    return (
                      <tr key={index}>
                        <td style={{ height: "20px", width: "150px" }}>
                          <Form.Control
                            required
                            value={values.date}
                            className="border-0 bg-transparent"
                          />
                        </td>

                        <td>
                          <Form.Control
                            as="textarea"
                            value={values?.item_description}
                            name="item_desciption"
                            onChange={(e) => handleChange(index, e)}
                            className="border-0 bg-transparent"
                          />
                        </td>
                        <td>
                          <Form.Control
                            onKeyPress={numberonly}
                            value={values.item_price}
                            name="Itemprice"
                            onChange={(e) => handleChange(index, e)}
                            type="text"
                            fullWidth
                            style={{ color: "black" }}
                            InputProps={{ disableUnderline: true }}
                            inputProps={{ maxLength: 200 }}
                            className="border-0 bg-transparent"
                          />
                        </td>
                        <td>
                          <Form.Control
                            multiline
                            onKeyPress={numberonly1}
                            value={values.quantity}
                            name="Quantity"
                            onChange={(e) => handleChange(index, e)}
                            type="text"
                            fullWidth
                            style={{ color: "black" }}
                            InputProps={{ disableUnderline: true }}
                            className="border-0 bg-transparent"
                          />
                        </td>
                        <td>
                          <Form.Control
                            multiline
                            onKeyPress={numberonly}
                            ide="inputBox"
                            value={values.item_price * values.quantity}
                            name="Payments"
                            onChange={(e) => handleChange(index, e)}
                            type="text"
                            fullWidth
                            style={{ color: "black" }}
                            InputProps={{ disableUnderline: true }}
                            inputProps={{ maxLength: 150 }}
                            className="border-0 bg-transparent"
                          />
                        </td>
                      </tr>
                    );
                  })}

                <tr>
                  <td colSpan={1}>Sub Total</td>

                  <td colSpan={2}></td>

                  <td>
                    <Form.Control
                      multiline
                      name="quantity"
                      borderRight="none"
                      type="text"
                      value={quantity}
                      style={{
                        color: "black",
                      }}
                      InputProps={{ disableUnderline: true }}
                    />
                  </td>

                  <td colSpan={2}>
                    <Form.Control
                      multiline
                      borderRight="none"
                      type="text"
                      value={total}
                      style={{
                        color: "black",
                        borderRight: "0px solid white",
                      }}
                      InputProps={{ disableUnderline: true }}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Amount in words:</td>

                  <td colSpan={5}>
                    <Form.Text>{toWords.convert(discountVal)}</Form.Text>
                  </td>
                </tr>
                <tr style={{ borderBottom: "2px solid black", width: "100%" }}>
                  <td colSpan={2}>
                    Mode of Payment :
                    <Form.Control
                      name="pmtmode"
                      value={Data && Data[0]?.payment_mode}
                      onChange={handleChange1}
                    ></Form.Control>
                  </td>

                  <td colSpan={4}>
                    <div style={{ display: "flex" }}>
                      <div style={{ borderBottom: "none", marginLeft: "3px" }}>
                        {Data && Data[0]?.payment_mode !== "Cash" ? (
                          <Form.Control
                            className="mt-4"
                            required
                            value={Data && Data[0]?.payment_mode_info}
                            name="trncid"
                            placeholder={
                              selects === "Online"
                                ? "Enter the Transaction Id:-"
                                : selects === "Cheque"
                                ? "Enter Cheque Number :-"
                                : selects === "UPI"
                                ? "Enter UPI reference id:-"
                                : "Enter the Transaction Id:-"
                            }
                            style={{
                              width: "200px",
                              outline: "none",
                              border: "none",
                            }}
                          />
                        ) : (
                          " "
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            {/* checked={Boolean(Data[0]?.has_gst)} */}
            <Row className="m-0">
              <Col md="auto">
                <Form.Group controlId="ApplyGST">
                  <Form.Check
                    checked={Boolean(Data ? Data[0]?.has_gst : 0)}
                    // onChange={handleChange3}
                    type="checkbox"
                    label="Apply GST"
                  />
                </Form.Group>
              </Col>
              <Col md="auto" style={{ display: "flex", alignItems: "center" }}>
                {Boolean(Data ? Data[0].has_gst : 0) && (
                  <>
                    <Form.Control
                      onKeyPress={numberonly}
                      multiline
                      value={Data ? Data[0].has_gst : 0}
                      name="gst"
                      inputProps={{
                        "aria-label": "primary checkbox",
                        maxLength: 5,
                      }}
                      style={{
                        color: "green",
                        marginLeft: "10px",
                        width: "45px",
                        border: "none",
                      }}
                      onChange={handleChange2}
                    />
                    <BsPercent
                      style={{
                        color: "green",
                        marginLeft: "-10px",
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
            <Row className="m-0">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <Col md="auto">
                    <Form.Group controlId="ApplyDiscount">
                      <Form.Check
                        checked={Boolean(Data ? Data[0].has_discounts : 0)}
                        // onChange={handleChange4}
                        type="checkbox"
                        label="Apply Discount"
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    md="auto"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {Boolean(Data ? Data[0].has_discounts : 0) && (
                      <>
                        <Form.Control
                          onKeyPress={numberonly}
                          multiline
                          value={Data[0].has_discounts}
                          name="disctval"
                          inputProps={{
                            "aria-label": "primary checkbox",
                            maxLength: 5,
                          }}
                          style={{
                            color: "green",
                            marginLeft: "10px",
                            width: "45px",
                            border: "none",
                          }}
                          onChange={handleChange5}
                        />
                        <BsPercent
                          style={{
                            color: "green",
                            marginLeft: "-10px",
                          }}
                        />
                      </>
                    )}
                  </Col>
                </div>
                <div>
                  <Row>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col>Total=</Col>
                      <BiRupee style={{ width: "20px", height: "20px" }} />
                      <Col>{discountVal}</Col>
                    </div>
                  </Row>
                </div>
              </div>
            </Row>

            <Row className="mb-5 mt-5">
              <Col>
                <Form.Text>Authorized By:</Form.Text>
              </Col>
              <Col className="text-end">
                <Form.Text>Received By:</Form.Text>
              </Col>
            </Row>
          </div>
        </div>

        <Row className="bg-light position-sticky bottom-0 p-2 m-0">
          <Col>
            <Pdf targetRef={ref} filename="Account.pdf">
              {({ toPdf }) => (
                <Button onClick={toPdf} variant="primary" className="w-100">
                  Download
                </Button>
              )}
            </Pdf>
          </Col>
          <Col>
            <Button variant="primary w-100" onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ViewOrUpdateBilling;

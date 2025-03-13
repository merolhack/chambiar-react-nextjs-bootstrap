"use client";

import { Row, Col, Dropdown, Card, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const Sellers = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <Form className="position-relative table-src-form me-0">
              <Form.Control
                type="text" 
                placeholder="Search here"
              />
              <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
                search
              </span>
            </Form>

            <Link
              href="/ecommerce/sellers/create/"
              className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
            >
              <span className="py-sm-1 d-block">
                <i className="ri-add-line d-none d-sm-inline-block"></i>
                <span>Add New Seller</span>
              </span>
            </Link>
          </div>
        </Card.Body>
      </Card>

      <Row>
        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-1.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Ava Turner
                    </Link>
                    <span className="d-block">turner@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">25 Nov 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$9,999.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$5,999.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">TechMaster Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-2.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Ethan Parker
                    </Link>
                    <span className="d-block">ethan@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">01 Nov 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">39</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$6,756.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$4,645.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">RisionTech Outlet</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-3.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Isabella
                    </Link>
                    <span className="d-block">isabella@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">30 Sep 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">75</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$5,550.00</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$4,350.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">ComfotLiving</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-4.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Thompson
                    </Link>
                    <span className="d-block">thompson@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">02 Aug 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">99</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$2,100.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$1,500.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">SportFit Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-5.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Lucas
                    </Link>
                    <span className="d-block">lucas@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">22 July 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">350</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$15,250.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$10,200.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">Velas Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-6.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Morgan
                    </Link>
                    <span className="d-block">morgan@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">10 Jun 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">200</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$10,500.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$5,458.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">Herna Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-7.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Sophia
                    </Link>
                    <span className="d-block">sophia@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">16 Feb 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">80</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$2,580.00</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$1,500.00</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">Dona Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-8.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Rodriguez
                    </Link>
                    <span className="d-block">rodriguez@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">12 May 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">150</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$9,000.00</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$6,000.00</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">Willi Dav Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-9.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Olivia Taylor
                    </Link>
                    <span className="d-block">olivia@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">10 Apr 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">75</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$7,500.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$4,500.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">Donne Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-10.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      David Smith
                    </Link>
                    <span className="d-block">david@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">03 Dec 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">500</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$18,500.00</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$13,200.00</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">RichMaster Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-11.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Alice Johnson
                    </Link>
                    <span className="d-block">alice@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">23 Mar 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$6,300.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$4,000.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">Dajon Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4} xxl={3}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/seller-12.png"
                      className="wh-52"
                      alt="seller"
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className="text-decoration-none text-secondary fw-medium fs-16 mb-1"
                    >
                      Emily Brown
                    </Link>
                    <span className="d-block">emily@trezo.com</span>
                  </div>
                </div>

                <Dropdown className="action-opt ms-2 position-relative top-3">
                  <Dropdown.Toggle
                    variant="secondary" 
                    id="dropdown-basic"
                    className="bg-transparent p-0"
                  > 
                    <span className="material-symbols-outlined">
                  more_horiz
                </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white border box-shadow">
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	visibility
</i>
                      View
                    </Dropdown.Item>

                    <Dropdown.Item href="#"> 
                      <span className="material-symbols-outlined">
                  edit
                </span>
                      Edit
                    </Dropdown.Item>
      
                    <Dropdown.Item href="#"> 
                      <i className="material-symbols-outlined">
	delete
</i>
                      Delete
                    </Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>  
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Last Sale Date:</span>
                <span className="text-secondary ms-1">20 Jan 2024</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Item Stock:</span>
                <span className="text-secondary ms-1">99</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Wallet Balance:</span>
                <span className="text-secondary ms-1">$3,699.50</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span>Revenue:</span>
                <span className="text-secondary ms-1">$2,599.50</span>
              </div>
              <div className="d-flex align-items-center mb-0">
                <span>Store:</span>
                <span className="text-secondary ms-1">Barbahall Store</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Sellers;

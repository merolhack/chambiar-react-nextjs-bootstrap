"use client";

import { Card, Tab, Tabs } from "react-bootstrap";
import AllProducts from './AllProducts';
import PublishedProducts from './PublishedProducts';
import DraftProducts from './DraftProducts';

const ProductsList = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <Tabs
            defaultActiveKey="allProducts"
            id="uncontrolled-tab-example"
            className="border-0 gap-3 mb-lg-4 mb-3 products-list-tabs"
          >
            <Tab eventKey="allProducts" title="All Products">
              <AllProducts />
            </Tab>

            <Tab eventKey="publishedProducts" title="Published Products">
              <PublishedProducts />
            </Tab>

            <Tab eventKey="draftProducts" title="Draft Products">
              <DraftProducts />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductsList;
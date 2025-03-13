"use client";

import { Card, Table } from "react-bootstrap";
import Image from "next/image";
import Pagination from "./Pagination";

const membersData = [
  {
    id: "#JAN-854",
    member: {
      img: "/images/user-6.jpg",
      name: "Oliver Khan",
    },
    email: "oliver@trezo.com",
    phone: "+1 555-123-4567",
    location: "Washington D.C",
    joiningDate: "10 Oct 2024",
    lastActive: "01 Dec 2024 08:23 AM",
  },
  {
    id: "#JAN-853",
    member: {
      img: "/images/user-7.jpg",
      name: "Carolyn Barnes",
    },
    email: "carolyn@trezo.com",
    phone: "+1 555-987-6543",
    location: "Chicago",
    joiningDate: "11 Sep 2024",
    lastActive: "02 Dec 2024 05:09 PM",
  },
  {
    id: "#JAN-852",
    member: {
      img: "/images/user-8.jpg",
      name: "Donna Miller",
    },
    email: "donna@trezo.com",
    phone: "+1 555-456-7890",
    location: "Oklahoma City",
    joiningDate: "12 Aug 2024",
    lastActive: "03 Dec 2024 09:30 AM",
  },
  {
    id: "#JAN-851",
    member: {
      img: "/images/user-9.jpg",
      name: "Barbara Cross",
    },
    email: "barbara@trezo.com",
    phone: "+1 555-369-7878",
    location: "San Diego",
    joiningDate: "13 Jul 2024",
    lastActive: "04 Dec 2024 10:22 AM",
  },
  {
    id: "#JAN-850",
    member: {
      img: "/images/user-10.jpg",
      name: "Rebecca Block",
    },
    email: "rebecca@trezo.com",
    phone: "+1 555-658-4488",
    location: "Los Angeles",
    joiningDate: "14 Jun 2024",
    lastActive: "05 Dec 2024 08:49 AM",
  },
  {
    id: "#JAN-849",
    member: {
      img: "/images/user-11.jpg",
      name: "Ramiro McCarty",
    },
    email: "ramiro@trezo.com",
    phone: "+1 555-558-9966",
    location: "Las Vegas",
    joiningDate: "15 May 2024",
    lastActive: "06 Dec 2024 04:35 PM",
  },
  {
    id: "#JAN-848",
    member: {
      img: "/images/user-12.jpg",
      name: "Robert Fairweather",
    },
    email: "robert@trezo.com",
    phone: "+1 555-357-5888",
    location: "San Francisco",
    joiningDate: "16 Apr 2024",
    lastActive: "07 Dec 2024 06:13 PM",
  },
  {
    id: "#JAN-847",
    member: {
      img: "/images/user-13.jpg",
      name: "Marcelino Haddock",
    },
    email: "marcelino@trezo.com",
    phone: "+1 555-456-8877",
    location: "Washington D.C",
    joiningDate: "17 Mar 2024",
    lastActive: "08 Dec 2024 02:20 AM",
  },
  {
    id: "#JAN-846",
    member: {
      img: "/images/user-14.jpg",
      name: "Thomas Wilson",
    },
    email: "thomas@trezo.com",
    phone: "+1 555-622-4488",
    location: "San Diego",
    joiningDate: "18 Feb 2024",
    lastActive: "09 Dec 2024 12:09 AM",
  },
  {
    id: "#JAN-845",
    member: {
      img: "/images/user-15.jpg",
      name: "Nathaniel Hulsey",
    },
    email: "nathaniel@trezo.com",
    phone: "+1 555-225-4488",
    location: "Chicago",
    joiningDate: "19 Jan 2024",
    lastActive: "10 Dec 2024 06:03 PM",
  },
  {
    id: "#JAN-845",
    member: {
      img: "/images/user-15.jpg",
      name: "Nathaniel Hulsey",
    },
    email: "nathaniel@trezo.com",
    phone: "+1 555-225-4488",
    location: "Chicago",
    joiningDate: "19 Jan 2024",
    lastActive: "10 Dec 2024 06:03 PM",
  },
];

const Members = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="default-table-area all-products">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Member</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Location</th>
                    <th scope="col">Joining Date</th>
                    <th scope="col">Last Active</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {membersData &&
                    membersData.slice(0, 10).map((value, i) => (
                      <tr key={i}>
                        <td>{value.id}</td>

                        <td>
                          <div className="d-flex align-items-center">
                            <Image
                              src={value.member.img}
                              className="wh-40 rounded-circle"
                              alt="user"
                              width={40}
                              height={40}
                            />
                            <div className="ms-2">
                              <h6 className="fw-medium fs-14 mb-0">
                                {value.member.name}
                              </h6>
                            </div>
                          </div>
                        </td>

                        <td>{value.email}</td>

                        <td>{value.phone}</td>

                        <td>{value.location}</td>

                        <td>{value.joiningDate}</td>

                        <td>{value.lastActive}</td>

                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-primary">
                                visibility
                              </span>
                            </button>

                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-body">
                                edit
                              </span>
                            </button>

                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-danger">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <Pagination />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Members;

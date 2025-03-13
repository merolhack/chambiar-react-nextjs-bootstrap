"use client";

import { Table } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const Connections = () => {
  return (
    <>
      <h4 className="fs-18 mb-2">Connected Accounts</h4>

      <div className="default-table-area connected-table border-bottom pb-3 mb-4">
        <div className="table-responsive">
          <Table className="table align-middle border-0">
            <tbody>
              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/google2.svg"
                      alt="google2"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">Google</span>
                      <p className="fs-14 text-body fw-normal">
                        Calendar and Contacts
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/slack.svg"
                      alt="slack"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">Slack</span>
                      <p className="fs-14 text-body fw-normal">
                        Communications
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/git.svg"
                      alt="git"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">Github</span>
                      <p className="fs-14 text-body fw-normal">
                        Manage your Git repositories
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/mailchimp.svg"
                      alt="mailchimp"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">
                        Mailchimp
                      </span>
                      <p className="fs-14 text-body fw-normal">
                        Email marketing service
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/asana.svg"
                      alt="asana"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">Asana</span>
                      <p className="fs-14 text-body fw-normal">
                        Communication
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <h4 className="fs-18 mb-2">Social Accounts</h4>

      <div className="default-table-area connected-table">
        <div className="table-responsive">
          <table className="table align-middle border-0">
            <tbody>
              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/facebook3.svg"
                      alt="facebook2"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">
                        Facebook
                      </span>
                      <p className="fs-14 text-body fw-normal">
                        Calendar and Contacts
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/twitter.svg"
                      alt="twitter"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">Twitter</span>
                      <p className="fs-14 text-body fw-normal">
                        Communications
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/instagram.svg"
                      alt="instagram"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">
                        Instagram
                      </span>
                      <p className="fs-14 text-body fw-normal">
                        Manage your Git repositories
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/dribbble2.svg"
                      alt="dribbble2"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">
                        Dribbble
                      </span>
                      <p className="fs-14 text-body fw-normal">
                        Email marketing service
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="ps-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="/images/behance.svg"
                      alt="behance"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <span className="fw-semibold text-dark">Behance</span>
                      <p className="fs-14 text-body fw-normal">
                        Communication
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <Link
                    href="#"
                    className="text-decoration-none text-primary fs-14"
                  >
                    Click to Disconnect
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Connections;

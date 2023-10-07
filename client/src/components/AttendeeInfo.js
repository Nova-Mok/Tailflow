import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  Image,
  Avatar,
  Stack,
  Heading,
  Center,
  VStack,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBBadge,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

function AttendeeInfo() {
  const [attendeeData, setAttendeeData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const email = new URLSearchParams(window.location.search).get("email");

  useEffect(() => {
    async function fetchGoogleSearchResults() {
      try {
        const namePart = email.split("@")[0];
        const response = await axios.get(
          `http://localhost:3001/search/${email}`
        );
        setSearchResults(response.data.items);
      } catch (error) {
        console.error("Error fetching data from Google Search:", error.message);
      }
    }

    if (email) {
      fetchGoogleSearchResults();
    }
  }, [email]);

  useEffect(() => {
    async function fetchAttendeeInfo() {
      try {
        const response = await axios.get(
          `http://localhost:3001/clearbit/${email}`
        );
        setAttendeeData(response.data);

        const domain = email.split("@")[1];
        const companyResponse = await axios.get(
          `http://localhost:3001/company/${domain}`
        );
        setCompanyData(companyResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    if (email) {
      fetchAttendeeInfo();
    }
  }, [email]);

  if (!attendeeData || !companyData) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <MDBContainer className="py-5  ">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-2">
              <MDBBreadcrumbItem>
                <a href="#">Calander</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">Events</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <div className="p-1 text-center bg-light">
            <h1 className="mb-1">Attendee Profile</h1>
          </div>
          <MDBCol lg="3">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardText> Profile Fetch:</MDBCardText>
                <MDBBadge color="success" light>
                  Success
                </MDBBadge>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "135px" }}
                >
                  <MDBCardImage
                    src={attendeeData.person.avatar || "/ninja.png"}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "100px" }}
                    fluid
                  />
                </div>
                <p className="text-muted mb-1">
                  {" "}
                  {attendeeData.person.name.fullName || "N/A"}{" "}
                </p>

                <p className="text-muted mb-4">
                  {" "}
                  {attendeeData.person.employment.title || "N/A"} at{" "}
                  {attendeeData.person.employment.name || "N/A"}{" "}
                </p>
                <div className="d-flex justify-content-center mb-">
                  <MDBBtn> Schedule New Event</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {attendeeData.person.name.fullName || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {attendeeData.person.email || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Title</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {attendeeData.person.employment.title || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Employment</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {attendeeData.person.employment.name || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {attendeeData.person.location || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>LinkedIn</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {attendeeData.person.linkedin?.handle || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer className="1">
        <MDBRow>
          <div className="p-1 text-center bg-light">
            <h1 className="mb-1">Organisation Profile</h1>
          </div>
          <MDBCol lg="3">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "135px" }}
                >
                  <MDBCardImage
                    src={companyData.logo}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "100px" }}
                    fluid
                  />
                </div>
                <MDBCardText className="mb-1">Organisation Name</MDBCardText>
                <p className="text-muted mb-1"> {companyData.name || "N/A"}</p>
                <MDBCardText className="mb-1">Description</MDBCardText>
                <p className="text-muted mb-4">
                  {" "}
                  {companyData.description || "N/A"}
                </p>
                <div className="d-flex justify-content-center mb-">
                  <MDBBtn>LinkedIn</MDBBtn>
                  <MDBBtn outline className="ms-1">
                    Twitter
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Domain</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {companyData.domain || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Year Founded</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {companyData.foundedYear || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Head Count</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {companyData.metrics?.employees || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Estimated Annual Revenue</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {companyData.metrics?.estimatedAnnualRevenue || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Traffic Rank</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {companyData.metrics?.alexaUsRank || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Location</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Location: {companyData.location || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Type</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {companyData.type || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Sector</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {companyData.category.industry || "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol xl="10">
            <MDBCard className="mb-5" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <MDBTypography tag="h3">Extra Insights</MDBTypography>
                <MDBCardText className="small">
                  <MDBIcon far icon="star" size="lg" />
                  <span className="mx-2">|</span> Curated by{" "}
                  <strong>Taleflow</strong> with ❤️
                </MDBCardText>
                <hr className="my-4" />
                <Text>
                  Person Seniority:{" "}
                  {attendeeData.person.employment.seniority || "N/A"}
                </Text>
                <Text>Person Number: {attendeeData.person.phone || "N/A"}</Text>
                <Text>
                  Twitter followers:{" "}
                  {attendeeData.person.twitter.followers || "N/A"}
                </Text>
                <hr />
                <Text>News & Updates (Google Search) </Text>
                {searchResults && searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                    <Box key={index} my={3}>
                      <Text fontWeight="bold">{item.title}</Text>
                      <Text>{item.snippet}</Text>
                      <Text color="blue.500">
                        <a href={item.link} target="_blank" rel="noreferrer">
                          {item.displayLink}
                        </a>
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text className="text-muted">
                    {" "}
                    No search results available.{" "}
                  </Text>
                )}
                <hr />
                <Text> Upcoming Events from {companyData.name || "N/A"}</Text>

                <div className="d-flex justify-content-start align-items-center">
                  <MDBCardText className="text-uppercase mb-0">
                    <MDBIcon fas icon="cog me-2" />{" "}
                    <span className="text-muted small">
                      Last Updated: {attendeeData.person.indexedAt || "N/A"}
                    </span>
                  </MDBCardText>
                  <MDBCardText className="text-uppercase mb-0">
                    <MDBIcon fas icon="ellipsis-h ms-4 me-2" />{" "}
                    <span className="text-muted small">Flag Results</span>{" "}
                    <span className="ms-3 me-4">|</span>
                  </MDBCardText>
                  <a href="#!">
                    <MDBCardImage
                      width="35"
                      src="https://cdn-icons-png.flaticon.com/128/6008/6008363.png?ga=GA1.1.1563851258.1694609348&track=ais"
                      alt="avatar"
                      className="rounded-circle me-3"
                      fluid
                    />
                  </a>
                  <MDBBtn outline color="dark" floating size="sm">
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default AttendeeInfo;

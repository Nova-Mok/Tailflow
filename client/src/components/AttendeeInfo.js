import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Image, Avatar, Stack, Heading, Center  } from "@chakra-ui/react";

function AttendeeInfo() {
  const [attendeeData, setAttendeeData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const email = new URLSearchParams(window.location.search).get('email');

  useEffect(() => {
    async function fetchAttendeeInfo() {
      try {
        const response = await axios.get(`http://localhost:3001/clearbit/${email}`);
        setAttendeeData(response.data);

        const domain = email.split('@')[1]; 
        const companyResponse = await axios.get(`http://localhost:3001/company/${domain}`);
        setCompanyData(companyResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    if(email) {
      fetchAttendeeInfo();
    }
  }, [email]);

  if (!attendeeData || !companyData) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box mt={5}>
      <Flex direction="column" align="center">
        <Text fontWeight="bold" fontSize="xl">Attendee Profile</Text>
        {attendeeData.person.avatar && <Image src={attendeeData.person.avatar} alt="Attendee Avatar" boxSize="100px" mb={3} />}
        <Text>Name: {attendeeData.person.name.fullName}</Text>
        <Text>Name: {attendeeData.person.name.fullName || "N/A"}</Text>
        <Text>Email: {attendeeData.person.email || "N/A"}</Text>
        <Text>Location: {attendeeData.person.location || "N/A"}</Text>
        <Text>Employment: {attendeeData.person.employment.name || "N/A"}</Text>
        <Text>Title: {attendeeData.person.employment.title || "N/A"}</Text>
        
        {/* Company Information */}
        <Text fontWeight="bold" fontSize="xl" mt={5}>Company Information</Text>
        {companyData.logo && <Image src={companyData.logo} alt="Company Logo" boxSize="100px" mb={3} />}
        <Text>Name: {companyData.name || "N/A"}</Text>
        <Text>Domain: {companyData.domain || "N/A"}</Text>
        <Text>Description: {companyData.description || "N/A"}</Text>
        <Text>Year Founded: {companyData.foundedYear || "N/A"}</Text>
        <Text>Employees: {companyData.metrics?.employees || "N/A"}</Text>
        <Text>Type: {companyData.type || "N/A"}</Text>
        <Text>Traffic Rank: {companyData.metrics?.alexaUsRank || "N/A"}</Text>
        <Text>Estimated Annual Revenue: {companyData.metrics?.estimatedAnnualRevenue || "N/A"}</Text>
        <Text>Fiscal Year End: {companyData.fiscalYearEnd || "N/A"}</Text>
        <Text>LinkedIn: {companyData.linkedin?.handle || "N/A"}</Text>
        <Text>Twitter: {companyData.twitter?.handle || "N/A"}</Text>
        <Text>Timezone: {companyData.timeZone || "N/A"}</Text>
        <Text>Phone Number: {companyData.phone || "N/A"}</Text>
        <Text>Location: {companyData.location || "N/A"}</Text>

        <Text fontWeight="bold" fontSize="xl" mt={5}>New's Section</Text>
        <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks, no-undef
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={companyData.logo}
            fill
            alt="Example"
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Inshort 
          </Text>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks, no-undef
            fontSize={'2xl'}
            fontFamily={'body'}>
            Recent {companyData.name} news
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </Text>
        </Stack>
      </Box>
    </Center>
      </Flex>
    </Box>
  );
}

export default AttendeeInfo;

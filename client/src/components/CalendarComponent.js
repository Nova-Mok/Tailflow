import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const handleLoginClick = () => {
    window.location.href = "http://localhost:3001/auth/google";
  }
  
  const handleKnowMore = (email) => {
    window.location.href = `/attendee-info?email=${email}`;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('token')) {
      setAccessToken(urlParams.get('token'));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!accessToken) return;

      const response = await axios.get("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = response.data;
      setEvents(data.items);
    }

    fetchData();
  }, [accessToken]);

  const now = new Date();

  const pastEvents = events.filter(event => 
    event.start && new Date(event.start.dateTime || event.start.date) < now
  );
  
  const upcomingEvents = events.filter(event => 
    event.start && new Date(event.start.dateTime || event.start.date) >= now
  );

  return (
    <Box mt={5}>
      {accessToken ? (
        <Box>
          {/* Past Events */}
          <Box mb={5}>
            <h2>Past Events</h2>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Event</Th>
                  <Th>Attendee Email</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pastEvents.map(event => (
                  <Tr key={event.id}>
                    <Td>{new Date(event.start?.dateTime || event.start?.date).toLocaleDateString()}</Td>
                    <Td>{event.summary}</Td>
                    <Td>{event.attendees?.[0]?.email || "N/A"}</Td>
                    <Td> <Td>
  <Button onClick={() => handleKnowMore(event.attendees?.[0]?.email)}>
    Know More
  </Button>
</Td> </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Upcoming Events */}
          <Box mb={5}>
            <h2>Upcoming Events</h2>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Event</Th>
                  <Th>Attendee Email</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {upcomingEvents.map(event => (
                  <Tr key={event.id}>
                    <Td>{new Date(event.start?.dateTime || event.start?.date).toLocaleDateString()}</Td>
                    <Td>{event.summary}</Td>
                    <Td>{event.attendees?.[0]?.email || "N/A"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      ) : (
        <Button onClick={handleLoginClick}>Login with Google Calendar</Button>
      )}
    </Box>
  );
}

export default CalendarComponent;

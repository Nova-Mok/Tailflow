import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarComponent from './components/CalendarComponent';
import AttendeeInfo from './components/AttendeeInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/attendee-info" element={<AttendeeInfo />} />
        <Route path="/" element={<CalendarComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

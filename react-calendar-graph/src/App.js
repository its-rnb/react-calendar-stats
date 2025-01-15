import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import dummyData from "./dummyData.json";

const localizer = momentLocalizer(moment);

const events = Object.keys(dummyData).map((date) => ({
  start: moment(date, "DD-MM-YYYY").toDate(),
  end: moment(date, "DD-MM-YYYY").toDate(),
  title: "Data Available",
}));

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [barData, setBarData] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = (slotInfo) => {
    const formattedDate = moment(slotInfo.start).format("DD-MM-YYYY");
    const dataForDate = dummyData[formattedDate];

    if (dataForDate) {
      setBarData(dataForDate);
      setSelectedDate(formattedDate);
      setOpenDialog(true);
    } else {
      alert("No data found for the selected date.");
    }
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <h1>React Big Calendar with Bar Graph</h1>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        view={view}
        date={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        dayPropGetter={(date) => {
          const formattedDate = moment(date).format("DD-MM-YYYY");
          return selectedDate === formattedDate
            ? { style: { backgroundColor: "#add8e6", border: "1px solid #000" } }
            : {};
        }}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Data for {selectedDate}</DialogTitle>
        <DialogContent>
          <BarChart width={400} height={300} data={barData}>
            <XAxis dataKey="user" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
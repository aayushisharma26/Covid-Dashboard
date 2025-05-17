import React, { useEffect, useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import StatsCard from './components/StatsCard';
import CustomLineChart from './components/LineChart';
import CustomPieChart from './components/PieChart';
import DateRangePickerComponent from './components/DateRangePicker';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [covidData, setCovidData] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date('2020-10-24'),
    endDate: new Date('2023-10-19'),
  });

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=1500`)
      .then(res => res.json())
      .then(data => {
        if (data.timeline) {
          setCovidData(data.timeline);
        } else {
          setCovidData(data); // fallback
        }
      })
      .catch(err => {
        console.error(err);
        setCovidData(null);
      });
  }, [selectedCountry]);

  const handleCountryChange = e => {
    setSelectedCountry(e.target.value);
  };

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const prepareLineChartData = () => {
    if (!covidData?.cases) return [];
    return Object.keys(covidData.cases)
      .filter(date => {
        const dateObj = new Date(date);
        return dateObj >= dateRange.startDate && dateObj <= dateRange.endDate;
      })
      .map(date => ({
        date,
        Cases: covidData.cases[date],
        Recovered: covidData.recovered?.[date] || 0,
        Deaths: covidData.deaths?.[date] || 0,
      }));
  };

  const preparePieChartData = () => {
    if (!covidData?.cases) return [];
    const filteredDates = Object.keys(covidData.cases).filter(date => {
      const dateObj = new Date(date);
      return dateObj >= dateRange.startDate && dateObj <= dateRange.endDate;
    });
    const latestDate = filteredDates[filteredDates.length - 1];
    return [
      { name: 'Total Population', value: 140000000 },
      { name: 'Recovered', value: covidData.recovered?.[latestDate] || 0 },
      { name: 'Deaths', value: covidData.deaths?.[latestDate] || 0 },
    ];
  };

  const latestDate = covidData?.cases ? Object.keys(covidData.cases).pop() : null;

  const formatValue = (data) => {
    return data !== undefined ? data.toLocaleString() : "Data Not Available";
  };

  return (
    <div className="App">
      <h1>COVID-19 and Population Dashboard</h1>

      <div className="top-bar">
        <Dropdown countries={countries} onChange={handleCountryChange} />
        <DateRangePickerComponent onDateChange={handleDateChange} />
      </div>

      <div className="cards">
        <StatsCard
          title="Total Cases"
          value={formatValue(covidData?.cases?.[latestDate])}
          bgColor="#4B7BE5"
        />
        <StatsCard
          title="Recoveries"
          value={formatValue(covidData?.recovered?.[latestDate])}
          bgColor="#4CAF50"
        />
        <StatsCard
          title="Deaths"
          value={formatValue(covidData?.deaths?.[latestDate])}
          bgColor="#f44336"
        />
      </div>

      <div className="charts">
        <div className="line-chart">
          <h3>Line Chart</h3>
          <CustomLineChart data={prepareLineChartData()} />
        </div>
        <div className="pie-chart">
          <h3>Pie Chart</h3>
          <CustomPieChart data={preparePieChartData()} />
        </div>
      </div>
    </div>
  );
}

export default App;

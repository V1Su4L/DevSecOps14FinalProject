import axios from "axios";
import React, { useState } from "react";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, Alert } from '@mui/material';
import './Check.css';

// Use the IP address of your Ingress
const API_URL = 'http://104.197.99.174:5001/api';

function Check() {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${API_URL}/check`, { nm: name }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log("Response:", response);
      setResult(response.data.result);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }

      if (error.code === 'ECONNABORTED') {
        console.error("Timeout Error: Post request took too long");
      } else if (error.code === 'ERR_NETWORK') {
        console.error("Network Error: Post failed");
      }

      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h3" gutterBottom className="title">Social Media Search</Typography>
      <Typography variant="body1" gutterBottom className="description">
        Enter a name to search for profiles on various social media platforms.
      </Typography>
      <div className="input-container">
        <TextField
          value={name}
          onChange={handleInputChange}
          label="Enter name"
          variant="outlined"
          fullWidth
          className="input"
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          className="button"
        >
          Search
        </Button>
      </div>
      {error && <Alert severity="error" className="error">{error}</Alert>}
      <List className="result-list">
        {result.map((url, index) => (
          <ListItem key={index} className="result-item">
            <ListItemText primary={url} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Check;

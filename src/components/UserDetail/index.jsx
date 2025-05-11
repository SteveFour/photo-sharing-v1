// components/UserDetail/index.jsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchModel(`/api/user/${userId}`, (err, data) => {
      if (err) {
        console.error("Error fetching user detail:", err);
        setError(err);
      } else {
        setUser(data);
      }
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return <Typography>Loading user details…</Typography>;
  }
  if (error) {
    return (
      <Typography color="error">
        Failed to load user details for ID {userId}.
      </Typography>
    );
  }
  if (!user) {
    return (
      <Typography>
        User with ID <strong>{userId}</strong> not found.
      </Typography>
    );
  }

  return (
    <div className="user-detail-container">
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {user.occupation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {user.location}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Description:</strong> {user.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/photos/${userId}`}
            variant="contained"
            color="primary"
          >
            View Photos
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default UserDetail;

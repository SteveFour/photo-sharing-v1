import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  
  if (!user) {
    return (
      <Typography variant="body1">
        User with ID {userId} not found.
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

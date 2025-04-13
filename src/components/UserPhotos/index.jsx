import React from "react";
import { 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Format date string to a more readable format
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);
  
  // Import all images from src/images folder
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  };
  
  // Load all images from src/images
  const imageContext = require.context('../../images', false, /\.(png|jpe?g|svg)$/);
  const images = importAll(imageContext);
  
  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1" className="photo-message">
        No photos found for this user.
      </Typography>
    );
  }
  
  return (
    <div className="photos-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Photos by {user ? `${user.first_name} ${user.last_name}` : ''}
      </Typography>
      
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <CardMedia
            component="img"
            className="photo-image"
            image={images[photo.file_name] || `${process.env.PUBLIC_URL}/images/${photo.file_name}`}
            alt={`Photo by ${user ? user.first_name : 'user'}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Posted: {formatDate(photo.date_time)}
            </Typography>
            
            {photo.comments && photo.comments.length > 0 && (
              <>
                <Typography variant="h6" className="comments-header">
                  Comments
                </Typography>
                <List>
                  {photo.comments.map((comment) => (
                    <React.Fragment key={comment._id}>
                      <ListItem alignItems="flex-start" className="comment-item">
                        <ListItemAvatar>
                          <Avatar>
                            {comment.user.first_name.charAt(0)}
                            {comment.user.last_name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Link to={`/users/${comment.user._id}`} className="comment-user-link">
                              {comment.user.first_name} {comment.user.last_name}
                            </Link>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                              >
                                {formatDate(comment.date_time)}
                              </Typography>
                              <Typography component="p" variant="body1">
                                {comment.comment}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;

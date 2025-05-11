// components/UserPhotos/index.jsx

import React, { useState, useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export default function UserPhotos() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user detail
  useEffect(() => {
    if (!userId) return;
    setLoadingUser(true);
    fetchModel(`/api/user/${userId}`, (err, data) => {
      if (err) {
        console.error("Failed to load user:", err);
        setError(err);
      } else {
        setUser(data);
      }
      setLoadingUser(false);
    });
  }, [userId]);

  // Fetch photos & comments
  useEffect(() => {
    if (!userId) return;
    setLoadingPhotos(true);
    fetchModel(`/api/photosOfUser/${userId}`, (err, data) => {
      if (err) {
        console.error("Failed to load photos:", err);
        setError(err);
      } else {
        setPhotos(data);
      }
      setLoadingPhotos(false);
    });
  }, [userId]);

  if (!userId) {
    return (
      <Typography variant="body1" className="photo-message">
        Invalid user ID
      </Typography>
    );
  }
  if (loadingUser || loadingPhotos) {
    return <Typography>Loading…</Typography>;
  }
  if (error) {
    return (
      <Typography color="error">
        Error loading data. Please try again later.
      </Typography>
    );
  }
  if (!user) {
    return (
      <Typography variant="body1" className="photo-message">
        User not found.
      </Typography>
    );
  }

  return (
    <div className="photos-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Photos by {user.first_name} {user.last_name}
      </Typography>

      {photos.length === 0 ? (
        <Typography variant="body1" className="photo-message">
          No photos found for this user.
        </Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} className="photo-card">
            <CardMedia
              component="img"
              className="photo-image"
              // assuming your Express is serving /images/<file_name>
              image={`/images/${photo.file_name}`}
              alt={`Photo by ${user.first_name}`}
              sx={{ maxHeight: 500, objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Posted: {formatDate(photo.date_time)}
              </Typography>

              {photo.comments?.length > 0 && (
                <>
                  <Typography variant="h6" className="comments-header">
                    Comments
                  </Typography>
                  <List>
                    {photo.comments.map((comment) => (
                      <React.Fragment key={comment._id}>
                        <ListItem
                          alignItems="flex-start"
                          className="comment-item"
                        >
                          <ListItemAvatar>
                            <Avatar>
                              {comment.user?.first_name?.[0]}
                              {comment.user?.last_name?.[0]}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Link
                                to={`/users/${comment.user?._id}`}
                                className="comment-user-link"
                              >
                                {comment.user?.first_name}{" "}
                                {comment.user?.last_name}
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
        ))
      )}
    </div>
  );
}

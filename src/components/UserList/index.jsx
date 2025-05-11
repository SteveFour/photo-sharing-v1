import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, React component of Project 4/5.
 */
function UserList() {
  const [users, setUsers] = useState([]); // ← state chứa users
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel("/api/user/list", (err, data) => {
      if (err) {
        console.error("Error fetching user list:", err);
        setError(err);
      } else {
        setUsers(data);
      }
    });
  }, []);

  if (error) {
    return <Typography color="error">Failed to load users</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" className="user-list-title">
        Users
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;

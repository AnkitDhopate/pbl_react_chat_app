import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVertSharp";
import "./Sidebar.css";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import db from "../firebase.js";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unSubscribe = db
      .collection("users")
      .doc(user.providerData[0].uid)
      .collection("chat_ids")
      .onSnapshot((snapshot) => {
        if (snapshot.empty !== true) {
          setChats(
            snapshot.docs.map((doc) => ({
              chat_id: doc.id,
              friend_uid: doc.get("friend_uid"),
              friend_name: doc.get("friend_name"),
            }))
          );
        }
      });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          <Avatar src={user.photoURL} />
          <h3>{user.displayName}</h3>
        </div>

        <div className="sidebar_search">
          <div className="search_container">
            <SearchOutlined />
            <input type="text" placeholder="Search or start new chat" />
          </div>
        </div>

        <div className="sidebar_chats">
          <SidebarChat addNewChat />
          {chats.map((chat) => (
            <SidebarChat
              key={chat.chat_id}
              id={chat.chat_id}
              name={chat.friend_name}
              friend_uid={chat.friend_uid}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

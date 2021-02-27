import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../firebase";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarChat = ({ id, name, addNewChat, friend_uid }) => {
  const user = useSelector((state) => state.user);
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(friend_uid)
      .onSnapshot((snap) => {
        setUrl(snap.get("photoURL"));
      });
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const userUID = prompt("Please the uid of the user");

    if (userUID === user.providerData[0].uid) {
      alert("Cannot start with own uid");
    } else {
      db.collection("users").onSnapshot((snapshot) => {
        // Check if user exists
        const check = snapshot.docs.every((data) => {
          if (data.get("uid") === userUID) return false;
          return true;
        });

        if (check == false) {
          // users -> uid -> chat_id -> docId Generator
          const chatIDDocGen =
            user.providerData[0].uid.localeCompare(userUID) === 1
              ? userUID + user.providerData[0].uid
              : user.providerData[0].uid + userUID;

          // Friend User name generation
          let userName;
          db.collection("users")
            .doc(userUID)
            .get("name")
            .then((data) => {
              userName = data.get("name");
            });

          db.collection("users")
            .doc(user.providerData[0].uid)
            .collection("chat_ids")
            .doc(chatIDDocGen)
            .get()
            .then((docSnap) => {
              if (docSnap.exists) {
                console.log("already exists");
              } else {
                // Sender
                db.collection("users")
                  .doc(user.providerData[0].uid)
                  .collection("chat_ids")
                  .doc(chatIDDocGen)
                  .set({
                    friend_uid: userUID,
                    friend_name: userName,
                  });

                // Receiver
                db.collection("users")
                  .doc(userUID)
                  .collection("chat_ids")
                  .doc(chatIDDocGen)
                  .set({
                    friend_uid: user.providerData[0].uid,
                    friend_name: user.providerData[0].displayName,
                  });
              }
            });
        } else {
          alert("Not such user found");
        }
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat_container">
        <div className="sidebar_chat">
          <Avatar src={url} />
          <div className="sidebar_chat_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar_chat_container">
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
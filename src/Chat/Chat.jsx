import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "../firebase";
import firebase from "firebase";
import ReactScrollableFeed from "react-scrollable-feed";
import { useSelector } from "react-redux";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (roomId) {
      let friend_uid;

      if (roomId.substr(0, 21) !== user.providerData[0].uid) {
        friend_uid = roomId.substr(0, 21);
      } else {
        friend_uid = roomId.substr(21);
      }

      db.collection("users")
        .doc(friend_uid)
        .onSnapshot((snap) => {
          setUrl(snap.get("photoURL"));
        });

      db.collection("users")
        .doc(user.providerData[0].uid)
        .collection("chat_ids")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.get("friend_name")));

      db.collection("chats")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("chats").doc(roomId).collection("messages").add({
      message: input,
      sender: user.providerData[0].displayName,
      receiver: roomName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={url} />
        <div className="chat_header_info">
          <h3>{roomName}</h3>
          <p>
            Last seen :
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
      </div>

      <ReactScrollableFeed>
        <div className="chat_body">
          <div className="temp">
            {messages.map((message) =>
              message.sender === user.providerData[0].displayName ? (
                <p className="chat_msg chat_sender">
                  <span className="chat_name">{message.sender}</span>
                  {message.message}
                  <span className="timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
                </p>
              ) : (
                <p className="chat_msg">
                  <span className="chat_name">{message.sender}</span>
                  {message.message}
                  <span className="timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
                </p>
              )
            )}
          </div>
        </div>
      </ReactScrollableFeed>

      <div className="chat_footer">
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type a message ..."
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

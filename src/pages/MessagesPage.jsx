import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { HashLoader } from "react-spinners";
import MessageCard from "../components/MessageCard";
import axios from "axios";

export default function MessagesPage() {
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMessages() {
    try {
      const { data, error } = await supabase
        .from("Message")
        .select("*")
        .eq("receiver", state.username)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data != null) {
        setMessages(data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  function renderMessages() {
    if (loading) {
      return (
        <div className="flex items-center justify-center mt-6">
          <HashLoader size={150} color="red" loading={true} />
        </div>
      );
    }

    if (messages.length === 0) {
      return <div className="flex justify-center">No Messages</div>;
    }

    return messages?.map((message) => {
      return (
        <MessageCard
          message={message}
          user={state}
          key={`${message.created_at}-${message.content}-${message.id}`}
        />
      );
    });
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-4 items-center">
        <div className="flex flex-row justify-center h-15 w-5/6">
          <div className="min-h-screen w-5/6 rounded-md">
            <div id="messages">{renderMessages()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

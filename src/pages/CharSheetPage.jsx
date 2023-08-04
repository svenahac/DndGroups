import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import axios from "axios";
import CreateSheet from "../components/CreateSheet";
import UpdateSheet from "../components/UpdateSheet";

export default function CharSheetPage() {
  const { state } = useLocation();
  const [charSheet, setCharSheet] = useState({});

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", state.id);
      if (error) throw error;
      if (data != null) {
        setUser(data[0]);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getCharSheet() {
    try {
      const { data, error } = await supabase
        .from("Char_Sheet")
        .select("*")
        .eq("u_id", state.id);
      if (error) throw error;
      if (data != null) {
        setCharSheet(data[0]);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getCharSheet();
    getUser();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      {user.hasCharSheet === true ? (
        <UpdateSheet state={state} />
      ) : (
        <CreateSheet state={state} />
      )}
    </div>
  );
}

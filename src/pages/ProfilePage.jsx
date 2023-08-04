import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import PostCard from "../components/PostCard";

export default function ProfilePage() {
  const { state } = useLocation();
  const [posts, setPosts] = useState([]);
  const [rating, setRating] = useState(0);

  async function getRating() {
    try {
      const { data, error } = await supabase
        .from("Rating")
        .select("*")
        .eq("u_id", state.id);
      if (error) throw error;
      if (data != null) {
        setRating(data[0].rating);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getMyPosts() {
    try {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("u_id", state.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setPosts(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  function renderPosts() {
    if (posts.length === 0) {
      return (
        <div className="flex justify-center">You don't have any Posts</div>
      );
    }

    return posts?.map((post) => {
      return (
        <PostCard
          post={post}
          username={state.username}
          key={`${post.location}-${post.title}-${post.date}`}
        />
      );
    });
  }

  function formatDate(input) {
    var datePart = input.split("-"),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  }

  useEffect(() => {
    getRating();
    getMyPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-4 items-center">
        <div className="flex flex-row justify-center w-5/6">
          <div className="border-2 bg-gradient-to-r from-rose-500 to-red-500 border-rose-500 h-36 w-72 rounded-xl p-2">
            <div className="font-bold uppercase"> @{state.username}</div>
            <div>
              {state.name} {state.last_name}
            </div>
            <div>Email: {state.email}</div>
            <div>Date Of Birth: {formatDate(state.date_of_birth)}</div>
            <div>
              {rating && rating !== 0 && rating !== null ? (
                <span>{`Rating ${rating}/5 ⭐`}</span>
              ) : (
                <span>No Rating</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-5/6 font-bold mt-2 mb-2 text-3xl">
          My Posts
        </div>
        <div className="w-130">{renderPosts()}</div>
      </div>
    </div>
  );
}

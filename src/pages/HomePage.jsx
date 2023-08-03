import { useLayoutEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../api/supabaseClient";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function HomePage() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  async function getUser() {
    const { data } = await axios.get("http://localhost:6969/users/login", {
      withCredentials: true,
    });
    setUser(data.user);
  }

  useLayoutEffect(() => {
    getPosts();
    getUser();
  }, []);

  async function getPosts() {
    try {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setPosts(data);
        setTimeout(() => {
          setLoading(false);
        }, 100);
        console.log(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function createPost() {
    try {
      const { data, error } = await supabase
        .from("Post")
        .insert({
          title: postForm.title,
          description: postForm.description,
          location: postForm.location,
          date: postForm.datetime,
          size: postForm.size,
          creator_name: user.username,
          u_id: user.id,
        })
        .single();
      if (error) throw error;
      await getPosts();
    } catch (err) {
      console.error(err.message);
    }
  }

  function renderPosts() {
    if (loading) {
      return (
        <div className="flex items-center justify-center mt-6">
          <HashLoader size={150} color="red" loading={true} />
        </div>
      );
    }

    if (posts.length === 0) {
      return <div className="flex justify-center">No new Posts</div>;
    }

    return posts?.map((post) => {
      return (
        <PostCard
          post={post}
          key={`${post.location}-${post.title}-${post.date}`}
        />
      );
    });
  }

  const [postForm, setPostForm] = useState({
    title: "",
    description: "",
    location: "",
    datetime: "YYYY-MM-DD",
    size: 0,
  });

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setPostForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-4 items-center">
        <div className="flex flex-row justify-center w-5/6">
          <div className="flex flex-row justify-center w-1/2 lg:w-1/3">
            <button
              onClick={() => setShowModal(true)}
              className="h-12 w-4/6 xl:w-2/6  bg-gradient-to-r from-rose-700 to-red-700 mb-2 mr-2 rounded-xl text-center justify-center flex items-center align-center font-bold text-white"
            >
              Create Post
            </button>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-gradient-to-r from-rose-700 to-red-700 outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-white rounded-t">
                        <h3 className="text-3xl font-semibold text-white">
                          Create Post
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <form
                          id="form1"
                          name="form1"
                          className="flex flex-col"
                          onSubmit={() => {
                            setShowModal(false);
                            createPost();
                          }}
                        >
                          <label className="text-lg font-semibold">Title</label>
                          <input
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            type="text"
                            name="title"
                            value={postForm.title}
                            placeholder="Title"
                            onChange={handle_input_change}
                          />
                          <label className="text-lg font-semibold">
                            Description
                          </label>
                          <textarea
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            placeholder="Description"
                            name="description"
                            id="description"
                            value={postForm.description}
                            onChange={handle_input_change}
                          />

                          <label className="text-lg font-semibold">Size</label>
                          <input
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            type="number"
                            placeholder="Size"
                            name="size"
                            value={postForm.size}
                            onChange={handle_input_change}
                          />
                          <label className="text-lg font-semibold">Date</label>
                          <input
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            type="date"
                            placeholder="Date"
                            name="datetime"
                            value={postForm.datetime}
                            onChange={handle_input_change}
                          />
                          <label className="text-lg font-semibold">
                            Location
                          </label>
                          <input
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={postForm.location}
                            onChange={handle_input_change}
                          />
                        </form>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                          form="form1"
                          style={{ transition: "all .15s ease" }}
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>

        <div className="min-h-screen w-5/6 rounded-md">
          <div id="posts">{renderPosts()}</div>
        </div>
      </div>
    </div>
  );
}

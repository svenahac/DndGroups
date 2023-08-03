import React, { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import axios from "axios";

function PostCard(props) {
  const post = props.post;
  const username = props.username;
  const [showModal, setShowModal] = useState(false);

  async function deletePost() {
    try {
      const { data, error } = await supabase
        .from("Post")
        .delete()
        .eq("id", post.id);
      if (error) throw error;
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }
  // How long ago the post was created
  const oneDay = 1000 * 60 * 60 * 24;
  const dateRoot = new Date(post.created_at);
  const dateNow = new Date(Date.now());
  const time = dateNow.getTime() - dateRoot.getTime();
  const diffInDays = Math.round(time / oneDay);
  const diffInHours = Math.round(time / (oneDay / 24));
  const diffInMinutes = Math.round(time / (oneDay / 24 / 60));
  let hours = "hour";
  let days = "day";
  let minutes = "minutes";

  if (diffInDays > 1) {
    days = "days";
  }

  if (diffInHours > 1) {
    hours = "hours";
  }

  if (diffInMinutes > 1) {
    minutes = "minutes";
  } else if (diffInMinutes === 1) {
    minutes = "minute";
  }

  return (
    <div className="flex justify-center p-2 h-92">
      <div className="no-scrollbar flex flex-col w-full min-h-full border-2 overflow-y-scroll bg-gradient-to-r from-rose-700 to-red-700 font-normal text-white rounded-md">
        <div className="flex flex-row justify-between items-centers mt-1 border-b ">
          <div className="ml-2 text-l">@{post.creator_name}</div>
          <div>{post.experience}</div>
          {diffInMinutes < 60 ? (
            <div className="mr-2">
              {diffInMinutes} {minutes} ago
            </div>
          ) : (
            <div className="mr-2">
              {diffInHours <= 24
                ? `${diffInHours} ${hours} ago`
                : `${diffInDays} ${days} ago`}
            </div>
          )}
        </div>

        <div className="flex flex-col border-b">
          <div className="ml-2 font-bold text-xl">{post.title}</div>
          <div className="flex flex-row ml-2">
            <div className="mr-1">
              When & Where: {post.date}, {post.location}
            </div>
          </div>
        </div>

        <div className="ml-2 mt-2 mr-2 h-40 break-words">
          <p className="font-bold">Description:</p>
          {post.description}
        </div>
        <div className="flex flex-row justify-end">
          <div className="w-1/3 mb-1 mt-1 mr-2 flex justify-end text-center">
            {post.creator_name === username ? (
              <button
                className="font-normal rounded-md p-2 bg-gradient-to-r from-rose-500 to-rose-600"
                onClick={deletePost}
              >
                Delete
              </button>
            ) : (
              <button
                className="font-normal rounded-md p-2 bg-gradient-to-r from-green-500 to-green-600"
                onClick={() => setShowModal(true)}
              >
                Send Msg
              </button>
            )}
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-rose-700 to-red-700 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Send message to @{post.creator_name}
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className=" flex justify-center items-center bg-transparent text-white h-6 w-6 text-2xl outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form className="flex flex-col">
                        <label className="text-lg font-semibold">Message</label>
                        <textarea
                          className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                          placeholder="Write here"
                        />
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-center pt-1 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowModal(false)}
                      >
                        Send
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
    </div>
  );
}
export default PostCard;

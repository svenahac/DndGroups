import React, { useState } from "react";
import { supabase } from "../api/supabaseClient";

function PostCard(props) {
  const post = props.post;
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

  return (
    <div className="flex justify-center p-2 h-92">
      <div className="no-scrollbar flex flex-col w-full min-h-full border-2 overflow-y-scroll bg-gradient-to-r from-rose-700 to-red-700 font-normal text-white rounded-md">
        <div className="flex flex-row items-center ml-1 mt-1 ">
          <div className="ml-1 mr-1">AA</div>
          <div className="text-l">Needs helper/s</div>
        </div>

        <div className="flex flex-col ml-1">
          <div className="ml-1 font-bold text-xl">{post.title}</div>
          <div className="flex flex-row ml-1">
            <div className="mr-1">
              When & Where: {post.date}, {post.location}
            </div>
          </div>
        </div>

        <div className="ml-2 mt-2 h-40">{post.description}</div>
        <div className="flex flex-row justify-between">
          <div className="w-1/3 flex flex-row items-center justify-start">
            <div className="ml-1 mr-1">AA</div>
          </div>
          <div className="w-1/3 mb-1 mr-2 flex justify-end text-center">
            <button
              className="font-normal rounded-md p-2 bg-gradient-to-r from-green-500 to-green-600"
              onClick={() => setShowModal(true)}
            >
              Apply
            </button>
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-cyan-500 to-blue-500 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Apply for the Favor
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form className="flex flex-col">
                        <label className="text-lg font-semibold">
                          Introduction
                        </label>
                        <textarea
                          className="border-2 border-blue-500 rounded-md p-2 mb-2"
                          placeholder="Introduction"
                        />
                        <label className="text-lg font-semibold">
                          Phone number
                        </label>
                        <input
                          className="border-2 border-blue-500 rounded-md p-2 mb-2"
                          type="text"
                          placeholder="123-456-789"
                        />
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowModal(false)}
                      >
                        Apply
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

import React, { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import axios from "axios";

function PostCard(props) {
  const post = props.post;
  const username = props.username;
  const [rating, setRating] = useState({});
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rateModal, setRateModal] = useState(false);
  const [rateForm, setRateForm] = useState({
    rating: "0",
  });

  useEffect(() => {
    getRating();
  }, []);

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setRateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  async function getRating() {
    try {
      const { data, error } = await supabase
        .from("Rating")
        .select("*")
        .eq("u_id", post.u_id);
      if (error) throw error;
      if (data != null) {
        setRating(data[0]);
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function calculateRating(increased) {
    let newRating =
      (increased.one +
        increased.two * 2 +
        increased.three * 3 +
        increased.four * 4 +
        increased.five * 5) /
      increased.number_of_ratings;
    return Math.round(newRating * 10) / 10;
  }

  async function updateRating() {
    let increased = await increaseNumberOfRatings(rateForm.rating);
    let calcRating = await calculateRating(increased);

    if (increased.number_of_ratings > 0) {
      try {
        const { data, error } = await supabase
          .from("Rating")
          .update({
            rating: calcRating,
            number_of_ratings: increased.number_of_ratings,
            one: increased.one,
            two: increased.two,
            three: increased.three,
            four: increased.four,
            five: increased.five,
          })
          .eq("u_id", post.u_id);
        if (error) throw error;
        await getRating();
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function increaseNumberOfRatings(rate) {
    let one = rating.one;
    let two = rating.two;
    let three = rating.three;
    let four = rating.four;
    let five = rating.five;
    let number_of_ratings = rating.number_of_ratings + 1;
    console.log("before" + JSON.stringify(rating));
    if (rate === "1") {
      one = one + 1;
    } else if (rate === "2") {
      two = two + 1;
    } else if (rate === "3") {
      three = three + 1;
    } else if (rate === "4") {
      four = four + 1;
    } else if (rate === "5") {
      five = five + 1;
    }
    let increased = {
      number_of_ratings: number_of_ratings,
      one: one,
      two: two,
      three: three,
      four: four,
      five: five,
    };
    return increased;
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

  if (loading) {
    return <div></div>;
  }

  function formatDate(input) {
    var datePart = input.split("-"),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
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
              When & Where: {formatDate(post.date)}, {post.location}
            </div>
          </div>
        </div>

        <div className="ml-2 mt-2 mr-2 h-40 break-words">
          <p className="font-bold">Description:</p>
          {post.description}
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-1/3 mb-1 mt-1 ml-2 flex">
            <button
              className="font-normal rounded-md p-2 bg-gradient-to-r from-cyan-500 to-blue-600"
              onClick={() => {
                if (post.creator_name !== username) {
                  setRateModal(true);
                }
              }}
            >
              {rating && rating.rating !== 0 && rating.rating !== null ? (
                <span>{`Rating ${rating.rating}/5 ⭐`}</span>
              ) : (
                <span>No Rating</span>
              )}
            </button>
          </div>
          {rateModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-rose-700 to-red-700 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Rate @{post.creator_name}
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setRateModal(false)}
                      >
                        <span className=" flex justify-center items-center bg-transparent text-white h-6 w-6 text-2xl outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form
                        id="rateForm"
                        name="rateForm"
                        onSubmit={() => {
                          setRateModal(false);
                          updateRating();
                        }}
                        className="flex flex-col"
                      >
                        <label className="text-lg font-semibold">
                          Your rating
                        </label>
                        <input
                          min={1}
                          max={5}
                          className="text-black border-2 border-border-blue-500 rounded-md p-2 mb-2"
                          type="number"
                          placeholder="Rating"
                          name="rating"
                          value={rateForm.rating}
                          onChange={handle_input_change}
                        />
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-center pt-1 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                        form="rateForm"
                        style={{ transition: "all .15s ease" }}
                      >
                        Rate ⭐
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
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

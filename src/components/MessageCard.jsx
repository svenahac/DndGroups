import React, { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";

function MessageCard(props) {
  const [sender, setSender] = useState({});
  const [replyModal, setReplyModal] = useState(false);
  const [messageForm, setMessageForm] = useState({
    content: "",
  });

  async function getSender() {
    try {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", props.message.u_id);
      if (error) throw error;
      if (data != null) {
        setSender(data[0]);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteMessage() {
    try {
      const { data, error } = await supabase
        .from("Message")
        .delete()
        .eq("id", props.message.id);
      if (error) throw error;
      window.location.reload();
      if (data != null) {
        console.log(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function sendMessage() {
    try {
      const { data, error } = await supabase.from("Message").insert([
        {
          u_id: props.user.id,
          receiver: sender.username,
          content: messageForm.content,
        },
      ]);
      if (error) throw error;
    } catch (err) {
      console.error(err.message);
    }
  }
  const handle_message_change = (event) => {
    const { name, value } = event.target;
    setMessageForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getSender();
  }, []);
  return (
    <div className="flex justify-center p-2 ">
      <div className="no-scrollbar flex flex-col  w-full border-2 overflow-y-scroll bg-gradient-to-r from-rose-700 to-red-700 font-normal text-white rounded-md">
        <div className="flex flex-row mt-1 pl-1 border-b ">
          <div>Message from @{sender.username}</div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="min-h-max flex p-1 break-words">
            <div>{props.message.content}</div>
          </div>
        </div>
        {/*footer*/}
        <div className="flex h-14 items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className=" w-32 font-normal rounded-md p-2 bg-gradient-to-r from-cyan-500 to-blue-600"
            onClick={() => {
              setReplyModal(true);
            }}
          >
            Reply
          </button>
          {replyModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-rose-700 to-red-700 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Send message to @{sender.username}
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setReplyModal(false)}
                      >
                        <span className=" flex justify-center items-center bg-transparent text-white h-6 w-6 text-2xl outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form
                        name="messageForm"
                        id="messageForm"
                        onSubmit={() => {
                          setReplyModal(false);
                          sendMessage();
                        }}
                        className="flex flex-col"
                      >
                        <label className="text-lg font-semibold">Message</label>
                        <textarea
                          onChange={handle_message_change}
                          name="content"
                          className=" border-2 h-36 text-black border-rose-500 rounded-md p-2 mb-2"
                          placeholder="Write here"
                        />
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-center pt-1 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                        form="messageForm"
                        style={{ transition: "all .15s ease" }}
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
          <button
            className=" w-32 font-normal rounded-md p-2 bg-gradient-to-r from-rose-500 to-rose-600"
            onClick={deleteMessage}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;

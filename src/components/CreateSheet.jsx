import React, { useState } from "react";
import { supabase } from "../api/supabaseClient";
import Navbar from "./Navbar";

const CreateSheet = (props) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [createForm, setCreateForm] = useState({
    name: "",
    class: "",
    race: "",
    alignment: "",
    level: 0,
    xp: 0,
    hp: 0,
    ac: 0,
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  });
  const handle_input_create = (event) => {
    const { name, value } = event.target;
    setCreateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  async function createCharacter() {
    try {
      const { data, error } = await supabase
        .from("Char_Sheet")
        .insert({
          name: createForm.name,
          class: createForm.class,
          race: createForm.race,
          alignment: createForm.alignment,
          level: createForm.level,
          xp: createForm.xp,
          hp: createForm.hp,
          ac: createForm.ac,
          str: createForm.str,
          dex: createForm.dex,
          con: createForm.con,
          int: createForm.int,
          wis: createForm.wis,
          cha: createForm.cha,
          u_id: props.state.id,
        })
        .single();
      if (error) throw error;
    } catch (err) {
      console.error(err.message);
    }
    try {
      const { data, error } = await supabase
        .from("User")
        .update({ hasCharSheet: true })
        .eq("id", props.state.id);
      if (error) throw error;
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-4 items-center">
        <div className="flex flex-row justify-center h-15 w-5/6">
          <button
            onClick={() => {
              setShowCreateModal(true);
            }}
            className="mt-2 bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          >
            Create Character Sheet
          </button>
          {showCreateModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-rose-700 to-red-700 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Create Character Sheet
                      </h3>
                      <button
                        className="text-center p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowCreateModal(false)}
                      >
                        <span className=" flex justify-center items-center bg-transparent text-white h-6 w-6 text-2xl outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form
                        name="createSheet"
                        id="createSheet"
                        className="flex flex-col "
                        onSubmit={() => {
                          createCharacter();
                          setShowCreateModal(false);
                        }}
                      >
                        <label className="text-lg font-semibold">
                          Character Name
                        </label>
                        <input
                          className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                          type="text"
                          name="name"
                          value={createForm.name}
                          placeholder="Character name"
                          onChange={handle_input_create}
                        />

                        <label className="text-lg font-semibold">Race</label>
                        <input
                          className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                          type="text"
                          name="race"
                          value={createForm.race}
                          placeholder="Race"
                          onChange={handle_input_create}
                        />

                        <label className="text-lg font-semibold">Class</label>
                        <input
                          className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                          type="text"
                          name="class"
                          value={createForm.class}
                          placeholder="Class"
                          onChange={handle_input_create}
                        />

                        <label className="text-lg font-semibold">
                          Alignment
                        </label>
                        <input
                          className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                          type="text"
                          name="alignment"
                          value={createForm.alignment}
                          placeholder="Alignment"
                          onChange={handle_input_create}
                        />
                        <label className="text-lg font-semibold">XP</label>
                        <input
                          className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                          type="number"
                          name="xp"
                          value={createForm.xp}
                          placeholder="XP"
                          onChange={handle_input_create}
                        />

                        <div className="flex flex-row w-80">
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">
                              Level
                            </label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="level"
                              value={createForm.level}
                              placeholder="Level"
                              onChange={handle_input_create}
                            />
                          </div>
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">HP</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="hp"
                              value={createForm.hp}
                              placeholder="HP"
                              onChange={handle_input_create}
                            />
                          </div>
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">AC</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="ac"
                              value={createForm.ac}
                              placeholder="AC"
                              onChange={handle_input_create}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row w-80">
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">Str</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="str"
                              value={createForm.str}
                              placeholder="Str"
                              onChange={handle_input_create}
                            />
                          </div>
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">Dex</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="dex"
                              value={createForm.dex}
                              placeholder="Dex"
                              onChange={handle_input_create}
                            />
                          </div>
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">Con</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="con"
                              value={createForm.con}
                              placeholder="Con"
                              onChange={handle_input_create}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row w-80">
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">Int</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="int"
                              value={createForm.int}
                              placeholder="Int"
                              onChange={handle_input_create}
                            />
                          </div>
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">Wis</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="wis"
                              value={createForm.wis}
                              placeholder="Wis"
                              onChange={handle_input_create}
                            />
                          </div>
                          <div className="flex flex-col w-1/3 p-1">
                            <label className="text-lg font-semibold">Cha</label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="number"
                              name="cha"
                              value={createForm.cha}
                              placeholder="Cha"
                              onChange={handle_input_create}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-center pt-1 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                        form="createSheet"
                        style={{ transition: "all .15s ease" }}
                      >
                        Create
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
};

export default CreateSheet;

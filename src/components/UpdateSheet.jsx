import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import Navbar from "./Navbar";

const UpdateSheet = (props) => {
  const [charForm, setCharForm] = useState(props.charSheet);
  const [charSheet, setCharSheet] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setCharForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCharSheet();
  }, []);

  async function getCharSheet() {
    try {
      const { data, error } = await supabase
        .from("Char_Sheet")
        .select("*")
        .eq("u_id", props.state.id);
      if (error) throw error;
      if (data != null) {
        setCharSheet(data[0]);
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function updateCharacter() {
    try {
      const { data, error } = await supabase
        .from("Char_Sheet")
        .update({
          name: charForm.name,
          class: charForm.class,
          race: charForm.race,
          alignment: charForm.alignment,
          level: charForm.level,
          xp: charForm.xp,
          hp: charForm.hp,
          ac: charForm.ac,
          str: charForm.str,
          dex: charForm.dex,
          con: charForm.con,
          int: charForm.int,
          wis: charForm.wis,
          cha: charForm.cha,
        })
        .eq("u_id", props.state.id);
      if (error) throw error;
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }

  if (loading) {
    return <div></div>;
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-4 items-center">
        <div className="flex flex-row justify-center h-100 w-5/6">
          <div className="p-1 text-rose-200 flex flex-col justify-center text-center uppercase rounded-lg text-lg border-2 h-100 w-100 bg-gradient-to-r from-rose-700 to-red-700">
            <div>Character Name: {charSheet.name}</div>
            <div>Class: {charSheet.class}</div>

            <div>Race: {charSheet.race}</div>
            <div>Alignment: {charSheet.alignment}</div>
            <div>
              Level: {charSheet.level} XP: {charSheet.xp}
            </div>
            <div>HP: {charSheet.hp}</div>
            <div>Armor Class: {charSheet.ac}</div>
            <div>Strength: {charSheet.str} </div>
            <div>Dexterity: {charSheet.dex}</div>
            <div>Constitution: {charSheet.con}</div>
            <div>Intelligence: {charSheet.int}</div>
            <div>Wisdom: {charSheet.wis}</div>
            <div>Charisma: {charSheet.cha}</div>
          </div>
        </div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="mt-2 bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        >
          Update Character Sheet
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-rose-700 to-red-700 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      My Character Sheet
                    </h3>
                    <button
                      className="text-center p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" flex justify-center items-center bg-transparent text-white h-6 w-6 text-2xl outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form
                      name="updateSheet"
                      id="updateSheet"
                      onSubmit={() => {
                        updateCharacter();
                        setShowModal(false);
                      }}
                      className="flex flex-col "
                    >
                      <label className="text-lg font-semibold">
                        Character Name
                      </label>
                      <input
                        className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                        type="text"
                        name="name"
                        placeholder={charSheet.name}
                        onChange={handle_input_change}
                      />

                      <label className="text-lg font-semibold">Race</label>
                      <input
                        className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                        type="text"
                        name="race"
                        placeholder={charSheet.race}
                        onChange={handle_input_change}
                      />

                      <label className="text-lg font-semibold">Class</label>
                      <input
                        className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                        type="text"
                        name="class"
                        placeholder={charSheet.class}
                        onChange={handle_input_change}
                      />

                      <label className="text-lg font-semibold">Alignment</label>
                      <input
                        className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                        type="text"
                        name="alignment"
                        placeholder={charSheet.alignment}
                        onChange={handle_input_change}
                      />
                      <label className="text-lg font-semibold">XP</label>
                      <input
                        className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                        type="number"
                        name="xp"
                        placeholder={charSheet.xp}
                        onChange={handle_input_change}
                      />

                      <div className="flex flex-row w-80">
                        <div className="flex flex-col w-1/3 p-1">
                          <label className="text-lg font-semibold">Level</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="level"
                            placeholder={charSheet.level}
                            onChange={handle_input_change}
                          />
                        </div>
                        <div className="flex flex-col w-1/3 p-1">
                          <label className="text-lg font-semibold">HP</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="hp"
                            placeholder={charSheet.hp}
                            onChange={handle_input_change}
                          />
                        </div>
                        <div className="flex flex-col w-1/3 p-1">
                          <label className="text-lg font-semibold">AC</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="ac"
                            placeholder={charSheet.ac}
                            onChange={handle_input_change}
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
                            placeholder={charSheet.str}
                            onChange={handle_input_change}
                          />
                        </div>
                        <div className="flex flex-col w-1/3 p-1">
                          <label className="text-lg font-semibold">Dex</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="dex"
                            placeholder={charSheet.dex}
                            onChange={handle_input_change}
                          />
                        </div>
                        <div className="flex flex-col w-1/3 p-1">
                          <label className="text-lg font-semibold">Con</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="con"
                            placeholder={charSheet.con}
                            onChange={handle_input_change}
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
                            placeholder={charSheet.int}
                            onChange={handle_input_change}
                          />
                        </div>
                        <div className="flex flex-col w-1/3 p-1">
                          <label className="text-lg font-semibold">Wis</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="wis"
                            placeholder={charSheet.wis}
                            onChange={handle_input_change}
                          />
                        </div>
                        <div className="flex flex-col w-1/3 p-1">
                          <label className="text-lg font-semibold">Cha</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="cha"
                            placeholder={charSheet.cha}
                            onChange={handle_input_change}
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
                      form="updateSheet"
                      style={{ transition: "all .15s ease" }}
                    >
                      Update
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
  );
};

export default UpdateSheet;

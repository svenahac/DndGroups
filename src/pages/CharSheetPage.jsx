import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import axios from "axios";

export default function CharSheetPage() {
  const { state } = useLocation();
  const [charSheet, setCharSheet] = useState({});
  const [charForm, setCharForm] = useState({});
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
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
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

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setCharForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
          u_id: state.id,
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
        .eq("id", state.id);
      if (error) throw error;
      window.location.reload();
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
        .eq("u_id", state.id);
      if (error) throw error;
      window.location.reload();
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
                            value={charForm.name}
                            placeholder={charSheet.name}
                            onChange={handle_input_change}
                          />

                          <label className="text-lg font-semibold">Race</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="text"
                            name="race"
                            value={charForm.race}
                            placeholder={charSheet.race}
                            onChange={handle_input_change}
                          />

                          <label className="text-lg font-semibold">Class</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="text"
                            name="class"
                            value={charForm.class}
                            placeholder={charSheet.class}
                            onChange={handle_input_change}
                          />

                          <label className="text-lg font-semibold">
                            Alignment
                          </label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="text"
                            name="alignment"
                            value={charForm.alignment}
                            placeholder={charSheet.alignment}
                            onChange={handle_input_change}
                          />
                          <label className="text-lg font-semibold">XP</label>
                          <input
                            className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                            type="number"
                            name="xp"
                            value={charForm.xp}
                            placeholder={charSheet.xp}
                            onChange={handle_input_change}
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
                                value={charForm.level}
                                placeholder={charSheet.level}
                                onChange={handle_input_change}
                              />
                            </div>
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                HP
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="hp"
                                value={charForm.hp}
                                placeholder={charSheet.hp}
                                onChange={handle_input_change}
                              />
                            </div>
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                AC
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="ac"
                                value={charForm.ac}
                                placeholder={charSheet.ac}
                                onChange={handle_input_change}
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-80">
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                Str
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="str"
                                value={charForm.str}
                                placeholder={charSheet.str}
                                onChange={handle_input_change}
                              />
                            </div>
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                Dex
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="dex"
                                value={charForm.dex}
                                placeholder={charSheet.dex}
                                onChange={handle_input_change}
                              />
                            </div>
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                Con
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="con"
                                value={charForm.con}
                                placeholder={charSheet.con}
                                onChange={handle_input_change}
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-80">
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                Int
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="int"
                                value={charForm.int}
                                placeholder={charSheet.int}
                                onChange={handle_input_change}
                              />
                            </div>
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                Wis
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="wis"
                                value={charForm.wis}
                                placeholder={charSheet.wis}
                                onChange={handle_input_change}
                              />
                            </div>
                            <div className="flex flex-col w-1/3 p-1">
                              <label className="text-lg font-semibold">
                                Cha
                              </label>
                              <input
                                className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                                type="number"
                                name="cha"
                                value={charForm.cha}
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
      ) : (
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

                            <label className="text-lg font-semibold">
                              Race
                            </label>
                            <input
                              className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                              type="text"
                              name="race"
                              value={createForm.race}
                              placeholder="Race"
                              onChange={handle_input_create}
                            />

                            <label className="text-lg font-semibold">
                              Class
                            </label>
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
                                <label className="text-lg font-semibold">
                                  HP
                                </label>
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
                                <label className="text-lg font-semibold">
                                  AC
                                </label>
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
                                <label className="text-lg font-semibold">
                                  Str
                                </label>
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
                                <label className="text-lg font-semibold">
                                  Dex
                                </label>
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
                                <label className="text-lg font-semibold">
                                  Con
                                </label>
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
                                <label className="text-lg font-semibold">
                                  Int
                                </label>
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
                                <label className="text-lg font-semibold">
                                  Wis
                                </label>
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
                                <label className="text-lg font-semibold">
                                  Cha
                                </label>
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
      )}
    </div>
  );
}

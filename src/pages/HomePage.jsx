import { useLayoutEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../api/supabaseClient";
import PostCard from "../components/PostCard";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import FilterModal from "../components/FilterModal";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const { state } = useLocation();
  const [tempUsername, setTempUsername] = useState(state?.username);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  async function getUser() {
    const { data } = await axios.get("https://dndb.svenahac.com/users/login", {
      withCredentials: true,
    });
    setUser(data.user);
    setTimeout(() => {
      setUserLoading(false);
    }, 500);
  }

  useLayoutEffect(() => {
    if (localStorage.getItem("reload") === "true") {
      localStorage.setItem("reload", "false");
      setInterval(() => {
        window.location.reload();
      }, 100);
    }

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
        }, 500);
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
          experience: postForm.experience,
          creator_name: user.username,
          lookingType: postForm.lookingType,
          u_id: user.id,
        })
        .single();
      if (error) throw error;
      console.log(data);
      await getPosts();
    } catch (err) {
      console.error(err.message);
    }
  }

  const [filterForm, setFilterForm] = useState({
    location: "",
    experience: "",
    lookingType: "",
  });

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
      if (filterForm.location !== "" && post.location !== filterForm.location) {
        return;
      }
      if (
        filterForm.experience !== "" &&
        post.experience !== filterForm.experience
      ) {
        return;
      }
      if (
        filterForm.lookingType !== "" &&
        post.lookingType !== filterForm.lookingType
      ) {
        return;
      }
      return (
        <PostCard
          post={post}
          user={user}
          username={tempUsername ?? user.username}
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
    experience: "",
    lookingType: "",
  });

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setPostForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (userLoading) {
    return <div></div>;
  }
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
            <button
              onClick={() => {
                setFilterModal(true);
              }}
              className="h-12 w-2/6 xl:w-2/6  bg-gradient-to-r from-rose-700 to-red-700 mb-2 mr-2 rounded-xl text-center justify-center flex items-center align-center font-bold text-white"
            >
              Filter
            </button>
            {filterModal ? (
              <FilterModal
                filterForm={filterForm}
                setFilterForm={setFilterForm}
                setFilterModal={setFilterModal}
              />
            ) : null}
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
                          <span className="flex justify-center items-center bg-transparent text-white h-6 w-6 text-2xl outline-none focus:outline-none">
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
                            placeholder="Title"
                            onChange={handle_input_change}
                          />
                          <label className="text-lg font-semibold">
                            Experience
                          </label>
                          <select
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            name="experience"
                            onChange={handle_input_change}
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Experienced">Experienced</option>
                          </select>
                          <label className="text-lg font-semibold">
                            Looking For
                          </label>
                          <select
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            name="lookingType"
                            onChange={handle_input_change}
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="Players">Players</option>
                            <option value="Party">Party</option>
                          </select>
                          <label className="text-lg font-semibold">
                            Description
                          </label>
                          <textarea
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            placeholder="Description"
                            name="description"
                            id="description"
                            onChange={handle_input_change}
                          />

                          <label className="text-lg font-semibold">Size</label>
                          <input
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            type="number"
                            placeholder="Size"
                            name="size"
                            onChange={handle_input_change}
                          />
                          <label className="text-lg font-semibold">Date</label>
                          <input
                            className="border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            type="date"
                            placeholder="Date"
                            name="datetime"
                            onChange={handle_input_change}
                          />
                          <label className="text-lg font-semibold">
                            Location
                          </label>
                          <select
                            className=" border-2 border-border-blue-500 rounded-md p-2 mb-2"
                            name="location"
                            onChange={handle_input_change}
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="Online">Online</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Aland Islands">Aland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire, Sint Eustatius and Saba">
                              Bonaire, Sint Eustatius and Saba
                            </option>
                            <option value="Bosnia and Herzegovina">
                              Bosnia and Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">
                              British Indian Ocean Territory
                            </option>
                            <option value="Brunei Darussalam">
                              Brunei Darussalam
                            </option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos (Keeling) Islands">
                              Cocos (Keeling) Islands
                            </option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, Democratic Republic of the Congo">
                              Congo, Democratic Republic of the Congo
                            </option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curacao">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">
                              Falkland Islands (Malvinas)
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Territories">
                              French Southern Territories
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">
                              Heard Island and Mcdonald Islands
                            </option>
                            <option value="Holy See (Vatican City State)">
                              Holy See (Vatican City State)
                            </option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">
                              Iran, Islamic Republic of
                            </option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">
                              Korea, Democratic People's Republic of
                            </option>
                            <option value="Korea, Republic of">
                              Korea, Republic of
                            </option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">
                              Lao People's Democratic Republic
                            </option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">
                              Libyan Arab Jamahiriya
                            </option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, the Former Yugoslav Republic of">
                              Macedonia, the Former Yugoslav Republic of
                            </option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">
                              Micronesia, Federated States of
                            </option>
                            <option value="Moldova, Republic of">
                              Moldova, Republic of
                            </option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">
                              Palestinian Territory, Occupied
                            </option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">
                              Russian Federation
                            </option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Barthelemy">
                              Saint Barthelemy
                            </option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">
                              Saint Kitts and Nevis
                            </option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Martin">Saint Martin</option>
                            <option value="Saint Pierre and Miquelon">
                              Saint Pierre and Miquelon
                            </option>
                            <option value="Saint Vincent and the Grenadines">
                              Saint Vincent and the Grenadines
                            </option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Serbia and Montenegro">
                              Serbia and Montenegro
                            </option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Sint Maarten">Sint Maarten</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and the South Sandwich Islands">
                              South Georgia and the South Sandwich Islands
                            </option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">
                              Svalbard and Jan Mayen
                            </option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">
                              Syrian Arab Republic
                            </option>
                            <option value="Taiwan, Province of China">
                              Taiwan, Province of China
                            </option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">
                              Tanzania, United Republic of
                            </option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-Leste">Timor-Leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">
                              United States Minor Outlying Islands
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">
                              Virgin Islands, British
                            </option>
                            <option value="Virgin Islands, U.s.">
                              Virgin Islands, U.s.
                            </option>
                            <option value="Wallis and Futuna">
                              Wallis and Futuna
                            </option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
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

        <div className="min-h-screen w-5/6 rounded-md">
          <div id="posts">{renderPosts()}</div>
        </div>
      </div>
    </div>
  );
}

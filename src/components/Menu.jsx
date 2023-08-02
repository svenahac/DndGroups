const Menu = () => {
  return (
    <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2 font-medium text-white">
      <a
        href="/home"
        className="active block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300 "
      >
        Home
      </a>
      <a
        href="/chat"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300"
      >
        Chat
      </a>
      <a
        href="/request"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300  focus:outline-none focus:text-rose-300 "
      >
        Char Sheet
      </a>
      <a
        href="/profile"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300 "
      >
        Profile
      </a>
    </div>
  );
};

export default Menu;

const NewSletter = () => {
  return (
    <div className="w-full bg-red-500">
      <div className="w-3/4 rounded-tl-full rounded-bl-full bg-auth-btn hidden lg:flex items-center justify-between py-6 px-14 z-50 gap-8 mx-auto absolute bottom-minus55 right-0">
        <h3 className="w-1/3 text-xl text-black">
          Subcribe newsletter and
          <br />
          <span className="text-white">get -5% off</span>
        </h3>
        <p className="w-1/3 text-md text-white">
          The intellectual content in a physical book need not be a composition,
          nor even be called a book
        </p>
        <form className="bg-transparent w-2/4 border-2 border-white rounded-full flex items-center h-10">
          <input
            className="bg-transparent text-white w-3/4  pl-5 outline-none placeholder-white"
            placeholder="Enter email address..."
            type="email"
            required
          />
          <button className="text-lg w-1/4 bg-white text-black h-full rounded-full">
            Subcribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSletter;

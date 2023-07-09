const Header = ({ inputText, onInputChange, onSearchClick }) => {
    return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold underline">Pixabay Search Bar</div>
      <div className="flex w-60 h-12 rounded-lg focus-within:shadow-lg overflow-hidden">
        <input 
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 text-center"
          onChange={e => onInputChange(e.target.value)}
          placeholder={"Enter search here..."}
          value={inputText}
        />
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={() => onSearchClick()}>
          Search
        </button>
    </div>
    );
  }

export default Header;
import { useState } from "react";

const Header = ({ onInputChange, onSearchClick }) => {
  return (
  <div className="searchBar">
    <h2>Pixabay Search Bar</h2>
    <input 
      onChange={e => onInputChange(e.target.value)}
      placeholder={"Enter search here..."}
    />
    <button onClick={() => onSearchClick()}>
      Search
    </button>
  </div>
  );
}

function App() {
  console.log("Rendering App");

  const [ searchText, setSearchText ] = useState("");
  const search = () => {
    
  }

  console.log("Search text: ", searchText);
  
  return (
    <div className="App">
      <Header
        onInputChange={setSearchText}
        onSearchClick={search}
      />
    </div>
  );
}

export default App;

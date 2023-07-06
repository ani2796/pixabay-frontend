import { useState } from "react";
import { buildUrl, getImgData } from "./network";

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

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

const ResultsDisplay = ({ results }) => {

  if(isEmpty(results)) return null;

  // console.log("results: ", results);

  return(
    <div>
      {results.map(img => 
        <div>
          <img
            id={img.id}
            src={img.previewURL}
            alt="Result"
          />
        </div>
      )}
    </div>
  )
}

function App() {
  console.log("Rendering App");

  const [ searchText, setSearchText ] = useState("");
  const [ searchResult, setSearchResult ] = useState([]);

  const search = () => {
    // Hit an API
    // Parse the returned data
    const params = {
      q: encodeURIComponent(searchText),
      page: 1,
      per_page: 30,
    }
    const url = buildUrl(params);
    const imgData = getImgData(url).then(result => {
      const resultData = result.data.hits;
      console.log("data in App: ", resultData);
      setSearchResult(resultData);
    });
    // console.log("Setting search result to: ", imgData);
    // setSearchResult(getImgData(url));

  }

  // console.log("Search text: ", searchText);
  
  return (
    <div className="App">
      <Header
        onInputChange={setSearchText}
        onSearchClick={search}
      />
      <ResultsDisplay
        results={searchResult}
      />
    </div>
  );
}

export default App;
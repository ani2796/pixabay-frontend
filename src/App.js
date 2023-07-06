import { useState } from "react";
import { buildUrl, getImgData } from "./network";

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

const RESULTS_PER_PAGE = 50;

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

  return(
    <div className="imgContainer">
      {results.map(img => 
        <img  
          className="imgTag"
          key={img.id}
          src={img.previewURL}
          alt="Result"
        />
      )}
    </div>
  )
}

const Footer = ({ currentPage, onLeftClick, onRightClick }) => {
  if(currentPage === 0) return null;
  return (
    <div>
      <button onClick={onLeftClick}>Left</button>
       {currentPage} 
      <button onClick={onRightClick}>Right</button>
    </div>
  );
}

function App() {
  console.log("Rendering App");

  const [ searchText, setSearchText ] = useState("");
  const [ searchResult, setSearchResult ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);

  const search = (page = 1) => {
    const params = {
      q: encodeURIComponent(searchText),
      page,
      per_page: 30,
    }

    const url = buildUrl(params);
    getImgData(url).then(result => {
      const resultData = result.data.hits;

      if(result.data.hits.length !== 0) {
        setCurrentPage(page);
        setSearchResult(resultData);
      }
    });
  }
  
  const decrementPage = () => {
    console.log("decrement page");
    const newPage = Math.max(currentPage-1, 1);
    search(newPage);
  }

  const incrementPage = () => {
    const newPage = Math.min(currentPage+1, 10);
    search(newPage);
  }

  return (
    <div className="App">
      <Header
        onInputChange={setSearchText}
        onSearchClick={search}
      />
      <ResultsDisplay
        results={searchResult}
      />
      <Footer 
        currentPage={currentPage}
        onLeftClick={decrementPage}
        onRightClick={incrementPage}
      />
    </div>
  );
}

export default App;
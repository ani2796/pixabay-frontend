import { useEffect, useState } from "react";
import { buildUrl, getImgData } from "./network";
import { Link, useLocation } from "react-router-dom";

const Header = ({ inputText, onInputChange, onSearchClick }) => {
  return (
  <div className="header">
    <h2>Pixabay Search Bar</h2>
    <input 
      className="searchInput"
      onChange={e => onInputChange(e.target.value)}
      placeholder={"Enter search here..."}
      value={inputText}
    />
    <button onClick={() => onSearchClick()}>
      Search
    </button>
  </div>
  );
}

const ResultsDisplay = ({ results, searchText, currentPage }) => {

  if(results.length === 0) 
    return(
      <div className="emptyResults">
        No Results
      </div>
    );

  return(
    <div className="imgContainer">
      {results.map(img => {
        return (
          <Link 
            to={`/img/${img.id}`}
            key={img.id} 
            state={{ searchText, currentPage }}>
            <img 
              className="imgTag"
              src={img.previewURL}
              alt="Result"
            />
          </Link>);
      })}
    </div>
  );
}

const Footer = ({ currentPage, toDisplay, onLeftClick, onRightClick }) => {

  if(!toDisplay) return null;

  return (
    <div class="footer">
      <button onClick={onLeftClick}>Left</button>
       <div className="pageNumber">{"  " + currentPage + "  "}</div>
      <button onClick={onRightClick}>Right</button>
    </div>
  );
}

function App() {
  // console.log("Rendering Main App");

  const searchParams = useLocation();

  useEffect(() => {
    if(searchParams.state) {
      // console.log("search params: ", searchParams.state.state.currentPage, searchParams.state.state.searchText);
      // console.log(searchParams.state.state);
      
      let defaultSearchText = searchParams.state.state.searchText;
      let defaultPage = searchParams.state.state.currentPage;

      setSearchText(defaultSearchText);
      setCurrentPage(defaultPage);

      search(defaultPage, defaultSearchText);
    }
  }, []);

  const [ searchText, setSearchText ] = useState("");
  const [ searchResult, setSearchResult ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  

  const search = (page = 1, sText = searchText) => {
    const params = {
      q: encodeURIComponent(sText),
      page,
      per_page: 30,
    }

    const url = buildUrl(params);
    
    getImgData(url).then(result => {

      const resultData = result.data.hits;

      if(result.data.hits.length !== 0) {
        setCurrentPage(page);
        setSearchResult(resultData);
      } else {
        setCurrentPage(1);
        setSearchResult([]);
      }

    });
  }
  
  const decrementPage = () => {
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
        inputText={searchText}
        onInputChange={setSearchText}
        onSearchClick={search}
      />
      <ResultsDisplay
        results={searchResult}
        searchText={searchText}
        currentPage={currentPage}
      />
      <Footer 
        currentPage={currentPage}
        toDisplay={true}
        onLeftClick={decrementPage}
        onRightClick={incrementPage}
      />
    </div>
  );
}

export default App;
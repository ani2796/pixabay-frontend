import { useEffect, useState } from "react";
import { buildUrl, getImgData } from "../network/imgData";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Results from "../components/Results";
import Footer from "../components/Footer";


const search = (setCurrentPage, setSearchResult, searchText, currentPage = 1) => {
  
  const params = {
    q: encodeURIComponent(searchText),
    page: currentPage,
    per_page: 30,
  };
  const url = buildUrl(params);
  
  getImgData(url).then(result => {
    const resultData = result.data.hits;
    setCurrentPage(currentPage);
    setSearchResult((resultData.length !== 0) ? resultData : []);
  });
}

function HomePage() {
  // console.log("Rendering Main App");
  const [ searchText, setSearchText ] = useState("");
  const [ searchResult, setSearchResult ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const searchParams = useLocation();

  useEffect(() => {
    // In case navigating back from search results
    if(searchParams.state) {
      
      let defaultSearchText = searchParams.state.state.searchText;
      let defaultPage = searchParams.state.state.currentPage;

      setSearchText(defaultSearchText);
      setCurrentPage(defaultPage);

      search(setCurrentPage, setSearchResult, defaultSearchText, defaultPage);
    }
  }, [ searchParams.state ]);
  
  const decrementPage = () => {
    const newPage = Math.max(currentPage-1, 1);
    search(setCurrentPage, setSearchResult, searchText, newPage);
  }

  const incrementPage = () => {
    const newPage = Math.min(currentPage+1, 10);
    search(setCurrentPage, setSearchResult, searchText, newPage);
  }

  return (
    <div className="flex flex-col">
      <Header
        inputText={searchText}
        onInputChange={setSearchText}
        onSearchClick={() => search(setCurrentPage, setSearchResult, searchText, currentPage)}
      />
      <Results
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

export default HomePage;
import { Link } from "react-router-dom";

const Results = ({ results, searchText, currentPage }) => {

    if(results.length === 0) 
      return(
        <div className="w-full h-64 text-center">
          No Results
        </div>
      );
  
    return(
      <div className="flex flex-wrap flex-row justify-center">
        {results.map(img => {
          return (
            <Link 
              to={`/img/${img.id}`}
              key={img.id} 
              state={{ searchText, currentPage }}>
              <img 
                className="h-60 w-64 m-1"
                src={img.previewURL}
                alt="Result"
              />
            </Link>);
        })}
      </div>
    );
  }

export default Results;
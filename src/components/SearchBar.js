import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchBar(props) {
  // We can comment out our searchTerm state variable as we are not using it!
  // let [searchTerm, setSearchTerm] = useState('')
  const { term, handleSearch } = useContext(SearchContext);
  // const [event, setEvent] = useState(null)
  //     useEffect(() => {
  //         const timeOutId = setTimeout(() => props.handleSearch(event, event.target.value), 500);
  //         return () => clearTimeout(timeOutId);
  //       }, [event]);

  return (
    <form>
      <input ref={term} type="text" placeholder="Search Here" />
      <button onClick={(e) => handleSearch(e, term.current.value)}>
        Submit
      </button>
    </form>
  );
}

export default SearchBar;

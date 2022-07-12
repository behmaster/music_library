import { useState, useEffect } from 'react'

function SearchBar(props){
    // We can comment out our searchTerm state variable as we are not using it!
    // let [searchTerm, setSearchTerm] = useState('')
const [event, setEvent] = useState(null)
    useEffect(() => {
        const timeOutId = setTimeout(() => props.handleSearch(event, event.target.value), 500);
        return () => clearTimeout(timeOutId);
      }, [event]);
    

    return (
            <form>
                <input type="text" placeholder="Search Here"
                    onChange={
                        (e) => setEvent(e)
                    } />
                <input type="submit" />
            </form>
    )
}

export default SearchBar




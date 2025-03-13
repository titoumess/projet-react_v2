import { useState } from "react";
import Events from './Events'; 
import Header from './components/Header';
import Details from './Details';
import { useLocalStorage } from "./useLocalStorage";
import CartModal from "./PopupPanier";

function App() {
  const [page, setPage] = useState('events');
  const [eventId, setEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    setPage(page);
  }

  return (
    <>
      <div >
        <header>
          <Header setPage={handlePageChange} setSearchQuery={setSearchQuery} />
        </header>

        <main className='p-4'> 
          {page === 'details' ? (
            <Details setPage={setPage} eventId={eventId} />
          ) : (
            <Events setPage={setPage} setEventId={setEventId} searchQuery={searchQuery} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;

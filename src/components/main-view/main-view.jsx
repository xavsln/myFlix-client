import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// import { kagemusha_poster } from './images/kagemusha_poster.jpeg';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Tokyo Story', Description: 'The elderly Shukishi (Chishu Ryu) and his wife, Tomi (Chieko Higashiyama), take the long journey from their small seaside village to visit their adult children in Tokyo. Their elder son, Koichi (Sô Yamamura), a doctor, and their daughter, Shige (Haruko Sugimura), a hairdresser, don\'t have much time to spend with their aged parents, and so it falls to Noriko (Setsuko Hara), the widow of their younger son who was killed in the war, to keep her in-laws company....', ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Tokyo-story-20201121.jpg' },
        { _id: 2, Title: 'Blade Runner', Description: 'Rick Deckard, an ex-policeman, becomes a special agent with a mission to exterminate a group of violent androids. As he starts getting deeper into his mission, he questions his own identity.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png1'},
        { _id: 3, Title: 'Kagemusha', Description: 'A petty thief is forced to choose between death and impersonating a warlord. His initial enjoyment gives way as war approaches.', ImagePath: 'images/kagemusha_poster.jpeg' }
      ]
    }
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
<div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}
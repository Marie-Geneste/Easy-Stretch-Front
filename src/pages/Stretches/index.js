import axios from 'axios';
import { Component } from 'react';

// Components
import Card from '../../components/Card';

// Styles
import './styles.scss';


export default class Stretches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stretches: [],
      categories: [],
      searchTerm: '',
      favoriteIds: new Set()
    }
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/stretches`)
      .then(response => this.setState({ stretches: response.data }));

    axios.get(`${process.env.REACT_APP_BASE_URL}/categories`)
      .then(response => this.setState({ categories: response.data }));

    if (this.props.isLogged) {
      const token = localStorage.getItem('token');
      axios.get(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const favIds = new Set(res.data.map(f => Number(f.id ?? f.stretch_id)));
        this.setState({ favoriteIds: favIds });
      })
      .catch(err => console.error("GET favorites failed:", err));
    }
  }

  toggleFavorite(stretchId) {
    if (!this.props.isLogged) return;
    const token = localStorage.getItem('token');
    const { favoriteIds } = this.state;
    const isFav = favoriteIds.has(stretchId);

    // Optimistic update
    const updated = new Set(favoriteIds);
    if (isFav) updated.delete(stretchId); else updated.add(stretchId);
    this.setState({ favoriteIds: updated });

    const cfg = { headers: { Authorization: `Bearer ${token}` } };
    const req = isFav
      ? axios.delete(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${stretchId}`, cfg)
      : axios.post(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${stretchId}`, {}, cfg);

    req.catch(err => {
      console.error("toggleFavorite failed:", err);
      // rollback
      const rollback = new Set(updated);
      if (isFav) rollback.add(stretchId); else rollback.delete(stretchId);
      this.setState({ favoriteIds: rollback });
    });
  }

  // reste inchangé…
  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  filterData = () => {
    const { searchTerm } = this.state
    return this.state.stretches.filter((rawdata) => {
      return rawdata.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  render() {
    const filterData = this.filterData();
    return (
      <div className='Stretches'>
        {/* ... input de recherche, bouton admin, etc ... */}

        <main>
          <div className='stretches-container'>
            <ul>
              {this.state.categories.map((category) => (
                <div className='category' key={category.name}>
                  <div id={category.name} />
                  <h2>{category.name}</h2>
                  <ul>
                    {filterData
                      .filter(stretch => stretch.categorie_id === category.id)
                      .map((stretch) => (
                        <Card
                          key={stretch.id}
                          id={stretch.id}
                          title={stretch.name}
                          description={stretch.description}
                          img={stretch.main_image}
                          alt={stretch.name}
                          hover={stretch.name}
                          link={stretch.id}
                          isLogged={this.props.isLogged}
                          isFavorite={this.state.favoriteIds.has(stretch.id)}
                          onToggleFavorite={() => this.toggleFavorite(stretch.id)}
                        />
                      ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </main>
      </div>
    )
  }
}


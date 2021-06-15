import { Component } from 'react';
import request from 'superagent';
import Spinner from './Spinner';
import Sort from './Sort'
import PokeList from './PokeList.js';

const sleep = (x) => new Promise((res, rej) => setTimeout(() => { res() }, x))

export default class PokeIndex extends Component {
    state = {
        pokemon: [],
        direction: 'asc',
        query: '',
        page: 1,
        loading: false,
    };

    componentDidMount = () => {
        this.fetchPokemon();
    };

    setDirection = (e) => {
        this.setState({ direction: e.target.value });
    };

    setQuery = (e) => {
        this.setState({ query: e.target.value });
    };

    setPage = async (e) => {
        const number = Number(this.state.page) + Number(e.target.value)
        await this.setState({page: number})
        this.fetchPokemon();
    }

    fetchPokemon = async () => {
        this.setState({loading: true});
        const searchParams = new URLSearchParams({
            sort: 'pokemon',
            direction: this.state.direction,
            page: this.state.page,
        });
        if (this.state.query) {
            searchParams.set('pokemon', this.state.query);
        }
        const {
            body: { results: data },
        } = await request.get(
            `https://pokedex-alchemy.herokuapp.com/api/pokedex?${searchParams.toString()}`
        );
        await sleep(1000)
        this.setState({ loading: false });
        this.setState({ pokemon: data });
    };

    render() {

        return (
            <div className="search">
                <div className="controls">
                    <input
                        onChange={this.setQuery}
                        id="search"
                        placeholder="search name"
                    />
                    <Sort event={this.setDirection} id="search-order"/>
                    <button onClick={this.fetchPokemon}>Search</button>
                    <button onClick={this.setPage} value="1">Next Page ({this.state.page + 1})</button>
                    {(this.state.page >= 2)
                      ? <button onClick={this.setPage} value="-1">Previous Page ({this.state.page - 1})</button>
                      : <div></div>                    
                    }
                </div>
                {this.state.loading
                  ? <Spinner />
                  : <PokeList pokeData={this.state.pokemon}/>
                }
            </div>
        );
    }
}
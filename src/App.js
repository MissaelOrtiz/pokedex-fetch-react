import './App.css';
import React, { Component } from 'react'
import Header from './Header'
import PokeList from './PokeList.js'
import request from 'superagent'
import Spinner from './Spinner';
import Sort from './Sort'

const sleep = (x) => new Promise((res, rej) => setTimeout(() => { res() }, x))


export default class App extends Component {
    state= {
      pokeData: [],
      query: '',
      sortOrder: 'asc',
      loading: false,
    }

    componentDidMount = async () => {
      await this.fetch();
    }

    handleClick = async () => {
      await this.fetch()
    }

    handleChange = (e) => {
      this.setState({ query: e.target.value });
    }

    fetch = async () => {
        this.setState({loading: true});

        const URL = this.state.query
            ? `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=pokemon&direction=${this.state.sortOrder}`
            : `https://alchemy-pokedex.herokuapp.com/api/pokedex?sort=pokemon&direction=${this.state.sortOrder}`;

        const data = await request.get(URL)
        await sleep(1000)

        this.setState({ loading: false });
        this.setState({ pokeData: data.body.results})
    }

    handleSort = async (e) => {
      this.setState({sortOrder: e.target.value})
    }

    render() {
        return (
            <div>
              <Header />
              <div className="center-div">
                <input onChange={this.handleChange} />
                <button onClick={this.handleClick}> Fetch! </button>
                <Sort event={this.handleSort}/>
                {this.state.loading
                  ? <Spinner />
                  : <PokeList pokeData={this.state.pokeData}/>
                }
              </div>
            </div>
        )
    }
}

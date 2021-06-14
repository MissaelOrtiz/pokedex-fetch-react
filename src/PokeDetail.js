import { Component } from 'react';
import request from 'superagent';
import PokeItem from './PokeItem';



export default class PokeDetail extends Component {
    state = {
        pokemon: {},
    };

    componentDidMount() {
        this.fetchPokemon();
    }

    fetchPokemon = async () => {
        const data = await request.get(
            `https://pokedex-alchemy.herokuapp.com/api/pokedex/${this.props.match.params.id}`
        );

        this.setState({ pokemon: data.body.results[0] });
    };

    render() {
        console.log(this.state.pokemon);
        return (
            <div className="detail">
                Poke Details
                {this.state.pokemon && <PokeItem poke={this.state.pokemon} />}
            </div>
        );
    }
}
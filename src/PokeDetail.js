import { Component } from 'react';
import request from 'superagent';

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

        this.setState({ pokemon: data.body });
    };

    render() {
        let pokemans = this.state.pokemon;
        console.log(pokemans)
        return (
            <div className="detail">
                <section className="top-detail">
                    <div className="box" style={{'backgroundColor': `${pokemans.color_1}`}}>
                        <h2>{pokemans.pokemon}</h2>
                        <img src={pokemans.url_image} alt={pokemans.pokemon} className="details-image"/>
                    </div>
                </section>
                <section className="bot-detail">
                    <div className="box">
                        POKE INFO
                        <hr/>
                        <p>Pokemon: {pokemans.pokebase}</p>
                        <p>Type: <span style={{'backgroundColor': `${pokemans.color_1}`}}>{pokemans.type_1}</span> {(pokemans.type_2 === "NA")
                        ? ""
                        : <span style={{'backgroundColor': `${pokemans.color_2}`}}>, {pokemans.type_2}</span>
                        }
                        </p>
                        <p>Egg Group: {pokemans.egg_group_1} {(pokemans.egg_group_2 === "NA")
                        ? ""
                        : `, ${this.state.pokemon.egg_group_2}`
                        }</p>
                        <p>Abilities: {pokemans.ability_1} {(pokemans.ability_2 === "NA")
                        ? ""
                        : `, ${this.state.pokemon.ability_2}`
                        }</p>
                        {(pokemans.ability_hidden === "NA") ? "" : <p>Hidden Ability: {pokemans.ability_hidden}</p>}
                    </div>
                    <div className="box">
                        COMBAT STATS
                        <hr/>
                        <p>pkmID: {pokemans.id}</p>
                        <p>Health: {pokemans.hp}</p>
                        <p>Attack: {pokemans.attack}</p>
                        <p>Defense: {pokemans.defense}</p>
                        <p>Special Attack: {pokemans.special_attack}</p>
                        <p>Special Defense: {pokemans.special_defense}</p>
                        <p>Speed: {pokemans.speed}</p>
                    </div>
                </section>
            </div>
        );
    }
}
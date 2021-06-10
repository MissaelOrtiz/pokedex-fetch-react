import React, { Component } from 'react'
import PokeItem from './PokeItem'

export default class PokeList extends Component {
    render() {
        return (
            <div className="list">
                {this.props.pokeData.map((pokemon, i) => <PokeItem data={pokemon} key={i}/>)}
            </div>
        )
    }
}

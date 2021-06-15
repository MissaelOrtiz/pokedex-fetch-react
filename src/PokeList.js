import React, { Component } from 'react'
import PokeItem from './PokeItem'
import { Link } from 'react-router-dom'
export default class PokeList extends Component {
    render() {
        return (
            <div className="list">
                {this.props.pokeData.map((pokemon, i) => 
                <Link to={`pokemon/${pokemon._id}`}>
                    <PokeItem data={pokemon} key={i}/>
                </Link>
                )}
            </div>
        )
    }
}

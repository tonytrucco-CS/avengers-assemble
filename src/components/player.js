import React from 'react'

import _ from 'lodash'

class Player extends React.Component {
  render() {
    let player = this.props.player;
    return (
      <li className='player-block'>
        <h3>{ player.first_name } { player.last_name }</h3>
        <p>References Understood: { player.rating }</p>
        <p>Prefers: { _.capitalize(player.handedness) } Hand</p>
        <a onClick={ this.props.remove }><small>Remove Avenger</small></a>
      </li>
    )
  }
}

export default Player;

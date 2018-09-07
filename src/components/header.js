import React from 'react'

import { NavLink } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        { this.props.authenticated ?
          <React.Fragment>
            <NavLink style={{ display: 'contents' }} to='/'><img
              style={{ maxHeight: '24px' }}
              alt='Avengers Assemble'
              src={ `${process.env.PUBLIC_URL}/images/avengers.png` }
            /></NavLink>
            <div className='flex'>
              <NavLink to='/new'>New Director</NavLink>
              <NavLink to='/manage'>Add Avengers</NavLink>
              <NavLink to='/roster'>View Roster</NavLink>
            </div>
          </React.Fragment>
          :
          <NavLink style={{ display: 'contents' }} to='/'><img
            style={{ maxHeight: '24px' }}
            alt='Avengers Assemble'
            src={ `${process.env.PUBLIC_URL}/images/avengers.png` }
          /></NavLink>
        }
      </div>
    )
  }
}

export default Header;

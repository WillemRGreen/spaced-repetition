import React, { Component } from 'react'
import DashboardDisplay from '../../components/DashboardDisplay/DashBoardDisplay'

class DashboardRoute extends Component {

  

  render() {
    return (
      <section className='dashboard'>
        <DashboardDisplay />
      </section>
    );
  }
}

export default DashboardRoute

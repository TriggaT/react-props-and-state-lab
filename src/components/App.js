import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  filterPets = (pet) => {
    this.setState({
      filters: {...this.state.filters, type:pet}
    })
  }

  getPets = () => {
    if (this.state.filters.type !== "all"){
      let pet = this.state.filters.type
      fetch(`/api/pets?type=${pet}`)
      .then(r => r.json())
      .then(pets => 
        this.setState({pets:pets})
      )
      return 
    }

    fetch("/api/pets")
    .then(r => r.json())
    .then(allPets => this.setState({pets: allPets}))
  }

  adopted = (id) => {
    this.state.pets.find(pet => pet.id === id).isAdopted = true 
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.filterPets} onFindPetsClick={this.getPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adopted} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

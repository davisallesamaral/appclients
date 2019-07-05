import axios from 'axios'
import React, { Component } from 'react'
import api from '../api'
 
class CreateClient extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      codeClient: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateClient = this.handleCreateClient.bind(this)
  }
 
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
 
  handleCreateClient (event) {
    event.preventDefault()
    const { history } = this.props
    const client = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      codeClient: this.state.codeClient
    }
 
    axios.post(api.clients, client)
      .then(response => {
        // redirect to the homepage
        history.push('/')
        //console.log('response: ', response)
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }
 
  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>Create new client</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateClient}>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      id='name'
                      type='text'
                      className='form-control'
                      name='name'
                      value={this.state.name}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      id='email'
                      type='text'
                      className='form-control'
                      name='email'
                      value={this.state.email}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      id='phone'
                      type='text'
                      className='form-control'
                      name='phone'
                      value={this.state.phone}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='codeClient'>Code Client</label>
                    <input
                      id='codeClient'
                      type='text'
                      className='form-control'
                      name='codeClient'
                      value={this.state.codeClient}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <button onClick={ () => this.props.history.goBack()} className='btn btn-default'>Cancelar</button>
                  <button className='btn btn-primary'>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default CreateClient
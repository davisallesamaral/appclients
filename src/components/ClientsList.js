import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import api from '../api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt , faTrash} from '@fortawesome/free-solid-svg-icons';

class ClientsList extends Component {
 
    constructor () {
        super()
        // State é onde 'guardamos' as variáveis, os dados da nossa aplicação que sofrerão alterações. É onde basicamente declaramos todas as variáveis do nosso componente
        this.state = {
            clients: [],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1
        }
        this.handlePageChange=this.handlePageChange.bind(this);
    }
 
    // componentDidMount - Esse método é chamado imediatamente após a montagem do componente.
    componentDidMount () {
        // Utilizamos agora o axios para requisitar a lista de clientes
        axios.get(api.clients).then(response => {
            this.setState({
                clients: response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page,
                pageRangeDisplayed:3
            })
        })
    }
 
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
       // this.setState({activePage: pageNumber});
        axios.get(api.clients + "?page="+pageNumber).then(response => {
            this.setState({
                clients: response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page,
                pageRangeDisplayed:3
            })
        })
      }


    // Função para deletar um cliente
    deleteContact (clienteId) {
            axios.delete(api.clients+'/'+`${clienteId}`)
            .then(() => {
 
                    // Usamos o GET depois de uma requisição para atualizar a lista
                    return axios.get(api.clients)
            })
            .then(res => {
 
                    // Editando os dados no state
                    const clients = res.data;
                    this.setState({ clients });
            })
    }
 
    render () {
                const { clients } = this.state
                return (
                    <div className="container">
                    <h2>Client List</h2>
                    <table className="table ">
                            <thead>
                                    <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>ID Code Client</th>
                                            <th>
                                                <Link className='btn btn-primary btn-xs' to='/create'>
                                                <FontAwesomeIcon icon={ faPlus } /> Add Client
                                                    </Link>
                                            </th>
                                    </tr>
                            </thead>
                            <tbody>
                                    {
                                        clients.map((client, index) => (
                                            <tr key={client.id}>
                                                    <td>{client.id}</td>
                                                        <td>{client.name}</td>
                                                            <td>{client.email}</td>
                                                            <td>{client.phone}</td>
                                                            <td>{client.codeClient}</td>                               
                                                            <td>
                                                            <Link className='btn btn-primary btn-xs' 
                                                            to={`/client/${client.id}`}>
                                                            <FontAwesomeIcon icon={ faPencilAlt } />
                                                        </Link>
                                                        <span>&nbsp;&nbsp;</span>
                                                            <button 
                                                                className="btn btn-danger btn-xs btn-delete"
                                                                onClick={ () => this.deleteContact(client.id) }
                                                            >
                                                                <FontAwesomeIcon icon={ faTrash } />
                                                            </button>


                                             
                                                            
                                                    </td>
                                            </tr>
                                            ))
                                        }
                                            
                            </tbody>
                    </table>
                    <div>
                        <div class="d-flex justfy-content-center">
                            <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClass='page-link'
                            />
                        </div>
                    </div>
            </div>
        )
        }
}
 
export default ClientsList
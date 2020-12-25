import React, { Component } from 'react'
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planetList: [],
            favList: []
        }
    }

    componentDidMount() {
        fetch('https://assignment-machstatz.herokuapp.com/planet')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    planetList: result,
                    favList: result.filter(x => x.isFavourite === true)
                });
            });
    }
    notify = (planet) => {
        fetch(`https://assignment-machstatz.herokuapp.com/planet/${planet.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'applicarion/json',
                'Content-Type': 'application/json'
            },
            body: {
                "id": planet.id,
                "isFavourite": "true",
                "name": planet.name
            }
        })
            .then(res => res.json())
            .then((result) => {
                toast.success('Added to Favourite Successfully',
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        style: { background: "#25bcff" }
                    });
                console.log(result)
            },
                (error) => {
                    console.log(error);
                    toast.error('Problem with the server. Try later.',
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                        })
                }
            )
    }
    notify1 = (planet) => {
        fetch(`https://assignment-machstatz.herokuapp.com/planet/${planet.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'applicarion/json',
                'Content-Type': 'application/json'
            },
            body: {
                "id": planet.id,
                "isFavourite": "false",
                "name": planet.name
            }
        })
            .then(res => res.json())
            .then((result) => {
                toast.success('Removed from Favourite List',
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        style: { background: "#25bcff" }
                    });
                console.log(result)
            },
                (error) => {
                    console.log(error);
                    toast.error('Problem with the server. Try later.',
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                        })
                }
            )
    }
    render() {
        return (
            <div className="body" >
                <div className='back' style={{ backgroundImage: `url('/assets/bg1.jpg')` }}>
                </div>
                <div className='container'>
                    <h3>{this.props.title}</h3>
                    <div className="box">
                        <h2>{this.props.listTitle}</h2>
                        {
                            this.props.view === "listView" ?
                                (
                                    this.state.planetList.length > 0 ? this.state.planetList.map((planet, index) => (
                                        <ul>
                                            <li onClick={() => this.notify(planet)} key={planet.id}><span>{index + 1}</span>{planet.name}</li>
                                        </ul>)) : (<div className="emptyList">No data exist :(</div>))
                                :
                                this.state.favList.length > 0 ? this.state.favList.map((planet, index) => (
                                    <ul>
                                        <li onClick={() => this.notify1(planet)} key={planet.id}><span>{index + 1}</span>{planet.name}</li>
                                    </ul>)) : (<div className="emptyList">No data exist :(</div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default List


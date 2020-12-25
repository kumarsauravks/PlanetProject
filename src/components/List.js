import React, { Component } from 'react'
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure();
class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planetList: [],
            favList:[]
        }
    }

    componentDidMount() {
        fetch('https://assignment-machstatz.herokuapp.com/planet')
            .then(res => res.json())
            .then(result => {
                this.setState({ planetList: result,
                                favList: result.filter(x=>x.isFavourite===true)
                            });
            });
    }
    notify = (planet) => {
            // let favArray=[];
            // let data=JSON.parse(localStorage.getItem("data"));
            // data?favArray=data:favArray=[];
            // if(favArray.length>0){
            //     favArray.forEach(item=>{
            //         if(item.id!==planet.id){
            //             favArray.push(planet);
            //         }
            //         //item.id===planet.id?console.log("matched"):favArray.push(planet);                    
            //     })
            // }
            // else{
            //     favArray.push(planet);
            // }
            // console.log(favArray.length);
            
            
            
            // const data={
            //     "id":planet.id,
            //     "isFavourite":"true",
            //     "name":planet.name
            // }
            // axios.put(`https://assignment-machstatz.herokuapp.com/planet/${planet.name}`,data)
            // .then((data)=>{
            //     console.log(data);
            //     toast.success('Added to Favourite Successfully',
            //     {
            //         position: toast.POSITION.TOP_RIGHT,
            //         autoClose: 2000,
            //         style: { background: "#25bcff" }
            //     })
            // })
            // .catch(err=>{
            //     console.log(err);
            //     toast.error('Problem with the server. Try later.',
            //     {
            //         position: toast.POSITION.TOP_RIGHT,
            //         autoClose: 2000,
            //     })
            // });

            fetch('https://assignment-machstatz.herokuapp.com/planet',{
                method:'PUT',
                headers:{
                    'Accept':'applicarion/json',
                    'Content-Type':'application/json'
                },
                body:{
                    "id":planet.id,
                    "isFavourite":"true",
                    "name":planet.name
                }
            })
            .then(res=>res.json())
            .then((result)=>{
                toast.success('Added to Favourite Successfully',
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    style: { background: "#25bcff" }
                });
                console.log(result)
            },
            (error)=>{
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
        const data={
                "id":planet.id,
                "isFavourite":"false",
                "name":planet.name
            }
        axios.post(`https://assignment-machstatz.herokuapp.com/planet/${planet.name}`,data)
            .then((data)=>{
                console.log(data);
                toast.success('Removed Favourite Successfully',
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    style: { background: "#25bcff" }
                })
            })
            .catch(err=>{
                console.log(err);
                toast.error('Problem with the server. Try later.',
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                })
            });
    }
    render() {
        return (
            <div className="body" >
                <div className='back' style={{backgroundImage:`url('/assets/bg1.jpg')`}}>
                    {/* <img className='back' src='/assets/space5.png'></img> */}
                </div>
                {/* <div className='container' style={{backgroundImage: `url(${'./assets/space1.jpg'})`,backgroundSize: 'cover'}}> */}
                    <div className='container'>
                    <h3>{this.props.title}</h3>
                    <div className="box">
                        <h2>{this.props.listTitle}</h2>
                        {/* {
                            this.state.favList.length?(
                                <ul>
                            {
                                this.state.favList.map((planet, index) => (
                                    <li onClick={this.props.view === "listView" ? this.notify : this.notify1} key={planet.id}><span>{index + 1}</span>{planet.name}</li>
                                ))
                            }
                        </ul>
                        ):(<div className="emptyList">No data exist :(</div>)
                        } */}
                        {
                            this.props.view==="listView"?
                            (
                                this.state.planetList.length>0?this.state.planetList.map((planet,index)=>(
                                <ul>
                                    <li onClick={()=>this.notify(planet)} key={planet.id}><span>{index+1}</span>{planet.name}</li>
                                </ul>)):(<div className="emptyList">No data exist :(</div>))
                            :
                            this.state.favList.length>0?this.state.favList.map((planet,index)=>(
                                <ul>
                                    <li onClick={()=>this.notify1(planet)} key={planet.id}><span>{index+1}</span>{planet.name}</li>
                                </ul>)):(<div className="emptyList">No data exist :(</div>)
                        }                        
                    </div>
                </div>
            </div>
        )
    }
}

export default List

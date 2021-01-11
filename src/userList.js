import React from 'react';
import axios from 'axios';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            list: [],
            mesaGes: {},
            auth: {},
            nameCompany:'',
            inserUsers:[],

            but: false,
            obj: {
                auth_email: localStorage.getItem('email'),
                receiver_id: ''
            },
            search: '',

            auth_id:66289,
            col: true,
            active: null,
        }
        this.historClick = this.historClick.bind(this);
        this.insertUsers = this.insertUsers.bind(this);
        this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'search');
        this.userLast=this.userLast.bind(this);
       

    }

    componentDidMount() {
        // setInterval(this.loadList, 2000);

        this.props.history.push(`/admin/messages/`);   
        this.insertUsers();
        this.userLast();

        // console.log(window.location,'href')
        //    console.log(this.props,'props')
    
    }

    
    insertUsers(){
        axios.get(`https://www.webwork-tracker.com/chat-api/users?user_id=${this.state.auth_id}`)
                .then(resp => {
                    this.setState({
                        inserUsers: resp.data.users,
                        nameCompany:resp.data.team_name,

                    })
                }).catch(err=>console.log(err))
    }

    userLast()  {
        axios.get(`http://127.0.0.1:8000/api/getLast?user_id=${this.state.auth_id}`).then(resp => {
            console.log(resp,'lastUser');
            this.setState({
                mesaGes:resp.data
            })
            console.log(this.state.mesaGes,'jhgjhgj')
        })
    }
   
    historClick(id) {
        this.props.history.push(`/admin/messages/${id}`);
        

        this.setState({
            col: false,
            active: id,
           

        },() => this.userLast())
        // ,() => this.userLast()
        
        

    }

    //Search


    keyUpHandler(refName, e) {
       
        // console.log(e.target,'valueE');
        axios.get('http://127.0.0.1:8000/api/search?search=' + e.target.value).then(resp => {
                   
                    
                    if (e.target.value !== '' ) {
                        this.setState({
                            inserUsers:resp.data,
                            col: true,
                            active: null,
                        })
                        this.props.history.push(`/admin/messages/`);
                    } else {
        
                        this.insertUsers();
        
                    }
                   
                })
    }



    render() {

        let defaultPng='https://simg.nicepng.com/png/small/73-730154_open-default-profile-picture-png.png';

        let myStile = {

            backgroundColor: '#3F0E40',
            position: 'absolute',
            marginLeft: '350px',
            width: '650px',
            height: '600px',
            color: 'white',
            bottom: '-110px'
        }
        
        return (
            <div>
                <div className="headind_srch">
                    <div className="recent_heading">
                        <h4>  {this.state.nameCompany} <b style={{ color: 'white' }} ></b> </h4>

                    </div>

                </div>
                <div className="headind_srch">
                    {/* SEARCH */}
                    <div className="srch_bar">
                        <div className="stylish-input-group">
                            <input
                                type="text"
                                className="search-bar"
                                placeholder="Search "
                                name='search'
                                ref='search'
                                onKeyUp={this.handleSearchKeyUp}
                            />

                        </div>
                    </div>


                </div>

                <div className="inbox_chat">

                {this.state.col ? <div style={myStile} >   <h1 style={{ textAlign: 'center', marginTop: '200px' }}>☜ Choose Your Friend</h1>  </div> : null}
                    {
                        this.state.inserUsers.map(item => {
                            var classList = 'chat_list ' + (this.state.active === item.id ? 'active' : '');
                            return (

                                <div
                                    className={classList}
                                    key={item.id}
                                    onClick={() => this.historClick(item.id)}
                                >

                                    <div className="chat_people"  >

                                        <div className="chat_img">
                                            <img src={ item.avatar ? `https://www.webwork-tracker.com/avatars/${item.avatar}` : defaultPng } alt={item.id}  />

                                        </div>
                                        <div className="chat_ib">
                                            <h5> {item.firstname  } {item.lastname}
                                                {/* ONLINE OFLINE */}
                                                {/* {this.state.obj.auth_email === item.email ? <span className="chat_date" style={{ color: 'green' }}> <b>Online</b></span> : <span className="chat_date" ><b> OFline </b></span>} */}
                                            </h5>
                                            
                                            <b style={{ color:'#F7C434' }}> 
                                                { this.state.mesaGes[item.id] }
                                                </b> 
                                            
                                    


                                        </div>


                                    </div>


                                </div>


                            )
                        })
                    }

                </div>

            </div>
        )
    }
}
export default UserList;
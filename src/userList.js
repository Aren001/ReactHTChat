import React from 'react';
import axios from 'axios';
import HtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';



class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            list: [],
            mesaGes: {},
            auth: {},
            nameCompany: '',
            inserUsers: [],
            usersGroup: [],
            authUser:{},

            but: false,
            obj: {
                auth_email: localStorage.getItem('email'),
                receiver_id: ''
            },
            search: '',

            auth_id: localStorage.getItem('id'),
            team_id: '',
            col: true,
            active: null,
            grop: true,
            prof:false,
        }
        this.historClick = this.historClick.bind(this);
        this.insertUsers = this.insertUsers.bind(this);
        this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'search');
        this.userLast = this.userLast.bind(this);
        // this.addToGrop = this.addToGrop.bind(this); 
    }
    componentWillMount() {
        this.insertUsers();
    }

    componentDidMount() {
        // setInterval(this.loadList, 2000);

        this.props.history.push(`/admin/messages/`);
        this.insertUsers();
        this.userLast();
        this.authUser();

        // console.log(window.location,'href')
        //    console.log(this.props,'props')
    }


    insertUsers() {

        axios.get(`https://www.webwork-tracker.com/chat-api/users?user_id=${this.state.auth_id}`)
            .then(resp => {
                // console.log(resp)
                this.setState({
                    inserUsers: resp.data.users,
                    nameCompany: resp.data.team_name,
                    team_id: resp.data.team_id
                })
                // console.log(this.state.inserUsers.slice(0,6),'user')

            }).catch(err => console.log(err))
    }

    userLast() {
        axios.get(`http://127.0.0.1:8000/api/getLast?user_id=${this.state.auth_id}`).then(resp => {
            // console.log(resp,'lastUser');
            this.setState({
                mesaGes: resp.data
            })
        })
    }

    historClick(id) {
        this.props.history.push(`/admin/messages/${id}`);
        this.userLast();
        this.setState({
            col: false,
            active: id,

        }, () => this.userLast())
    }

    //Search


    keyUpHandler(refName, e) {

        // console.log(e.target,'valueE');
        axios.get(`http://127.0.0.1:8000/api/${this.state.auth_id}/search?search=${e.target.value}`).then(resp => {
            // console.log(resp, 'SEARCHs')


            if (e.target.value !== '') {
                this.setState({
                    inserUsers: resp.data,
                    col: true,
                    active: null,
                })
                this.props.history.push(`/admin/messages/`);
            } else {

                this.insertUsers();

            }

        })
    }


    // Auth User
    authUser = () => {
        axios.get(`http://127.0.0.1:8000/api/authUser?user_id=${this.state.auth_id}`).then(resp => {
            // console.log(resp, 'authUsers');
            this.setState({
                authUser:resp.data,
            })
        })
    }

    render() {

        let defaultPng = 'https://simg.nicepng.com/png/small/73-730154_open-default-profile-picture-png.png';

        let myStile = {

            backgroundColor: '#3F0E40',
            position: 'absolute',
            marginLeft: '350px',
            width: '650px',
            height: '600px',
            color: 'white',
            bottom: '-110px',
            borderRadius:'80px'
        }

        return (
            <div>
                <div className="headind_srch">

                    <div className="recent_heading">

                        <div>
                        <img className='profileImg' src={this.state.authUser.avatar ? `https://www.webwork-tracker.com/avatars/${this.state.authUser.avatar}` : defaultPng} width='40' height='40' />
                        <b style={{ color:'white'  }}> {this.state.auth_id ? this.state.authUser.firstname : 'Not Network' }  </b>
                        <b style={{ marginLeft:'23px',color:'white' ,cursor: 'pointer' }} onClick={() => this.setState({prof:!this.state.prof})}>{this.state.prof ? '⌵' : '≡'} </b>
                        {/* <br/><br/> */}

                        <Link className={ this.state.prof ? 'logoutsTrue': 'logouts'} to='/logout'>Logout</Link>
                        </div>

                    </div>

                </div>
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
                    <div>

                    </div>


                </div>

                <div className="inbox_chat" >

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

                                    <div className="chat_people">

                                        <div className="chat_img">
                                            <img src={item.avatar ? `https://www.webwork-tracker.com/avatars/${item.avatar}` : defaultPng} alt={item.id} />
                                            <p className={this.state.auth_id == item.id ? 'onlineImgAuth' : 'onlineImg'}></p>
                                            {/* Auth User Name */}
                                            {this.state.auth_id == item.id ? localStorage.setItem('firstname', item.firstname) : null}

                                        </div>
                                        <div className="chat_ib">
                                            <h5> {item.firstname} {item.lastname}</h5>


                                            <div className='lastMesa'>
                                                {HtmlParser(this.state.mesaGes[item.id])}
                                            </div>

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


//   //Add CHanals
//   getItem = id => {

//     const user = this.state.inserUsers.find(item => item.id === id);
//     return user;
//   };

// addToGrop(id) {
//     let arr = [...this.state.inserUsers];
//     const index = arr.indexOf(this.getItem(id));
//     const user = arr[index];

//     this.setState({
//       usersGroup: [...this.state.usersGroup, user],
//     })
//     console.log(this.state.usersGroup,'GROUPUsers');

// }
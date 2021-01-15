import React from 'react';

import axios from 'axios';

import Loading from './Loading/loading';


import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import HtmlParser from "react-html-parser";
import './editor.css';





class MesageList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading: false,
            mesages: [],
            list: [],

            addMes: {

                email: '',
                creator_id: '',
                receiver_id: '',
                seen: '',
                input: '',

            },

            editorState: EditorState.createEmpty(),

            auth_id: localStorage.getItem('id'),
            team_id: '',


        }
        this.loadMesage = this.loadMesage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /////////////////

    componentDidMount() {
        const Id = this.props.match.params.id;
        // console.log(Id, 'id')
        this.loadList();
        this.loadMesage(Id);
        // setInterval(this.loadMesage(Id), 2000);

        // console.log(this.props, 'props')

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            //  new User id 
            const Id = nextProps.match.params.id;
            // console.log(this.props);

            this.loadMesage(Id);
        }
    }

    //GET USERS
    loadList = () => {
        axios.get(`https://www.webwork-tracker.com/chat-api/users?user_id=${this.state.auth_id}`)
            .then(resp => {
                console.log(resp, 'creat');
                this.setState({
                    list: resp.data.users,
                    team_id: resp.data.team_id
                })
            })
    }

    //////////////

    //GET MESSAGES
    loadMesage(id) {


        this.setState({
            loading: true
        })

        axios.get(`https://www.webwork-tracker.com/chat-api/users?user_id=${this.state.auth_id}`)
            .then(resp => {
                this.setState({
                    team_id: resp.data.team_id

                })


                // axios.get(`http://127.0.0.1:8000/api/messages/${id}/?email=` + localStorage.getItem('email'))
                axios.get(`http://127.0.0.1:8000/api/messages/${id}/${this.state.team_id}/?user_id=${this.state.auth_id}`)
                    .then(resp => {
                        console.log(resp, "messagesResp")
                        this.setState({
                            mesages: resp.data,

                            addMes: {
                                email: localStorage.getItem('email'),
                                creator_id: '',
                                receiver_id: this.props.match.params.id,
                                seen: 0,
                                input: '',
                            },
                            loading: false,
                        })

                    })
            })

    }

    //CONVER TIME
    convert = (a) => {
        a = new Date(String(a));
        return a.toLocaleString();;
    }

    //DELETE MESSAGES
    deleteMes(id) {
        axios.delete(`http://127.0.0.1:8000/api/messages/delete/${id}`)
            .then(resp => {
                // console.log(resp,'del')
                const Id = this.props.match.params.id;
                this.loadMesage(Id);
            })
    }

    //EDITORSSSS
    handleChange(e) {
        e.preventDefault();

        const mes = {
            // email: localStorage.getItem('email'),
            user_id: this.state.auth_id,
            team_id: this.state.team_id,
            receiver_id: this.props.match.params.id,
            seen: 0,
            message: this.state.addMes.input,


        };


        axios.post('http://127.0.0.1:8000/api/messages/add', mes)
            .then(resp => {
                // console.log(resp,'ADD');
                this.loadMesage(this.props.match.params.id);
            })
        this.setState({
            editorState: EditorState.createEmpty()
        })


    }

    onEditorStateChange = (editorState) => {

        this.setState({
            editorState,
        });
        var data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
            addMes: {
                input: data
            }
        })
        // console.log(this.state.addMes.input,'input')
    };

    //EDITOR UPLOAD IMG
    uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID c166b3ccc22b789');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }



    render() {
        let defaultPng = 'https://simg.nicepng.com/png/small/73-730154_open-default-profile-picture-png.png';
        if (this.state.loading) {
            return <Loading />
        }


        return (
            <div >
                <div className='mesBoard'>
                    {this.state.list.map(item => {
                        return <div key={item.id} className='bordFlex'>
                            {this.props.match.params.id == item.id ?
                                <>  <div> <b className={this.state.auth_id==item.id ? 'borderOnline' : 'borderOffline'}>
                                    〇</b>  <b> {item.firstname} {item.lastname}</b></div>
                                    <b style={{ fontSize: '12px' }}> {this.state.mesages.length}-Messages〄 </b>
                                </> : null}
                        </div>
                    })}
                </div>
                <div className='msg_history'>




                    {
                        this.state.mesages.map(item => {
                            // console.log(item)


                            return (
                                <div key={item.id}>

                                    <div className={item.receiver_id === Number(this.props.match.params.id) ? 'outgoing_msg' : "incoming_msg"}>
                                        {/* <div className="incoming_msg_img"> <img src='' alt="sunil" /> </div> */}
                                        <div className={item.receiver_id === Number(this.props.match.params.id) ? "sent_msg" : "received_msg"}>


                                            <div
                                                className="incoming_msg_img"
                                                className={item.receiver_id === Number(this.props.match.params.id) ? "none" : "incoming_msg_img"}
                                            >
                                                {/* IMG */}
                                                {this.state.list.map(e => {
                                                    if (e.id === item.creator_id) {
                                                        return <img key={e.id} src={e.avatar ? `https://www.webwork-tracker.com/avatars/${e.avatar}` : defaultPng} alt={e.id} />
                                                    }
                                                })}  </div>


                                            <div className="received_withd_msg">


                                                <div onDoubleClick={() => this.deleteMes(item.id)} className='mesHov'>

                                                    {HtmlParser(item.message)}
                                                </div>
                                                <div className='delete'>⚠️DoubleClick DELETE MESSAGES</div>


                                                <span className="time_date"> {this.convert(item.created_at)} </span></div>

                                        </div>
                                    </div>

                                </div>
                            )

                        })

                    }


                </div>
                <div className="type_msg">
                    <div className="input_msg_write">
                        <form onSubmit={this.handleChange}>


                            <div className='write_msg'>
                                <Editor
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}


                                    toolbar={{
                                        inline: {
                                            inDropdown: true, className: 'inline',
                                        },
                                        blockType: { className: 'blockType', },
                                        fontSize: { className: 'font' },
                                        list: {
                                            inDropdown: true, className: 'list',
                                        },
                                        textAlign: {
                                            inDropdown: true, className: 'textAlign',
                                        },
                                        fontFamily: { inDropdown: true, className: 'fonts', },
                                        colorPicker: { inDropdown: true, className: 'color', },
                                        link: {
                                            inDropdown: true, className: 'link',
                                        },
                                        embedded: { inDropdown: true, className: 'embed', },
                                        emoji: { inDropdown: true, className: 'emoji', },

                                        image: { className: 'img', uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },

                                    }}
                                    mention={{
                                        separator: ' ',
                                        trigger: '@',
                                        suggestions: this.state.list.map(e => {
                                            return {
                                                text: e.firstname,
                                                value: e.lastname,
                                                url: ''
                                            }
                                        }),

                                    }}

                                />

                            </div>

                            <button
                                className="msg_send_btn"
                                type="submit"
                            >S</button>
                        </form>


                    </div>

                </div>


            </div>
        )
    }

}
export default MesageList;



// loadMesage(id) {

//     // const Id = this.props.match.params.id;
//     this.setState({
//         loading:true
//     })
//     axios.get(`http://127.0.0.1:8000/api/messages/${id}/?email=` + localStorage.getItem('email'))
//     // axios.get(`http://127.0.0.1:8000/api/messages/${id}/?id=66289`)
//         .then(resp => {
//             console.log(resp, "messagesResp")
//             this.setState({
//                 mesages: resp.data,

//                 addMes: {
//                     email: localStorage.getItem('email'),
//                     creator_id: '',
//                     receiver_id: this.props.match.params.id,
//                     seen: 0,
//                     input: '',
//                 },
//                 loading:false,
//             })

//         })
// }



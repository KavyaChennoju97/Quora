import React, { Component } from 'react';
import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import unfollow from '../../Images/unfollow.png';
import axios from 'axios';
import AnswerDetails from '../Answers/AnswerDetails';
import AnswerForm from "../Answers/AnswerForm";
import swal from 'sweetalert';
import {rooturl} from '../../Config/settings'

class DisplayQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followedquestions:[],
            openAnswer: '',
            follow:false,
      
        }
    }

    CreateAnswer = (questionId) => {
        console.log(questionId);
        this.setState({
            openAnswer: <AnswerForm question_id={questionId} closeAnswerFormAndReload={this.closeFormAndReload} />
        })
    };

    closeFormAndReload = () => {
            swal("Saved answer");
            this.setState({ openAnswer: '' });
    }

    followquestion=(e,x,y)=>{
        console.log(localStorage.getItem("user_name"));
        this.setState({follow:true})
        swal("followed question");
        var data={
            follower_username:localStorage.getItem("user_name"),
            qid:x
        }
        axios.post("http://"+rooturl+":3001/quora/question/followquestion",data, localStorage.getItem('jwtToken'))
        window.location.reload(true);
    }
    unfollowquestion=(e,x,y)=>{
     console.log(localStorage.getItem("user_name"));
     this.setState({follow:false})
     console.log("hophop",x);
     swal("unfollowed question");
     this.setState({follow:false})
     var data={
         follower_username:localStorage.getItem("user_name"),
         qid:x,
         question:y
     }
     axios.post("http://"+rooturl+":3001/quora/question/unfollowquestion",data, localStorage.getItem('jwtToken'))
     window.location.reload(true);
 }
        

    render(){

      
        let record = this.props.question;
        let index = this.props.questionIndex;
        let answerDiv = null;
        let followDiv=null;
        
        if (record.answers.length>0) {
            let answer = record.answers[0];
            console.log(answer);
            answerDiv = <AnswerDetails answer={answer}/>;
        }
        console.log(this.state.follow)
        if(!record.followers.includes(localStorage.getItem("user_name")))
        {
            followDiv=<div className="follow-icon answer-icon-label" onClick={e=>this.followquestion(e,record._id,record.question)}>
            Follow {(record.followers.length == 0)? "": record.followers.length}</div>
  
        }
        else 
        {
            followDiv= <div id="unfollow-ques answer-icon-label" onClick={e=>this.unfollowquestion(e,record._id,record.question)}>
            <img src={unfollow} width="60" height="40" />{"  "}{(record.followers.length == 0)? ""
            :record.followers.length}</div>
              
        }

    
        let questionFooterDiv = null;
        questionFooterDiv = (
            <div>
                <div className="row" style={{ marginTop: "0.3em" }}>
                    <div className="question-footer-elem" style={{ marginLeft: "0.3em" }}>
                        <div className="answer-icon answer-icon-label" onClick={() => { this.CreateAnswer(record._id) }}>Answer</div>
                    </div>
                    <div className="question-footer-elem">
                        <div className="pass-icon answer-icon-label">Pass</div>
                    </div>
                    <div className="question-footer-elem" >
                       {followDiv}
                    </div>
                    <div className="question-footer-elem-share-icons" style={{ marginLeft: "18em" }}>
                        <div className="fb-icon answer-icon-hide">a</div>
                    </div>
                    <div className="question-footer-elem-share-icons">
                        <div className="twitter-icon answer-icon-hide">a</div>
                    </div>
                    <div className="question-footer-elem-share-icons">
                        <div className="share-icon answer-icon-hide">a</div>
                    </div>
                    <div className="question-footer-elem-share-icons">
                        <div className="dots-icon answer-icon-hide">a</div>
                    </div>

                </div>
            </div>
        );

            //console.log(this.props);

        return(
            
            <div className="card question-card">
                    <div className="card-body question-card-body">
                        <span className="pull-right clickable close-icon" data-effect="fadeOut" onClick={(event) => this.props.closeCardMethod(event, index)}><i class="fa fa-times"></i></span>
                        {this.props.isDefaultTopic ?
                        <p className="question-card-subtitle"> Answer . Topic you might like</p>
                        :
                        <p className="question-card-subtitle"> Answer . Topic you like</p>
                        }
                        <Link className="question-link" to={"/quora/question/" + record._id}>
                            <span className="card-title question-card  question-card-title">{record.question}</span>
                        </Link>
                        
                        {questionFooterDiv}
                        {this.state.openAnswer}
                        {answerDiv}
                    </div>
                </div>
        )
    }
}
export default DisplayQuestion;

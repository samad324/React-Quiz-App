import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Quizes from './components/Quizes/Quizes'
import ViewQuiz from './components/viewQuiz/ViewQuiz'
import Firebase from './firebase/firebase';
import swal from 'sweetalert';
import StartQuiz from './components/StartQuiz/StartQuiz'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: "",
      register : false,
      toLogin: true,
      key : "quiz123",
      quizData : '',
      showQuizes: false,
      viewQuiz: false,
      startQuiz : false,
      currentIndex : 0
    }
    this.setUser = this.setUser.bind(this)
    this.goRegister = this.goRegister.bind(this)
    this.setRegister = this.setRegister.bind(this)
    this.toLog = this.toLog.bind(this)
    this.stQuiz = this.stQuiz.bind(this)
  }

  componentDidMount(){
    Firebase.checkUser()
      .then((res)=> {
        this.setState({currentUser: res.uid , toLogin: false , showQuizes : true})
      })
  }



  quiz = (quizName , no) => {
    Firebase.getQuiz(quizName ,no)
      .then((res) => {
        this.setState({
          quizName,
          quizNo : no,
          quizData : res,
          mark : 0,
          showQuizes : false,
          viewQuiz: true
        })
      }).catch((err) => {
        swal("Error!!" , err.message , "error");
      })
  } 

  setUser(uid) {
    console.log(uid)
    this.setState({currentUser : uid , toLogin: false})
  }
  setRegister(uid){
    this.setState({
      currentUser : uid,
      register: false
    })
  }
  goRegister(){
    this.setState({register:true , toLogin : false})
  }

  toLog(){
    this.setState({toLogin: true,register: false})
  }

  stQuiz(inputKey){
    const { key } = this.state;
    if(inputKey === key){
      this.setState({startQuiz : true , viewQuiz : false})
    }else{
      swal('Error!!' , 'Product Key is not correct!' , 'error')
    }
  }

  nextQuetion = (answer) => {
    const { quizData , currentIndex , mark} = this.state
    if(answer === quizData.questions[currentIndex].currectAnswer){
      console.log(answer)
      this.setState({ 
        mark : mark + 1
      })
    }
    this.setState({currentIndex : currentIndex + 1})
  }
  render() {
    const { viewQuiz , startQuiz , showQuizes , register , toLogin , quizData ,currentIndex} = this.state;
    return (
      <div>
        <div>
          <div className="App-header d-flex">
            <h2 className="header align-self-center">React App</h2>
          </div>
        </div>
        {toLogin && <Login setUser={this.setUser} goRegister={this.goRegister}/>}
        {register && <Register setRegister={this.setRegister} toLog={this.toLog}/>}
        {showQuizes && <Quizes quiz={this.quiz}/>}
        {viewQuiz && <ViewQuiz data={quizData} stQuiz={this.stQuiz}/>}
        {startQuiz && <StartQuiz quizData={quizData} no={currentIndex} nextQuestion={this.nextQuetion}/>}
      </div>
    );
  }
}




export default App
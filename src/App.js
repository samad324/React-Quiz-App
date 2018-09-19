import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Quizes from './components/Quizes/Quizes'
import ViewQuiz from './components/viewQuiz/ViewQuiz'
import Firebase from './firebase/firebase';
import swal from 'sweetalert';
import StartQuiz from './components/StartQuiz/StartQuiz';
import ViewResult from './components/ViewResult/ViewResult'
import Loader from './components/Loader/Loader'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: "",
      register: false,
      toLogin: false, // true
      key: "quiz123",
      quizData: [],
      showQuizes: false,
      viewQuiz: false,
      result: false,
      startQuiz: false,
      currentIndex: 0,
      mark: 0,
      quizLength: 0,
      loader : true
    }
    this.setUser = this.setUser.bind(this)
    this.goRegister = this.goRegister.bind(this)
    this.setRegister = this.setRegister.bind(this)
    this.toLog = this.toLog.bind(this)
    this.stQuiz = this.stQuiz.bind(this)
  }

  componentDidMount() {
    Firebase.checkUser()
      .then((res) => {
        const { user, userData } = res;
        console.log(user.uid, userData)
        this.setState({ currentUser: user.uid, userData, toLogin: false, showQuizes: true,loader: false }) // true
      }).catch(err => {
          this.setState({loader: false , toLogin: true})
      })
  }

  res = () => {
    const { mark, currentUser, quizData } = this.state;
    let quizInfo = {
      title: quizData.title,
      mark: mark,
      total: quizData.questions.length
    }
    Firebase.saveQuiz(currentUser, quizInfo).then((res) => {
      this.setState({ startQuiz: false, result: true })
    }).catch((err) => {
      swal('Error', err.message, 'error')
    })
  }


  quiz = (quizName, no) => {
    let name = quizName.toLowerCase() + no[no.indexOf("_") + 1]
    const { userData } = this.state
    if (userData.quizes) {
      if (userData.quizes[name]) {
        const quiz = userData.quizes[name]
        this.setState({
          mark: quiz.mark,
          quizLength: quiz.total,
          showQuizes: false,
          result: true
        })
      }
    } else {
      Firebase.getQuiz(quizName, no)
        .then((res) => {
          this.setState({
            quizName,
            quizNo: no,
            quizData: res,
            quizLength: res.questions.length,
            showQuizes: false,
            viewQuiz: true
          })
        }).catch((err) => {
          swal("Error!!", err.message, "error");
        })
    }
  }

  setUser(uid) {
    console.log(uid)
    this.setState({ currentUser: uid, toLogin: false })
  }
  setRegister(uid) {
    this.setState({
      currentUser: uid,
      register: false
    })
  }
  goRegister() {
    this.setState({ register: true, toLogin: false })
  }

  toLog() {
    this.setState({ toLogin: true, register: false })
  }

  stQuiz(inputKey) {
    const { key } = this.state;
    if (inputKey === key) {
      this.setState({ startQuiz: true, viewQuiz: false })
    } else {
      swal('Error!!', 'Product Key is not correct!', 'error')
    }
  }

  nextQuetion = (answer) => {
    const { quizData, currentIndex, mark } = this.state
    if (answer === quizData.questions[currentIndex].correctAnswer) {
      console.log(answer)
      this.setState({
        mark: mark + 1
      })
    }
    this.setState({ currentIndex: currentIndex + 1 })
  }
  render() {
    const { loader ,quizLength, viewQuiz, result, startQuiz, mark, showQuizes, register, toLogin, quizData, currentIndex } = this.state;
    return (
      <div>
        <div>
          <div className="App-header d-flex">
            <h2 className="header align-self-center">React App</h2>
          </div>
        </div>
        {loader && <Loader />}
        {toLogin && <Login setUser={this.setUser} goRegister={this.goRegister} />}
        {register && <Register setRegister={this.setRegister} toLog={this.toLog} />}
        {showQuizes && <Quizes quiz={this.quiz} />}
        {viewQuiz && <ViewQuiz data={quizData} stQuiz={this.stQuiz} />}
        {startQuiz && <StartQuiz quizData={quizData} res={this.res} no={currentIndex} nextQuestion={this.nextQuetion} />}
        {result && <ViewResult data={{ mark, quizLength }} />}
      </div>
    );
  }
}




export default App
import React, { Component } from 'react';
import '../../App.css';
import '../../bootstrap.min.css';
import './Login.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import swal from 'sweetalert';
import Firebase  from '../../firebase/firebase';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing.unit,
  }
});


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.handleName = this.handleName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.LoginToFr = this.LoginToFr.bind(this)
  }

  LoginToFr() {
    const { email , password } = this.state;
    Firebase.login(email , password).then((res)=> {
      this.props.setUser(res.user.uid)
    }).catch((err) => {
      swal("Error!", err.message, "error");
    })
  }

  handleName = event => {
    this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };


  toReg(){
    this.props.goRegister()
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="container mt-5">
          <h2 className="mt-3 ml-2">Login</h2>
          <div className="mt-3 mx-3">
            <div className="mt-4">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">email</InputLabel>
                <Input id="name-simple" className="input" type="email" value={this.state.name} onChange={this.handleName} />
              </FormControl>
            </div>
            <div className="mt-4">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input id="password-input" type="password" value={this.state.password} onChange={this.handlePassword} />
              </FormControl>
            </div>
            <div className="mr-3 mt-2 d-flex flex-row justify-content-between">
              <h5 className="NeedReg" onClick={this.toReg.bind(this)}>Need Reistration?</h5>
              <Button variant="contained" color="primary" className={classes.button} onClick={this.LoginToFr}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Login)
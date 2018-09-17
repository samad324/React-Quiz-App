import React, { Component } from 'react';
import '../../App.css';
import '../../bootstrap.min.css';
import './Register.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Firebase from '../../firebase/firebase'
import swal from 'sweetalert';


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


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            name: '',
            password: '',
            cPassword: ''
        }
        this.RegisterFr = this.RegisterFr.bind(this);
        this.toLog = this.toLog.bind(this)
    }

    RegisterFr(e) {
        e.preventDefault()
        const { email, name, password, cPassword } = this.state;

        if (password !== cPassword) {
            swal("Error!", "Password and Confirm Password are not matched!", "error");
            return
        }
        Firebase.register(this.state).then((res) => {

        }).catch(err => {
            swal("Error!", err.message , "error");
        })
    }
    toLog() {
        this.props.toLog()
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit={this.RegisterFr}>
                    <div className="container mt-5">
                        <h2 className="mt-3 ml-2">Registration</h2>
                        <div className="mt-3 mx-3">
                            <div className="mt-4">
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="name-simple">Full Name</InputLabel>
                                    <Input id="name-simple" required className="input" type="text" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                </FormControl>
                            </div>
                            <div className="mt-4">
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="name-simple">Email</InputLabel>
                                    <Input id="name-simple" required className="input" type="email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                </FormControl>
                            </div>
                            <div className="mt-4">
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="password-input">Password</InputLabel>
                                    <Input id="password-input" required type="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                </FormControl>
                            </div>
                            <div className="mt-4">
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="name-simple">Confirm Password</InputLabel>
                                    <Input id="password-input" required className="input" type="password" value={this.state.cPassword} onChange={(e) => { this.setState({ cPassword: e.target.value }) }} />
                                </FormControl>
                            </div>
                            <div className="mr-3 mt-3 d-flex flex-row justify-content-between">
                                <h5 className="pointer-cursor" onClick={this.toLog}>Need Login?</h5>
                                <Button variant="contained" type="submit" color="primary" className={classes.button}>
                                    Register
                            </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


}



Register.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Register)
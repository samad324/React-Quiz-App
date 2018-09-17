import React, { Component } from 'react';
import '../../App.css';
import '../../bootstrap.min.css';
import './ViewQuiz.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Firebase from '../../firebase/firebase'
import swal from 'sweetalert';


const styles = theme => ({
    formControl: {
        width: "100%",
    },
    button: {
        margin: theme.spacing.unit,
    }
});


class ViewQuiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quizData: this.props.data,
            input: ''
        }
        console.log(this.props.data)
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps ", nextProps.data)
        this.setState({ quizData: nextProps.data })
    }


    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    };

    startQuiz = () => {
        const { key } = this.state
        const { stQuiz } = this.props

        stQuiz(key)
    }

    render() {
        const { classes } = this.props;
        const { quizData } = this.state;
        return (
            <div className="container mt-5 w-100">
                <h2>{quizData.title}</h2>
                <div className="d-flex flex-row justify-content-between">
                    <h5 className="m-3">Total Marks : {quizData.totalMarks}</h5>
                    <h5 className="m-3">Total Questions : {quizData.totalQuestions}</h5>
                </div>
                <div className="w-100 mt-5">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-simple">Product Key</InputLabel>
                        <Input id="name-simple" required className="input" type="email" value={this.state.email} onChange={(e) => { this.setState({ key: e.target.value }) }} />
                    </FormControl>
                </div>
                <div className="mt-4 float-right">
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.startQuiz}>
                        Verify
                    </Button>
                </div>
            </div>
        )
    }

}

ViewQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ViewQuiz)
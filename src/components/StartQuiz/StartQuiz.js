import React, { Component } from 'react';
import '../../App.css'
import '../../bootstrap.min.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class StartQuiz extends Component {
    constructor(props) {
        super(props)
        const { quizData, no } = this.props
        this.state = {
            title: quizData.title,
            questions: quizData.questions,
            noOfQuestion: no,
            answer: ""
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ noOfQuestion: nextProps.no })
    }

    handleChange = event => {
        this.setState({ answer: event.target.value });
    };

    next = () => {
        const { answer } = this.state;
        const { nextQuestion } = this.props
        nextQuestion(answer)
    }

    render() {
        const { classes } = this.props
        const { title, noOfQuestion, questions } = this.state
        const currentQ = questions[noOfQuestion]
        return (
            <div className="container mt-5">
                <h3>{title}</h3>
                <h5 className="text-right mr-3 mt-2">Question No : {noOfQuestion + 1}</h5>
                <h5 className="mt-3"> Q : {currentQ.question}</h5>
                <div>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="answers"
                            name="gender1"
                            className={classes.group}
                            value={this.state.answer}
                            onChange={this.handleChange}
                        >
                            {currentQ.answers.map(item => {
                                return <FormControlLabel key={item + "123444"} value={item} control={<Radio color="primary" />} label={item} />
                            })}
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="mt-3 mr-4 float-right">
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.next}>
                        Next
                    </Button>
                </div>
            </div>
        )
    }
}

StartQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StartQuiz)
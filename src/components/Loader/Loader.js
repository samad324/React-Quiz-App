import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../../bootstrap.min.css"


const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class Loader extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { classes } = this.props;
        return (
            <div className="container">
                <div className="d-flex flex-row justify-content-center align-items-center mt-4">
                    <div className="align-self-center mt-5">
                        <CircularProgress className={classes.progress} size={100} thickness={7} />
                    </div>
                </div>
            </div>
        );
    }
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
import React, { Component } from 'react';
import '../../App.css';
import '../../bootstrap.min.css';
import './Quizes.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BlurCircular from '@material-ui/icons/BlurOn';
import Help from '@material-ui/icons/Help';
import Firebase from '../../firebase/firebase'
import swal from 'sweetalert';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});


class Quizes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            HTMLOpen: false,
            cssOpen : false,
            jsOpen : false
        }

    }

    handleHTML = () => {
        this.setState(state => ({ HTMLOpen: !state.HTMLOpen }));
    };
    handleCss = () => {
        this.setState(state => ({ cssOpen : !state.cssOpen }));
    };
    handleJs = () => {
        this.setState(state => ({ jsOpen: !state.jsOpen }));
    };

    showQuiz = (type , no) => {
        const { quiz } = this.props;
        quiz(type , no)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit={this.RegisterFr}>
                    <div className="container mt-5">
                        <h2 className="mt-3 ml-2">All Quizes</h2>
                        <div className="mt-3 mx-3">
                            {/* list */}

                            <div className={[classes.root, "w-100"]}>
                                <List component="nav">
                                    <ListItem button onClick={this.handleHTML}>
                                        <ListItemIcon>
                                            <Help />
                                        </ListItemIcon>
                                        <ListItemText inset primary="HTML Quizes" />
                                        {this.state.HTMLOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.HTMLOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"htmlQuiz" , "Quiz_1" )} >
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 1" />
                                            </ListItem>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"htmlQuiz" , "Quiz_2" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 2" />
                                            </ListItem>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"htmlQuiz" , "Quiz_3" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 3" />
                                            </ListItem>
                                        </List>
                                    </Collapse>

                                    <ListItem button onClick={this.handleCss}>
                                        <ListItemIcon>
                                            <Help />
                                        </ListItemIcon>
                                        <ListItemText inset primary="CSS Quizes" />
                                        {this.state.cssOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.cssOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"cssQuiz" , "Quiz_1" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 1" />
                                            </ListItem>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"cssQuiz" , "Quiz_2" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 2" />
                                            </ListItem>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"cssQuiz" , "Quiz_3" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 3" />
                                            </ListItem>
                                        </List>
                                    </Collapse>

                                    <ListItem button onClick={this.handleJs}>
                                        <ListItemIcon>
                                            <Help />
                                        </ListItemIcon>
                                        <ListItemText inset primary="JavaScript Quizes" />
                                        {this.state.jsOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.jsOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"jsQuiz" , "Quiz_1" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 1" />
                                            </ListItem>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"jsQuiz" , "Quiz_2" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 2" />
                                            </ListItem>
                                            <ListItem button className={classes.nested} onClick={this.showQuiz.bind(this,"jsQuiz" , "Quiz_3" )}>
                                                <ListItemIcon>
                                                    <BlurCircular />
                                                </ListItemIcon>
                                                <ListItemText inset primary="Quiz 3" />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                </List>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        );
    }


}



Quizes.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Quizes)
import React, { Component } from 'react';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
import HomeComp from './HomeComp';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Contact from './Contact';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchPromos, fetchComments } from '../Redux/ActionCreator'
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) }
})

class Main extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {

        const HomePage = () => {
            return (
                <HomeComp
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                    // dishesLoading={this.props.dishes.isLoading}
                    // dishesErrMess={this.props.dishes.errMess}
                />
            )
        }

        const DishwithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    addComment={this.props.addComment} />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/aboutus" component={() => <About leader={this.props.leaders} />} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishwithId} />
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/> } />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

// <Menu Dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
// <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />

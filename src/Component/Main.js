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

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

class Main extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const HomePage = () => {
            return (
                <HomeComp
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishwithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/aboutus" component={() => <About leader={this.props.leaders} />} />
                    <Route exact path="/menu" component={() => <Menu Dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishwithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));

// <Menu Dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
// <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />

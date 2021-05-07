import React from 'react';
import {View} from 'react-native';
import StarRating from 'react-native-star-rating';
export default class Priority extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingDefault: 0,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      ratingDefault: rating,
    });
  }
  componentDidMount() {
    this.setState({
      ratingDefault: this.props.priority,
    });
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <StarRating
          starStyle={{marginLeft: 2.5}}
          disabled={false}
          maxStars={3}
          starSize={20}
          fullStarColor="#ffc107"
          emptyStarColor="#ffc107"
          rating={this.state.ratingDefault}
          selectedStar={rating => this.onStarRatingPress(rating)}
        />
      </View>
    );
  }
}

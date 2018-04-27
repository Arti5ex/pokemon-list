import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import * as category from '../actions/categoryActions';

@connect((store) => {
  return{
    selectedCategory: store.category.selectedCategory
  };
})

export default class TypeTag extends React.Component {

  selectType() {
    console.log(this.props.category)
    this.props.dispatch(category.selectCategory(this.props.category.name));
  }

  render() {
    const isSelected = this.props.selectedCategory == this.props.category.name ? true : false;
    
    const tagClass = isSelected ? 'category-tag-button selected' : 'category-tag-button';

    return (
      <div className={tagClass} onClick={(e) => this.selectType()}>
        <span>{this.props.category.name}</span>
      </div>
    )
  }
}
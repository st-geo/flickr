import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
// import cloneDeep from 'lodash/cloneDeep';

import Item from './Item/Item.js';

import classes from './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: null,
      hasMoreItems: true
    }
  }

  loadItems() {

    axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1')
      .then((response) => {
        if (response) {
          let items = [];
          if (this.state.items !== null){
            this.state.items.map((item) => {
              items.push(item);
              return null;
            })
          }

          response.data.items.map((item) => {
            items.push(item);
            return null;
          });

          this.setState({
            items: items
          });

          return null;
        }
      });
  }



  render() {
    const loader = <div className="loader">Loading ...</div>;

    var items = [];
    if (this.state.items !== null) {
      this.state.items.map((item, key) => {
        items.push(
          <Item
            key={key}
            src={item.media.m}
            title={item.title}
            author={item.author}
            description={item.description}
            tags={item.tags}
          />
        );
        return null;
      });
    }

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}>

        <div className={classes.mainDiv}>
          {items}
        </div>
      </InfiniteScroll>
    );
  }
}

export default App;
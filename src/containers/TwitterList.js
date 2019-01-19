import React, { Component } from 'react';
import {
  List, message, Spin,
} from 'antd';

import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

import './TwitterList.css'
import TwitterCard from './TwitterCard';
import {withRouter} from "react-router-dom";


const twitterApi = 'http://127.0.0.1:8888/search/tweets';

class TwitterList extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    url: '/NASA/20/0',
  }

  componentDidMount() {
    this.fetchData((res) => {
      this.setState({
        data: res.statuses,
      });
    });
  }

  fetchData = (callback) => {

    reqwest({
      url: twitterApi + this.state.url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',

      success: (res) => {
        console.log(res);
        callback(res);
      },
    });

  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (!this.state.url) {
      message.warning('List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.statuses);

      var nextUrl;

      if (res.search_metadata.next_results) {

        var searchMetaData = JSON.parse('{"' + decodeURI(res.search_metadata.next_results.replace('?', '').replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');

        console.log(searchMetaData);

        nextUrl = '/' + searchMetaData.q + '/' + searchMetaData.count + '/' + searchMetaData.max_id;

        console.log(nextUrl);

      }

      this.setState({
        data,
        loading: false,
        url: nextUrl,
      });
    });
  }

  render() {
    return (
      <div className="infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={true}
        >
          <List
            dataSource={this.state.data}
            itemLayout="vertical"
            renderItem={item => (
            
                 <TwitterCard
                profile_image_url={item.profile_image_url}
                name={item.name}
                text={item.text}
                media={item.media}
                click={()=>{
                  this.props.history.push({
                    pathname:'/twitterDetail',
                    state:item,
                  });
                }}/>
          
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default withRouter(TwitterList);
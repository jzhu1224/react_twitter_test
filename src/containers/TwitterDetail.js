import React from 'react';
import Aux from '../hoc/Aux';
import TwitterCard from './TwitterCard';
import './TwitterDetail.css'

const TwitterDetail = (item) => {
    return (
        <Aux>
            <div className="content ant-list-vertical">
                <TwitterCard
                    profile_image_url={item.location.state.profile_image_url}
                    name={item.location.state.name}
                    text={item.location.state.text}
                    media={item.location.state.media}
                    created_at={item.location.state.created_at} />
            </div>
        </Aux>
    );
}

export default TwitterDetail;

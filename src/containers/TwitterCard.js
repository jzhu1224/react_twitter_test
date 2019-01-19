import React from 'react';
import {List, Avatar,} from 'antd';
import './TwitterCard.css'
import Aux from '../hoc/Aux';

const TwitterCard = (item) => {
    return (
        <Aux>
            <List.Item
            className="card"
                onClick={item.click}
                key={item.id}
                extra={<div>{item.created_at}</div>}
                >
                <List.Item.Meta
                    avatar={<Avatar src={item.profile_image_url} />}
                    title={item.name}
                />
                <div>{item.text}</div>
                <div className="image">{item.media ?
                    item.media.map((image) => {
                        return <img key={image.id} width={image.sizes.thumb.w} height={image.sizes.thumb.h} alt="logo" src={image.media_url} />
                    }) : ''}</div>
            </List.Item>
        </Aux>
    );
}

export default TwitterCard;
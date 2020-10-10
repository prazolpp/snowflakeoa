import React, { Component, Fragment } from 'react';
import './Thumbs.css';

const Thumbs = ({ items, currentIndex, selectedCatalog }) => {
    
    const onImageSelect = (index) => {
        return () => { 
            selectedCatalog(index);
        }
    }
    
    return (
        <div>
            {items.map((catalog,idx) => (
                <span className="catalog item"  onClick={onImageSelect(idx)} className={'thumb-select'} id={idx} key={idx} data-testid={'thumb_outer_'+idx}>
                    <span className={"thumb-outer " + (idx == currentIndex ? 'thumb-selected' : ' ')} data-testid={'thumb_'+idx}>
                        <span className="thumb" id={idx} style={{ backgroundImage: 'url('+ catalog.thumb + ')'}} data-testid={'thumb_img_'+idx} />
                    </span>
                </span>
            ))}
        </div>
    );
}

export default Thumbs;

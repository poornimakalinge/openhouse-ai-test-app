import React from 'react';
import './index.scss';
import loader from '../../../images/loading.svg';

const Loader = () => {

    return (
        <div className='wrapper'>
            <img src={loader}  className="spinning-loader loader"/>
        </div>
    );
};


export default React.memo(Loader);

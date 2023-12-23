import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Loader from '../components/loader';
import Communities from '../pages/communities';

const Router = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <Routes>
                <Route exact path="/" element={<Communities />} />
            </Routes>
        </React.Suspense>
    );
};

export default React.memo(Router);
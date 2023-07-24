import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { authRoutes } from '../Routes';

const AppRouter = () => {
    const isAuth = true;
    const authRoutesWithKeys = authRoutes.map(({ path, Component }, index) => (
        <Route key={`authRoute-${index}`} path={path} element={Component} exact />
    ));

    return (
        <Routes>
            {isAuth === true && authRoutesWithKeys}
        </Routes>
    );
};

export default AppRouter;
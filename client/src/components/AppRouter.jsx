import React, { useContext } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import { authRoutes, notAuthRoutes, publicRoutes } from '../routes';
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE } from '../utils/const';
import { Context } from '../index'
import { observer } from 'mobx-react-lite';


const AppRouter = observer(() => {
    const { user } = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {!user.isAuth && notAuthRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={ADVERTISMENTS_AND_SUMMARIES_ROUTE} />
        </Switch>
    );
});

export default AppRouter;
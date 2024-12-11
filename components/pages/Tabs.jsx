import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { analyticsOutline, calculatorOutline, timeOutline, helpCircle, heartHalf, checkboxOutline } from 'ionicons/icons';

import Home from './Emergencies';
import Lists from './Lists';
import Reports from './Reports'
import ListDetail from './ListDetail';
import Calendar from './Calendar';
import Converter from './Converter';
import Login from './Login';
import Settings from './Settings';
import Account from './Account';
import Assets from './Assets';
import Tasks from './Tasks';
import IndividualShift from './IndividualShift';
import IndividualLog from './IndividualLog';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/converter">
          <Converter />
        </Route>
        <Route exact path="/tabs/reports">
          <Reports />
        </Route>
        <Route exact path="/tabs/lists/:listId">
          <ListDetail />
        </Route>
        <Route exact path="/tabs/tasks">
          <Tasks />
        </Route>
        <Route exact path="/tabs/emergencies">
          <Home />
        </Route>
        <Route path="/tabs/emergencies/log/:id">
          <IndividualLog />
        </Route>
        <Route exact path="/tabs/calendar">
          <Calendar />
        </Route>
        <Route path="/tabs/calendar/shift/:id">
          <IndividualShift />
        </Route>
        <Route exact path="/tabs/help">
          <Assets />
        </Route>
        <Route exact path="/tabs/settings">
          <Settings />
        </Route>
        <Route exact path="/tabs/account">
          <Account />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/login" />
        </Route>
        <Route exact path="/tabs/login">
          <Login />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/converter">
          <IonIcon icon={calculatorOutline}/>
          <IonLabel>Converter</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/reports">
          <IonIcon icon={analyticsOutline} />
          <IonLabel>Reports</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/tasks">
          <IonIcon icon={checkboxOutline} />
          <IonLabel>My Tasks</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/emergencies">
          <IonIcon icon={heartHalf} />
          <IonLabel>Emergency Logs</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/tabs/calendar">
          <IonIcon icon={timeOutline} />
          <IonLabel>My Shifts</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab6" href="/tabs/help">
          <IonIcon icon={helpCircle} />
          <IonLabel>Help</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
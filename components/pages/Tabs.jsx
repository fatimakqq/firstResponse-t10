import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { analyticsOutline, calculatorOutline, calendarOutline, helpCircle, heartHalf, checkboxOutline } from 'ionicons/icons';


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

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/converter" render={() => <Converter />} exact={true} />
        <Route path="/tabs/reports" render={() => <Reports />} exact={true} />
        <Route path="/tabs/lists/:listId" render={() => <ListDetail />} exact={true} />
        <Route path="/tabs/tasks" render={() => <Tasks />} exact={true} />
        <Route path="/tabs/emergencies" render={() => <Home />} exact={true} />
        <Route path="/tabs/calendar" render={() => <Calendar />} exact={true} />
        <Route path="/tabs/help" render={() => <Assets />} exact={true} />
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />
        <Route path="/tabs/account" render={() => <Account />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/login" />} exact={true} />
        <Route path="/tabs/login" render={() => <Login />} exact={true} />

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
          <IonIcon icon={calendarOutline} />
          <IonLabel>Calendar</IonLabel>
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

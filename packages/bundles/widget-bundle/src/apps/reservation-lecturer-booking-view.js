import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-reservation-lecturer-booking-view/src/main'

appFactory.registerAppInRegistry(app.name, app.init)

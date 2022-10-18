import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-personal-dms/src/main'

appFactory.registerAppInRegistry(app.name, app.init)

import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-sso-login/src/main'

appFactory.registerAppInRegistry(app.name, app.init)

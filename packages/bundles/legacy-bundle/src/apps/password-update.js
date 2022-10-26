import {appFactory} from 'tocco-app-extensions'
import {appPasswordUpdate} from 'tocco-login/src/main'

appFactory.registerAppInRegistry(appPasswordUpdate.name, appPasswordUpdate.init)

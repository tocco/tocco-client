const nice2 = window.nice2
const Ext = window.Ext

nice2.app.tabwindowmgr.NullTabWindowMgr = function() {
}
nice2.app.tabwindowmgr.NullTabWindowMgr.prototype = {
  add: Ext.emptyFn,
  remove: Ext.emptyFn,
  removeFromAll: Ext.emptyFn,
  getTab: Ext.emptyFn
}

nice2.app.NewClientMockGui = function() {
  nice2.app.NewClientMockGui.superclass.constructor.call(this)
  this.notifier = new nice2.app.notification.BackendNotifier({gui: this})
  this._tabWindowMgr = new nice2.app.tabwindowmgr.NullTabWindowMgr()
  this.tabPanel = {
    getActiveTab: function() {
      return {
        id: undefined
      }
    }
  }
}
Ext.extend(nice2.app.NewClientMockGui, nice2.app.AbstractGui, {})

nice2.modules.entityexplorer.NewClientLegacyActionsBrowsePanel = function(module) {
  this.module = module
  this._cardContainer = {
    getBox: function() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }
}
Ext.extend(nice2.modules.entityexplorer.NewClientLegacyActionsBrowsePanel, nice2.modules.AbstractPanel, {
  /**
   * Shows the create form as modal-window.
   *
   * <p>Note that there may be multiple, as layers, on top of each other. This is the case when
   * creating one shows a form where a remote-field is used where the desired entry does not
   * exist yet.
   *
   * @param {Ext.form.Field} invokingField The field that initiates this. Required for setting the newly created
   *                         entity in when done so that the initiating form can continue.
   * @param {String} entityName eg "Address".
   */
  createEntityFromRelationField: function(invokingField, entityName) {
    nice2.Preconditions.ensureClass(invokingField, Ext.form.Field)
    nice2.Preconditions.nonEmptyString(entityName)

    const me = this
    let fieldInfoArr, currentEntityVersion, entityDescriptor

    let modalCreatePanel // the panel for the create-entity window.

    const fail = function() {
      if (modalCreatePanel) modalCreatePanel.closeWindow()
      modalCreatePanel = null
    }

    const taskList = new nice2.util.TaskList()
    taskList.await(function(hasFailed) {
      if (hasFailed) {
        taskList.logErrorInfo()
        fail()
      } else {
        try {
          modalCreatePanel.bindDataToForm(fieldInfoArr, [currentEntityVersion, entityDescriptor])

          // put invokingField into the CreateFromRelationStoreAction so that it can set the new entity when created.
          modalCreatePanel.setInvokingField(invokingField)
        } catch (e) {
          fail()
          // eslint-disable-next-line
          log(e, "error", me)
        }
      }
    }, this)

    // eslint-disable-next-line
    taskList.add(new (Ext.extend(nice2.exec.Invokable, {
      invoke: function(invokable) {
        modalCreatePanel = new nice2.modules.entityexplorer.CreateFromRelationPanel(
          me.module.getBrowseModule(), entityName
        )
        modalCreatePanel.init()
        modalCreatePanel.onStateEvent({
          name: 'initialized',
          func: function() {
            const extPanelWithFormInside = modalCreatePanel.build()
            modalCreatePanel.onEntity(entityName, 'create')
            modalCreatePanel.showWindow(
              me, window.getText('entities.' + entityName), [extPanelWithFormInside], modalCreatePanel
            )
            invokable.doneQueue()
          }
        })
        modalCreatePanel.onStateEvent('initFailed', function(exOrSomething) {
          invokable.errorQueue(exOrSomething)
        }, this)
      }
    })))

    // Load the default values from the server (always).
    const resultReceiver = function(result) {
      fieldInfoArr = result // FieldInfo[]
    }
    taskList.add(nice2.netui.FormUtil.getTaskToLoadDefaultValues({
      formName: me.module.getFormName(entityName) || entityName,
      scope: 'create',
      defaultValueOverrides: null
    }, resultReceiver))

    taskList.run()
    return true
  },

  /**
   * Creates a tab-based modal window. The content of the tab gets locked (disabled), but other tabs and
   * the main menu remain active. A tab switch hides this window, and when coming back it is shown again.
   *
   * @see Ext.getModalWindowProps()
   * @return {Ext.ViewportWindow}
   * @param props
   */
  _makeTabModalWindow: function(props) {
    if (!props.items) throw new nice2.ex.IllegalArgumentException("Must pass 'items'!")
    if (props.modal) {
      throw new nice2.ex.IllegalArgumentException('Cannot be modal, makes no sense, use Ext.getModalWindowProps()!')
    }
    const currentTabId = props.tabId
    // make sure window is not larger than area in which it gets rendered:
    const box = this._cardContainer.getBox()
    // need this because box size is (0,0) if tab has been switched in the meantime
    // (lastSize should contain a decent value)
    const boxHeight = box.height !== 0 ? box.height : this._cardContainer.lastSize.height
    const boxWidth = box.width !== 0 ? box.width : this._cardContainer.lastSize.width
    props.height = props.height ? props.height : parseInt(0.7 * box.height)
    props.width = props.width ? props.width : parseInt(0.6 * box.width)
    props.height = (boxHeight < props.height) ? boxHeight : props.height
    props.width = (boxWidth < props.width) ? boxWidth : props.width

    // merge in some defaults:
    Ext.applyIf(props, {
      resizable: true,
      minHeight: 100,
      minWidth: 200,
      closeAction: 'close',
      autoScroll: false,
      modal: false,
      layout: 'fit'
    })

    if (props.autoHeight === true) {
      props.autoScroll = true
      if (props.layout === 'fit') {
        delete props.layout
      }
    }

    const win = new Ext.Window(props)

    const setMaxHeightAndCenter = (function(me) {
      return function(win) {
        if (win.isVisible()) {
          const box = me._cardContainer.getBox()
          const boxHeight = box.height !== 0 ? box.height : me._cardContainer.lastSize.height
          if (win.getHeight() > boxHeight) {
            // necessary to set internal fields. otherwise setHeight() is ignored.
            win.autoHeight = false
            win.deferHeight = false

            win.setHeight(boxHeight)
          }
          win.center()
        }
      }
    })(this)

    win.on('afterrender', function(win) {
      setMaxHeightAndCenter(win)

      window.addResizeListener(win.el.dom, function() {
        setMaxHeightAndCenter(win)
      })
      Ext.EventManager.onWindowResize(function() {
        setMaxHeightAndCenter(win)
      })
    }, this)

    const show = function() {
      window.app.getGui().getTabWindowMgr().add(win)
      if (this._modalWinCounter === 0) {
        this.module.contentContainer.disableContent()
      }
      this._modalWinCounter++
    }
    const hide = function() {
      window.app.getGui().getTabWindowMgr().removeFromAll(win)
      this._modalWinCounter--
      if (this._modalWinCounter === 0) {
        this.module.contentContainer.enableContent()
      }
    }
    win.on('beforeshow', function() {
      if (currentTabId) {
        // make sure the modal action window is displayed in the correct tab (i.e. where the action was launched)
        window.app.getGui().tabPanel.setActiveTab(currentTabId)
      }
    })
    // to mask the background of this tab:
    win.on('show', show, this)
    // if close or hide is used depends if the window is to be re-used instead of re-created. both cases exist.
    // win.on('close', hide, this) //disabled, any window seems to get hidden before it gets "closed" -uw
    win.on('hide', hide, this)

    return win
  }
})

nice2.modules.NewClientLegacyActionsModule = function(config) {
  nice2.modules.NewClientLegacyActionsModule.superclass.constructor.call(this)
  this.entityName = nice2.Property.requiredNonEmptyProperty(config, 'entityName', 'string')
  this.formName = config.formName
  this.formNames = config.formNames || {}
  this.guiHandler = null
  this.browsePanel = null
}
Ext.extend(nice2.modules.NewClientLegacyActionsModule, nice2.modules.AbstractModule, {
  init: function() {
    this.guiHandler = new window.nice2.netui.GuiHandler(
      this,
      window.nice2.netui.GuiLoader.getInstance(),
      null,
      new window.nice2.netui.Builder(window.BuilderFactory)
    )

    this.browsePanel = new window.nice2.modules.entityexplorer.NewClientLegacyActionsBrowsePanel(this)

    this.fireStateEvent('initialized', this)
  },

  render: function() {
    this.fireStateEvent('rendered', this)
  },

  getFormName: function(entityName) {
    entityName = entityName || this.entityName
    let formName = null
    if (this.entityName === entityName) {
      formName = this.formName
    }
    if (this.formNames[entityName]) {
      formName = this.formNames[entityName]
    }
    return formName
  },

  getBrowseModule: function() {
    return this.browsePanel
  }
})

nice2.app.NewClientLegacyActionsApp = function() {
  nice2.app.NewClientLegacyActionsApp.superclass.constructor.call(this)
  this._dataRegistry = new nice2.data.dataregistry.SimpleDataRegistry()
  this._gui = new nice2.app.NewClientMockGui()
  this._uiPreferences = new nice2.app.UiPreferences()
}
Ext.extend(nice2.app.NewClientLegacyActionsApp, nice2.app.AbstractApp, {
  getType: function() {
    return 'legacy-actions'
  },

  /**
   * @implement
   */
  _loadEnv: function(cb, jsonData) {
    this.setLocale(nice2.i18n.Locale.parse(jsonData.locale))
    const self = this

    this._uiPreferences = new nice2.app.UiPreferences()
    const taskList = new nice2.util.TaskList()
    // eslint-disable-next-line
    taskList.add(new (Ext.extend(nice2.exec.Invokable, {
      invoke: function(invokable) {
        self._uiPreferences.reload(nice2.CallbackFactory.create(
          function() {
            invokable.doneQueue()
          },
          function(exOrInfoObj) {
            invokable.doneQueue()
          }
        ))
      }
    })))

    // eslint-disable-next-line
    taskList.add(new (Ext.extend(nice2.exec.Invokable, {
      invoke: function(invokable) {
        const cb = nice2.CallbackFactory.create(
          function() {
            invokable.doneQueue()
          },
          function(exOrInfoObj) {
            invokable.doneQueue()
          }
        )
        Ext.loadLocale(self.getLocale())
        nice2.util.TextResources.ensure(self.getLocale(), cb)
      }
    })))
    taskList.await(function(failure) {
      if (failure) {
        cb.handleFailure()
      } else {
        cb.handleSuccess()
      }
    })
    taskList.run()

    return true
  },

  getGui: function() {
    return this._gui
  },

  getUiPreferences: function() {
    return this._uiPreferences
  }
})

window.app = new nice2.app.NewClientLegacyActionsApp()
window.app.loadEnv(nice2.CallbackFactory.create(
  function() {
    // todo
  },
  function(exOrInfoObj) {
    // todo
  }
))

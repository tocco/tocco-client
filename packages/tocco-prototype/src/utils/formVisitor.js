export class Visitor {
  enterForm(component) {
  }

  leaveForm(component) {
  }

  visitAction(component) {
  }

  enterHorizontalBox(component) {
  }

  leaveHorizontalBox(component) {
  }

  enterVerticalBox(component) {
  }

  leaveVerticalBox(component) {
  }

  visitField(component) {
  }
}

class Component {
  constructor(cmp) {
    this.cmp = cmp;
  }

  accept(visitor) {
    switch (this.cmp.type) {
      case 'ch.tocco.nice2.model.form.components.Form':
        visitor.enterForm(this.cmp)
        this.visitChildren(visitor, this.cmp.children)
        visitor.leaveForm(this.cmp)
        break
      case 'ch.tocco.nice2.model.form.components.action.Action':
        visitor.visitAction(this.cmp)
        break
      case 'ch.tocco.nice2.model.form.components.layout.HorizontalBox':
        visitor.enterHorizontalBox(this.cmp)
        this.visitChildren(visitor, this.cmp.children)
        visitor.leaveHorizontalBox(this.cmp)
        break
      case 'ch.tocco.nice2.model.form.components.layout.VerticalBox':
        visitor.enterVerticalBox(this.cmp)
        this.visitChildren(visitor, this.cmp.children)
        visitor.leaveVerticalBox(this.cmp)
        break
      case 'ch.tocco.nice2.model.form.components.simple.NumberField':
      case 'ch.tocco.nice2.model.form.components.simple.TextField':
      case 'ch.tocco.nice2.model.form.components.simple.SingleSelectBox':
      case 'ch.tocco.nice2.model.form.components.simple.TextArea':
      case 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox':
      case 'ch.tocco.nice2.model.form.components.simple.RemoteField':
      case 'ch.tocco.nice2.model.form.components.simple.MultiRemoteField':
      case 'ch.tocco.nice2.model.form.components.simple.DurationField':
      case 'ch.tocco.nice2.model.form.components.simple.DateField':
      case 'ch.tocco.nice2.model.form.components.simple.DatetimeField':
      case 'ch.tocco.nice2.model.form.components.simple.Checkbox':
      case 'ch.tocco.nice2.model.form.components.simple.MoneyAmountField':
      case 'ch.tocco.nice2.model.form.components.composite.LocationField':
      case 'ch.tocco.nice2.optional.geolocation.impl.gui.LongitudeField':
      case 'ch.tocco.nice2.optional.geolocation.impl.gui.LatitudeField':
      case 'ch.tocco.nice2.model.form.components.simple.DocumentField':
      case 'ch.tocco.nice2.model.form.components.simple.EmailField':
      case 'ch.tocco.nice2.model.form.components.simple.UrlField':
      case 'ch.tocco.nice2.model.form.components.simple.DescriptionField':
      case 'ch.tocco.nice2.model.form.components.simple.BirthDateField':
      case 'ch.tocco.nice2.model.form.components.simple.PhoneField':
      case 'ch.tocco.nice2.model.form.components.simple.HtmlField':
      case 'ch.tocco.nice2.model.form.components.simple.CodeField':
        visitor.visitField(this.cmp)
        break
      default:
        if (console) console.error('unknown type ' + this.cmp.type)
    }
  }

  visitChildren(visitor, children) {
    if (children) {
      children.forEach(child => {
        new Component(child).accept(visitor)
      })
    }
  }
}

export function visit(form, visitor) {
  const component = new Component(form)
  component.accept(visitor)
}

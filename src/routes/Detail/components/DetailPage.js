import React from 'react'
import { Link } from 'react-router';
import classNames from 'classnames'
import DetailForm from '../../../components/DetailForm'
import classes from './DetailPage.scss'

class DetailPage extends React.Component {

  componentWillMount() {
    this.props.fetchForm(this.props.formName)
    this.props.fetchEntity(this.props.entityModel, this.props.entityKey)
  }

  render() {
    if (this.props.detail.loading === true || !this.props.forms[this.props.formName]) {
      return (
        <div className={classes.DetailPage}>
          <Link to="/">Zurück zur Übersicht</Link>
          <div>Daten werden geladen</div>
        </div>
      )
    }
    if (this.props.detail.failure === true) {
      return (
        <div className={classes.DetailPage}>
          <Link to="/">Zurück zur Übersicht</Link>
          <div>Daten konnten nicht geladen werden</div>
        </div>
      )
    }

    return (
      <div className={classes.DetailPage}>
        <Link to="/">Zurück zur Übersicht</Link>
        <DetailForm data={this.props.detail.data} form={this.props.forms[this.props.formName]}/>
      </div>
    )
  }
}

DetailPage.propTypes = {
  detail:  React.PropTypes.object.isRequired,
  entityModel: React.PropTypes.string.isRequired,
  entityKey: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
  fetchEntity: React.PropTypes.func.isRequired,
  fetchForm: React.PropTypes.func.isRequired,
  forms: React.PropTypes.object.isRequired,
}


export default DetailPage

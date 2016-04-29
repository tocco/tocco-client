import React from 'react'
import classNames from 'classnames'
import DetailForm from '../../../components/DetailForm'
import classes from './DetailPage.scss'

class DetailPage extends React.Component {

  componentWillMount() {
    this.props.fetchForm('Event_detail')
    this.props.fetchEvent(this.props.eventKey)
  }

  render() {
    if (this.props.detail.loading === true || !this.props.forms['Event_detail']) {
      return (
        <div className={classes.DetailPage}>
          <div>Daten werden geladen</div>
        </div>
      )
    }
    if (this.props.detail.failure === true) {
      return (
        <div className={classes.DetailPage}>
          <div>Daten konnten nicht geladen werden</div>
        </div>
      )
    }

    return (
      <div className={classes.DetailPage}>
        <DetailForm data={this.props.detail.data} form={this.props.forms['Event_detail']}/>
      </div>
    )
  }
}

DetailPage.propTypes = {
  detail:  React.PropTypes.object.isRequired,
  eventKey: React.PropTypes.string.isRequired,
  fetchEvent: React.PropTypes.func.isRequired,
  fetchForm: React.PropTypes.func.isRequired,
  forms: React.PropTypes.object.isRequired,
}


export default DetailPage

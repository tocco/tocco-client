import React from 'react'
import classNames from 'classnames'
import classes from './DetailPage.scss'

const Field = props => (
  <div className="form-group">
    <label className="control-label col-sm-3">{props.data.key}:</label>
    <div className="col-sm-7">
      <p className="form-control-static">{typeof props.data.value !== 'object' ? props.data.value : null}</p>
    </div>
  </div>
)

class DetailPage extends React.Component {

  componentWillMount() {
    this.props.fetchEvent(this.props.eventKey)
  }

  render() {
    if (this.props.detail.loading === true) {
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
      <div className={classNames(classes.DetailPage, 'form-horizontal')}>
        {Object.keys(this.props.detail.data.fields).map(key => {
          const field = this.props.detail.data.fields[key]
          const data = Object.assign({}, field, {key})
          return <Field key={key} data={data}/>
        })}
      </div>
    )
  }
}

DetailPage.propTypes = {
  detail:  React.PropTypes.object.isRequired,
  eventKey: React.PropTypes.string.isRequired,
  fetchEvent: React.PropTypes.func.isRequired
}


export default DetailPage

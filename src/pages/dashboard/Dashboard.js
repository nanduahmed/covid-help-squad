import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'components/Button'
import { actions } from 'slices/app.slice'
// import { firestore } from 'utils/firebase'
import { path } from 'utils/const'
import { useHistory } from 'react-router-dom'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.app)
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.greeting}>{`As salamo alaikum👋, ${
          me?.fullName || 'User'
        }`}</h3>
        <h1 className={styles.title}>We are here to help</h1>
        <Button
          label="Register"
          className={`btn-purple-outline mt-4 ${styles.logout}`}
          onClick={() => {
            history.push(path.registerHelp)
          }}
        />

        <Button
          label="Logout"
          className={`btn-purple-outline mt-4 ${styles.logout}`}
          onClick={() => dispatch(actions.logout())}
        />
      </div>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard

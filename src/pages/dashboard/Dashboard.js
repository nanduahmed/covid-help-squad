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

  const canViewAllRequests =
    me.email === 'hazari.qawi@gmail.com' || me.email === 'nandu.ahmed@gmail.com'

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.greeting}>{`As salamo alaikum👋, ${
          me?.fullName || 'User'
        }`}</h3>
        <h2 className={styles.title}>
          We are serving our community and located around Masjid Noor
        </h2>
        <Button
          label="Register for Food"
          className={`btn-purple-outline mt-4 ${styles.logout}`}
          onClick={() => {
            history.push(path.registerHelp)
          }}
        />
        <Button
          label="My Requests"
          className={`btn-purple-outline mt-4 ${styles.logout}`}
          onClick={() => {
            history.push(path.myRequests)
          }}
        />

        {canViewAllRequests && (
          <Button
            label="All Requests"
            className={`btn-purple-outline mt-4 ${styles.logout}`}
            onClick={() => {
              history.push(path.allRequests)
            }}
          />
        )}

        <Button
          label="Logout"
          className={`btn-purple-outline mt-4 ${styles.logout}`}
          onClick={() => dispatch(actions.logout())}
        />
        <a href="whatsapp://send?text=Assalamo alaikum&phone=++19253258924">
          Contact
        </a>
      </div>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard

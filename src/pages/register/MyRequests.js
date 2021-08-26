import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { firestore } from 'utils/firebase'

import styles from './register.module.scss'

const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const { me } = useSelector((state) => state.app)

  useEffect(() => {
    setRequests({ data: 'ddd' })
    const requestsRef = firestore.collection('requests')
    const queries = requestsRef.where('email', '==', me?.email)
    const items = []
    queries
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
          const data = doc.data()
          // const item = { [doc.id]: data }
          const date = new Date(data?.time.toMillis())
          data.dateString = `${date.toLocaleDateString()} ,  ${date.toLocaleTimeString()}`
          items.push(data)
        })
        setRequests(items)
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })
    return () => {
      items.length = 0
    }
  }, [])

  return (
    <div className={styles.registerContainer}>
      <h5 className="m-5 text-light">My Requests</h5>
      {requests.length > 0 &&
        requests.map((item) => (
          <ListGroup className="mb-2">
            <ListGroupItem className="d-flex justify-content-between">
              <div className="d-flex">
                <p className="mr-3">Name</p>
                <b>{`${item?.name}`}</b>
              </div>
              <div className="d-flex">
                <p className="ml-2 mr-3">Phone</p>
                <b>{item?.phone}</b>
              </div>
            </ListGroupItem>
            <ListGroupItem className="d-flex">
              <p className="mr-3">Address</p>
              <b>{item?.address}</b>
            </ListGroupItem>
            <ListGroupItem className="d-flex">
              <p className="mr-3">Time</p>
              <b>{item?.dateString}</b>
            </ListGroupItem>
            <ListGroupItem className="d-flex">
              <p className="mr-3">Notes</p>
              <b>{item?.notes}</b>
            </ListGroupItem>
          </ListGroup>
        ))}
      {requests?.data}
    </div>
  )
}

export default MyRequests

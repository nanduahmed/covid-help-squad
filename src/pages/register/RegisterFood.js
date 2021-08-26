import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input, InputGroup, Label, Button, Alert } from 'reactstrap'
import { firestore } from 'utils/firebase'
import { useHistory } from 'react-router-dom'
import styles from './register.module.scss'
import dbStyles from '../dashboard/dashboard.module.scss'

const RegisterFood = () => {
  const history = useHistory()
  const { me } = useSelector((state) => state.app)
  const [data, setData] = useState({ name: me?.fullName, email: me?.email })
  const [error, setError] = useState('')

  const onChange = (label, value) => {
    const newD = { ...data, ...{ [label]: value } }
    setData(newD)
  }

  return (
    <div className={styles.registerContainer}>
      <h3 className={dbStyles.greeting}>{`As salamo alaikum👋, ${
        me?.fullName || 'User'
      }`}</h3>
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <Alert variant="error" isOpen={error}>
        {error}
      </Alert>
      <p className={styles.textP}>
        In shaa Allah, Your information will not be disclosed
      </p>
      <InputGroup className={styles.inputGroup}>
        <Label className={styles.textP}>Name</Label>
        <Input
          placeholder="Name"
          value={data?.name}
          onChange={(e) => {
            onChange('name', e.currentTarget.value)
          }}
        />
      </InputGroup>
      <InputGroup className={styles.inputGroup}>
        <Label className={styles.textP}>Email</Label>
        <Input
          placeholder="Email"
          value={data?.email}
          onChange={(e) => {
            onChange('email', e.currentTarget.value)
          }}
        />
      </InputGroup>
      <InputGroup className={styles.inputGroup}>
        <Label className={styles.textP}>Address</Label>

        <Input
          placeholder="Address"
          onChange={(e) => {
            onChange('address', e.currentTarget.value)
          }}
        />
      </InputGroup>
      <InputGroup className={styles.inputGroup}>
        <Label className={styles.textP}>Telephone/Mobile</Label>

        <Input
          placeholder="Telephone/Mobile"
          onChange={(e) => {
            onChange('phone', e.currentTarget.value)
          }}
        />
      </InputGroup>
      <InputGroup className={styles.inputGroup}>
        <Label className={styles.textP}>Notes</Label>
        <Input
          type="textarea"
          placeholder="Notes"
          onChange={(e) => {
            onChange('notes', e.currentTarget.value)
          }}
        />
      </InputGroup>
      <Button
        className={styles.save}
        onClick={() => {
          if (Object.keys(data).length >= 5) {
            const actualData = { ...data, ...{ time: new Date() } }
            firestore.collection('requests').doc().set(actualData)
            history.goBack()
          } else {
            setError('Please fill complete form')
          }
        }}
      >
        Save
      </Button>
    </div>
  )
}

export default RegisterFood

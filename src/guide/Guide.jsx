import React, { useState } from 'react'
import DropdownForm from './selectForm/DropdownForm'
import TextFieldForm from './textFieldForm/TextFieldForm'
import { convertToCronSyntax } from './utils/helper'
import Codebox from './codebox/Codebox'
import TzSelect from './select/TzSelect'

const Guide = () => {
  const [select, setSelect] = useState({
    min: '*',
    hour: '*',
    dom: '*',
    mon: '*',
    dow: '*'
  })

  const [timeZone, setTimeZone] = useState({
    value: 'default',
    label: 'Coordinated Universal Time (UTC)',
    id: 'default'
  })

  const [savedSelects, setSavedSelects] = useState([])

  const [openOtherTzList, setOpenOtherTzList] = useState(false)

  const handleSave = () => {
    const res = convertToCronSyntax(select)
    setSavedSelects((prevState) => {
      return [...prevState, res]
    })
  }

  const handleResetCodeBox = () => {
    setSavedSelects([])
  }

  const handleTzChange = (obj) => {
    const { subList } = obj
    if (subList === false) {
      // means utc or local
      setOpenOtherTzList(false)
      setTimeZone(obj)
    } else if (subList === true) {
      // means other clicked !
      if (openOtherTzList) {
        setOpenOtherTzList(false)
      } else {
        setOpenOtherTzList(true)
        setTimeZone({
          value: 'default',
          label: 'UTC',
          id: 'default'
        })
      }
    } else {
      setTimeZone(obj)
    }
  }

  const handleTzReset = () => {
    setTimeZone({
      value: 'default',
      label: 'UTC',
      id: 'default'
    })
  }

  const handleSelectChange = ({ fieldName, item }) => {
    const { value } = item

    setSelect((prevState) => {
      const selectedDate = prevState[fieldName]
      if (selectedDate === '*') {
        return {
          ...prevState,
          [fieldName]: value
        }
      } else {
        const dateList = selectedDate.split(',')
        const found = dateList.find((date) => date === value)
        if (found) {
          const res = dateList.filter((date) => date !== found)
          if (!res.length) {
            return {
              ...prevState,
              [fieldName]: '*'
            }
          }
          return {
            ...prevState,
            [fieldName]: res.join()
          }
        } else {
          const res = `${selectedDate},${value}`
          return {
            ...prevState,
            [fieldName]: res
          }
        }
      }
    })
  }

  const handleClickClose = ({ fieldName, item }) => {
    const { value } = item

    setSelect((prevState) => {
      const selectedDate = prevState[fieldName]
      // can be one or several date
      const dateList = selectedDate.split(',')
      const found = dateList.find((date) => date === value)
      if (found) {
        const res = dateList.filter((date) => date !== found)
        if (!res.length) {
          return {
            ...prevState,
            [fieldName]: '*'
          }
        }
        return {
          ...prevState,
          [fieldName]: res.join()
        }
      }
    })
  }

  const handleClear = ({ fieldName }) => {
    for (const name of fieldName) {
      setSelect((prevState) => {
        return {
          ...prevState,
          [name]: '*'
        }
      })
    }
  }

  return (
    <div className="guide">
      <div className="guide__container">
        <div className="guide__title__container">
          <h1 className="guide__title">Cron Guide</h1>
        </div>
        <div className="guide__content">
          <div className="guide__left-content">
            <TextFieldForm
              timeZone={timeZone}
              handleSave={handleSave}
              select={select}
            />
            <TzSelect
              openOtherTzList={openOtherTzList}
              handleReset={handleTzReset}
              handleChange={handleTzChange}
              timeZone={timeZone}
            />
            <div className="guide__divider" />
            <DropdownForm
              handleClickClose={handleClickClose}
              handleClear={handleClear}
              handleChange={handleSelectChange}
              select={select}
            />
          </div>
          <Codebox
            tzValue={timeZone.value}
            savedSelects={savedSelects}
            handleResetCodeBox={handleResetCodeBox}
          />
        </div>
      </div>
    </div>
  )
}

Guide.propTypes = {}

export default Guide

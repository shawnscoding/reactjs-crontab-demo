import React from 'react'
import PropTypes from 'prop-types'
import { isShouldBeOn } from '../utils/helper'
import BtnGroup from './BtnGroup'
import Checkbox from './Checkbox'

const SelectedDates = ({ hour, handleClickClose }) => {
  const msg = 'Every Hour'

  if (hour === '*') {
    return (
      <div className='dropdown__selected-date'>
        <span className='dropdown__selected-date__placeholder'>
          {msg}
        </span>
      </div>
    )
  }
  const splitted = hour.split(',')

  const res = splitted.map((item, index) => {
    return (
      <div
        role='button'
        key={index}
        className='dropdown__input-wrapper'
      >
        <span className='dropdown__selected-date__text'>{item}</span>
        <svg
          onClick={() =>
            handleClickClose({ item: { value: item }, fieldName: 'hour' })
          }
          className='dropdown__close-icon'
          focusable={false}
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z' />
        </svg>
      </div>
    )
  })
  return <div className='dropdown__selected-date'>{res}</div>
}

const createArrWithNum = (num) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(i.toString())
  }
  const res = arr.map((item, index) => {
    return {
      id: index.toString(),
      value: index.toString(),
      label: item
    }
  })
  return res
  // 1 - 12
}

const HourDropdown = ({
  handleClear,
  select,
  handleChange,
  handleClickClose
}) => {
  const { hour } = select
  const res = createArrWithNum(24)
  const isDateSelected = hour !== '*'

  return (
    <React.Fragment>
      <div className="dropdown__wrapper">
        <div className="dropdown">
          <div className="dropdown__current" tabIndex='1'>
            <input
              type='text'
              value=''
              readOnly
              name='Ben'
              className="dropdown__input"
            />

            <SelectedDates handleClickClose={handleClickClose} hour={hour} />
            <BtnGroup
              fieldName={['hour']}
              handleClear={handleClear}
              isDateSelected={isDateSelected}
            />
          </div>
          <ul className="dropdown__list">
            {res.map((item) => {
              const isOn = isShouldBeOn(item.value, hour)

              return (
                <li
                  onClick={() => handleChange({ fieldName: 'hour', item })}
                  key={item.id}
                  className='dropdown__list-item'
                >
                  <div className="dropdown__option">{item.label}</div>
                  <input
                    value={item.label}
                    readOnly
                    className={
                      isOn
                        ?'dropdown__option__input--selected'
                        : "dropdown__option__input"
                    }
                  />
                  <Checkbox isOn={isOn} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

HourDropdown.propTypes = {}

export default HourDropdown

import React, {PropTypes} from 'react';
import {Input, Row} from 'react-materialize';

const SelectComponent = ({selectData, size, addedClass, selectedValue, onChangeEvent, name}) => {
  return (
    <Row className={addedClass}>
      <Input
        name={name}
        onChange={onChangeEvent}
        s={size}
        type='select'
        label='Role'>
        <option disabled>Choose your role</option>
        {
          selectData.map((item) => {
            let selectedOption = selectedValue === item._id ? 'selected' : false;

            return (
              <option
                selected={selectedOption}
                key={item._id}
                value={item.role}>
                {item.role}
              </option>
            );
          })
        }
      </Input>
    </Row>
  );
};

SelectComponent.propTypes = {
  selectData: PropTypes.array.isRequired,
  size: PropTypes.number,
  addedClass: PropTypes.string,
  selectedValue: PropTypes.number,
  onChangeEvent: PropTypes.func,
  name: PropTypes.string
};

export default SelectComponent;
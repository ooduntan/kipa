import React, {PropTypes} from 'react';

const CheckBox = ({data, name, checkedData, onClickEvent}) => {
  return (
    <div className='custom-checkox'>
      <div className='grey-text'>Privilege</div>
      {data.map((item) => {
        let checked;

        if (checkedData) {
          let roleId = item._id.toString();
          checked = checkedData.indexOf(roleId) >= 0 ? 'checked' : false;
        } else {
          checked = false;
        }

        return (
          <p key={item._id}>
            <input
              defaultChecked={checked}
              name={name}
              onClick={onClickEvent}
              value={item._id}
              type='checkbox'
              id={`${name}${item._id}`}/>
            <label htmlFor={`${name}${item._id}`}>{item.role}</label>
          </p>
        );
      })}
    </div>
  );
};

CheckBox.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  checkedData: PropTypes.array,
  onClickEvent: PropTypes.func
};

export default CheckBox;
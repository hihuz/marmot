import React from 'react';

const InputListForm = ({
  listItems,
  addListItem,
  removeListItem,
  updateListItem,
  buttonDisabled,
  listLabels
}) => {

  return   (<div className="add-form__block">
    {listLabels[0]} :
    {listItems.map((item, i) => {
      const inputClasses = `add-form-textfield${
        item.length === 0 &&
        i != listItems.length - 1 &&
        listItems.length > 1 ?
        ' input--invalid' : ''
      }`;
      return (
        <div
          className="flex-container"
          key={i}
        >
            <label className="input-list__label">
              {i + 1}
            </label>
            <input
              className={inputClasses}
              type="text"
              value={item}
              onChange={updateListItem}
              autoFocus={listItems.length === i + 1 && i !== 0}
              data-index={i}
            />
            { i !== 0 ?
              <i
                className="icon-remove input-list__remove"
                data-index={i}
                onClick={removeListItem}
              >
              </i> :
              <i
                className="icon-remove input-list__remove"
                style={{ opacity: 0 }}
              >
              </i>
            }
        </div>
      );
    })}
    <button
      className="button-outline button-centered"
      onClick={addListItem}
      disabled={buttonDisabled}
    >
      <i className="icon-plus" style={{ paddingRight: '0.5rem' }}></i> {listLabels[1]}
    </button>
  </div>
);
}


export default InputListForm;



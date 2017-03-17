import React from 'react';
import { connect } from 'react-redux';
import {
  addFormInput,
  removeFormInput,
  moveFormInput
} from '../actions/';

class InputListForm extends React.Component {
  constructor(props) {
    super(props);

    this.removeInput = this.removeInput.bind(this);
    this.addInput = this.addInput.bind(this);
    this.moveInputUp = this.moveInputUp.bind(this);
    this.moveInputDown = this.moveInputDown.bind(this);
  }
  addInput(e) {
    const name = e.target.getAttribute('name');
    const type = this.props.type;
    this.props.dispatchAddFormInput({ name, type });
  }
  removeInput(e) {
    const target = e.currentTarget;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    const type = this.props.type;
    this.props.dispatchRemoveFormInput({ name, index, type });
  }
  moveInputUp(e) {
    const dir = 'up';
    const target = e.currentTarget;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    const type = this.props.type;
    this.props.dispatchMoveFormInput({ name, index, dir, type });
  }
  moveInputDown(e) {
    const dir = 'down';
    const target = e.currentTarget;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    const type = this.props.type;
    this.props.dispatchMoveFormInput({ name, index, dir, type });
  }
  render() {
    const {
      showError,
      listLabels,
      listItems,
      name,
      textarea,
      updateListItem,
      buttonDisabled,
      handleFocus,
      handleBlur,
      saveChanges,
      cancelChanges,
      type
    } = this.props;

    return (
      <section className="section">
        {type === 'edit' ?
          <div className="section__edit-actions">
            {!showError ?
              <button
                className="icon-button edit-actions__button"
                onClick={saveChanges}
                name={name}
              >
                <i className="icon-floppy-o" />
              </button> : null
            }
            <button
              className="icon-button edit-actions__button"
              onClick={cancelChanges}
              name={name}
            >
              <i className="icon-undo" />
            </button>
          </div> : null
        }
        {showError && type === 'add' ?
          <div className={`tooltip-container ${type}-form__error`}>
            <div className="tooltip error-msg">
              <i className="icon-ban" />
              {listLabels[2]}
            </div>
          </div> : null
        }
        <p className="section__title">{listLabels[0]}</p>
        {listItems.map((item, i) => {
          const inputClasses = `add-form-textfield${
            showError && item.length === 0 ?
            ' input--invalid' : ''
          }`;
          return (
            <div
              className="flex-container"
              key={`${type}_${name}_${i}`}
            >
              <label className="input-list__label" htmlFor={name + i}>
                {i + 1}
              </label>
              <div className="input-list__controls">
                <button
                  className="input-list__button icon-button input-list__control"
                  onClick={this.moveInputUp}
                  data-index={i}
                  name={name}
                  disabled={i === 0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <i className="icon-sort-up" />
                </button>
                <button
                  className="input-list__button icon-button input-list__control"
                  onClick={this.moveInputDown}
                  data-index={i}
                  name={name}
                  disabled={listItems.length === i + 1}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <i className="icon-sort-down" />
                </button>
              </div>
              { textarea ?
                <textarea
                  className={inputClasses}
                  type="text"
                  value={item}
                  onChange={updateListItem}
                  autoFocus={listItems.length === i + 1 && i !== 0 && item.length === 0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name={name}
                  data-index={i}
                  id={name + i}
                /> :
                <input
                  className={inputClasses}
                  type="text"
                  value={item}
                  onChange={updateListItem}
                  autoFocus={listItems.length === i + 1 && i !== 0 && item.length === 0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name={name}
                  data-index={i}
                  id={name + i}
                />
              }
              { i !== 0 ?
                <button
                  className="input-list__button icon-button input-list__remove"
                  data-index={i}
                  name={name}
                  onClick={this.removeInput}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <i className="icon-remove" />
                </button> :
                <button
                  className="input-list__button icon-button input-list__remove"
                  style={{ visibility: 'hidden' }}
                >
                  <i className="icon-remove" />
                </button>
              }
            </div>
          );
        })}
        <button
          className="button-outline button-centered"
          onClick={this.addInput}
          disabled={buttonDisabled}
          name={name}
        >
          <i className="icon-plus" style={{ paddingRight: '0.5rem' }} /> {listLabels[1]}
        </button>
      </section>
    );
  }
}

export default connect(
  null,
  {
    dispatchAddFormInput: addFormInput,
    dispatchRemoveFormInput: removeFormInput,
    dispatchMoveFormInput: moveFormInput
  }
)(InputListForm);

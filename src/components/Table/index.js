import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {sortBy} from 'lodash';
import Button from '../Button';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
};

const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  children
}) => {
  const sortClass = classnames(
    'button-inline',
    {'button-active': sortKey === activeSortKey}
  );

  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  );
};

class Table extends Component {
  static displayName = 'Table';
  static propTypes = {
    list: PropTypes.array.isRequired,
    sortKey: PropTypes.string,
    isSortReverse: PropTypes.bool,
    onSort: PropTypes.func,
    onDismiss: PropTypes.func
  }

  render() {
    const {
      list,
      sortKey,
      isSortReverse,
      onSort,
      onDismiss
    } = this.props;

    const largeColumn = {
      width: '40%'
    };
    const midColumn = {
      width: '30%'
    };
    const smallColumn = {
      width: '10%'
    };

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={{width: '40%'}}>
            <Sort
              sortKey={'TITLE'}
              onSort={onSort}
              activeSortKey={sortKey}
            > Title
            </Sort>
          </span>
          <span style={{width: '30%'}}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={{width: '10%'}}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={onSort}
              activeSortKey={sortKey}
            > Comments
            </Sort>
          </span>
          <span style={{width: '10%'}}>
            <Sort
              sortKey={'POINTS'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={{width: '10%'}}>
            Archive
          </span>
        </div>
        {reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>
              {item.author}
            </span>
            <span style={smallColumn}>
              {item.num_comments}
            </span>
            <span style={smallColumn}>
              {item.points}
            </span>
            <span style={smallColumn}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default Table;

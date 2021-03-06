import React from 'react';
import PropTypes from 'prop-types';

import connectComponent from '../../helpers/connect-component';

const styles = (theme) => ({
  root: {
    background: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[800],
    height: 22,
    WebkitAppRegion: 'drag',
    WebkitUserSelect: 'none',
  },
});

const FakeTitleBar = (props) => {
  const {
    classes,
    color,
  } = props;

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: color }}
      onDoubleClick={() => {
        // feature: double click on title bar to expand #656
        // https://github.com/atomery/webcatalog/issues/656
        const win = window.require('electron').remote.getCurrentWindow();
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      }}
    />
  );
};

FakeTitleBar.defaultProps = {
  color: null,
};

FakeTitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
};

export default connectComponent(
  FakeTitleBar,
  null,
  null,
  styles,
);

import React from 'react';
import { Alert } from 'antd';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <Alert
      message={notification.message}
      type={notification.type} // 'success', 'info', 'warning', 'error'
      showIcon
    />
  );
};

export default Notification;

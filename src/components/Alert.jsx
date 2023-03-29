import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissibleExample({ isVisible, dismiss, msg }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(isVisible)
  }, [isVisible])

  if (show) {
    return (
      <Alert variant={msg.color} onClose={() => dismiss()} dismissible>
        <Alert.Heading>{msg.msg}</Alert.Heading>
      </Alert>
    );
  }

}

export default AlertDismissibleExample
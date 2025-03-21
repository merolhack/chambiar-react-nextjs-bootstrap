"use client";

import { Card, Button, Alert } from "react-bootstrap";
import { useState } from "react"; 

const AlertDismissible = ({ 
  alertHeading = "Oh snap! You got an error!", 
  alertText = "Change this and that and try again."
}) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading className="text-black">{alertHeading}</Alert.Heading>
            <p>{alertText}</p>
        </Alert>
    );
  }
};

export default AlertDismissible;
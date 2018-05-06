import React from "react";
import PropTypes from "prop-types";

import { Button, Text } from "native-base";

export default ButtonBlockLink = ({ onPress, children }) => (
  <Button full transparent onPress={onPress}>
    <Text>{children}</Text>
  </Button>
);

ButtonBlockLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string
};


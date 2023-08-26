import React from "react";
import Modal, { IModalProps } from "../modal/Modal";
import Calendar, { ICalendarProps } from "./Calendar";

export interface IModalCalendarProps
  extends IModalProps,
    Omit<ICalendarProps, "customHeader" | "style" | "theme"> {}

const ModalCalendar: React.FC<IModalCalendarProps> = ({
  open,
  onClose,
  size = "large",
  position = "bottom",
  title = "Calendar",
  leftIcon = "close",
  onSave,
  saveText,
  customHeader,
  customFooter,
  ...rest
}) => {
  return (
    <Modal
      {...rest}
      open={open}
      onClose={onClose}
      size={size}
      position={position}
      className="px-0"
      showHeader
      showFooter
      showCancelButton={false}
      title={title}
      onSave={onSave}
      swipeable={false}
      leftIcon={leftIcon}
      saveText={saveText}
      customHeader={customHeader}
      customFooter={customFooter}
    >
      <Calendar {...(rest as any)} />
    </Modal>
  );
};

export default ModalCalendar;

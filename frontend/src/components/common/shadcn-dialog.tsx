import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ShadcnDialogProperties {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  dialogContentClassName?: string;
}

const ShadcnDialog: React.FC<ShadcnDialogProperties> = ({
  title,
  description,
  open,
  onOpenChange,
  children,
  footer,
  dialogContentClassName,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogContentClassName}>
        <DialogHeader>
          {title && (
            <DialogTitle className="font-primary-text">{title}</DialogTitle>
          )}
          {description && (
            <DialogDescription className="font-primary-text">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default ShadcnDialog;

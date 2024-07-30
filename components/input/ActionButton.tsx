"use client";
import { Button, ButtonProps } from "@nextui-org/button";
import { FC, ReactNode } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownMenuProps,
  DropdownProps,
  DropdownTrigger,
  DropdownTriggerProps,
} from "@nextui-org/dropdown";
import { MdMoreVert } from "react-icons/md";

interface DataModel {
  dropdown?: DropdownProps;
  dropdownTrigger?: DropdownTriggerProps;
  button?: ButtonProps;
  dropdownMenu?: DropdownMenuProps;
  dropdownItem?: any;
  children?: ReactNode;
  options: {
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    children?: ReactNode;
    startContent?: ReactNode;
    endContent?: ReactNode;
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger"
      | undefined;
    props?: any;
  }[];
}

const ActionButton: FC<DataModel> = ({
  children = <MdMoreVert />,
  dropdown,
  dropdownItem,
  dropdownMenu,
  dropdownTrigger,
  options,
  button,
}) => {
  return (
    <Dropdown aria-label="action-button" {...dropdown}>
      <DropdownTrigger {...dropdownTrigger}>
        <Button variant="light" className="text-xl" isIconOnly {...button}>
          {children}
        </Button>
      </DropdownTrigger>
      <DropdownMenu {...dropdownMenu}>
        {
          options.map((e, key) => {
            return (
              <DropdownItem
                variant="flat"
                key={key}
                value={key}
                color={e.color}
                onClick={e.onClick}
                startContent={e.startContent}
                endContent={e.endContent}
                {...dropdownItem}
                {...e.props}
              >
                {e.children}
              </DropdownItem>
            );
          }) as any
        }
      </DropdownMenu>
    </Dropdown>
  );
};

export default ActionButton;

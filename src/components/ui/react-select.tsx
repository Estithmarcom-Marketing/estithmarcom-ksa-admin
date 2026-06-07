"use client";

import Select, { components } from "react-select";
import type { MultiValue, Props as SelectProps } from "react-select";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface ReactSelectProps extends Omit<SelectProps<Option, true>, "onChange" | "value"> {
  options: Option[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ReactSelect({
  options,
  value = [],
  onValueChange,
  placeholder,
  disabled,
  className,
  ...props
}: ReactSelectProps) {
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const handleChange = (newValue: MultiValue<Option>) => {
    onValueChange?.(newValue.map((opt) => opt.value));
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      isDisabled={disabled}
      placeholder={placeholder}
      className={cn("w-full", className)}
      classNamePrefix="react-select"
      isRtl={true}
      unstyled
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          cn(
            "flex min-h-10 w-full border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors",
            isFocused ? "outline-none ring-1 ring-ring border-ring" : "",
            isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          ),
        placeholder: () => "text-muted-foreground",
        valueContainer: () => "flex flex-wrap gap-1 gap-y-2",
        multiValue: () =>
          "flex items-center gap-1 rounded-sm bg-card border border-foreground/10 px-1 py-0.5 text-xs font-medium text-foreground",
        multiValueLabel: () => "px-1",
        multiValueRemove: () =>
          "rounded-sm hover:bg-destructive hover:text-destructive-foreground transition-colors",
        menu: () =>
          "mt-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        menuList: () => "p-1",
        option: ({ isFocused, isSelected }) =>
          cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
            isFocused ? "bg-accent text-accent-foreground" : "",
            isSelected ? "bg-main text-white" : ""
          ),
        noOptionsMessage: () => "py-6 text-center text-sm text-muted-foreground",
        indicatorsContainer: () => "flex items-center gap-1",
        clearIndicator: () => "text-muted-foreground hover:text-foreground p-1",
        dropdownIndicator: () => "text-muted-foreground hover:text-foreground p-1",
        input: () => "text-sm",
      }}
      components={{
        MultiValueRemove: (props) => (
          <components.MultiValueRemove {...props}>
            <X size={12} className="cursor-pointer" />
          </components.MultiValueRemove>
        ),
        Option: (props) => (
          <components.Option {...props}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-sm border border-main",
                  props.isSelected ? "bg-white text-main" : "opacity-50"
                )}
              >
                {props.isSelected && <Check size={12} strokeWidth={3} />}
              </div>
              <span>{props.label}</span>
            </div>
          </components.Option>
        ),
      }}
      {...props}
    />
  );
}

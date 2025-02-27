import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

import { IconType } from "react-icons";

type SelectInputProps = {
  label?: string;
  name: string;
  placeholder: string;
  items: Item[];
  defaultValue?: string;
  required?: boolean
};

type Item = {
  value: string;
  label: string;
  icon?: IconType;
};

function SelectInput(props: SelectInputProps) {
  return (
    <div className="mb-2">
      {props.label && (
        <Label htmlFor={props.name} className="">
          {props.label}
        </Label>
      )}
      <Select name={props.name} defaultValue={props.defaultValue} required={props.required}>
        <SelectTrigger>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {props.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectInput;

'use client'

import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  cStyle: string;
  // handleViewPassword: any
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  cStyle
}: FormFieldProps<T>) => {

  const [isPasswordSeen, setIsPasswordSeen] = useState(false)
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${cStyle}`}>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <div className="flex justify-center items-center border pr-2">
              <Input
                className="input focus:outline-0 border-0"
                type={label === "Password" && isPasswordSeen ? type = "text" : type}
                placeholder={placeholder}
                {...field}
              />
              {
                label === "Password"
                &&
                <div onClick={() => setIsPasswordSeen(!isPasswordSeen)}>
                  {
                    isPasswordSeen
                    ?
                    <Eye/>
                    :
                    <EyeClosed/>
                  }
                </div>
              }
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;

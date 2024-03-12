import { ChangeEvent } from "react";

interface Props {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export default function Checkbox({ checked, onChange, id }: Props) {
  return (
    <div className='flex items-center'>
      <input
        className='h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200  focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400 accent-blue-600'
        id={id}
        type='checkbox'
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor='checkbox-all-search' className='sr-only'>
        checkbox
      </label>
    </div>
  );
}

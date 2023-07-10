interface Props {
  value: string;
}

const DropdownItem = ({ value }: Props) => {
  return <option value={value}>{value}</option>;
};

export { DropdownItem };

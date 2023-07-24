interface Props {
  value: string;
}

const LmDropdownItem = ({ value }: Props) => {
  return <option value={value}>{value}</option>;
};

export { LmDropdownItem };

interface Props {
  value: string;
}

const FcDropdownItem = ({ value }: Props) => {
  return <option value={value}>{value}</option>;
};

export { FcDropdownItem };

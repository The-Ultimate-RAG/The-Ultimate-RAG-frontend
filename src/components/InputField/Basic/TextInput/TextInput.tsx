import styles from "./TextInput.module.css";

interface InputFieldProps {
  label: string;
  value: string;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconMouseDown?: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
}

function PromptInput(props: Readonly<InputFieldProps>) {
  return (
    <div className={styles.backgroundContainer}>
      <input
        className={styles.input}
        type={"text"}
        placeholder={props.label}
        autoComplete={"off"}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
      {}
    </div>
  );
}

export default PromptInput;

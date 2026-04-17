export function Choice<T extends ChoiceValueType>(choices: T[], value?: T) {
  const obj = {
    choices,
    value,
    __choiceObject__: true
  };

  return obj;
}

export function isChoice<T extends ChoiceValueType>(obj: any): obj is Choice<T> {
  return !!obj && obj.__choiceObject__ === true;
}

export interface Choice<T extends ChoiceValueType> { choices: T[], value?: T }
export type ChoiceValueType = string | number | undefined;

export default function ChoiceComponent() {
  return (
    <>
    </>
  );
}
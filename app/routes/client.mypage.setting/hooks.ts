

export function useFormTable() {
  const onChangeColNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targets = document.querySelectorAll<HTMLInputElement>(`[data-target-time="${e.target.getAttribute('data-time')}"]`)
    targets.forEach(target => {
      target.value = e.target.value;
    });
  };

  const onChangeRowNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targets = document.querySelectorAll<HTMLInputElement>(`[data-target-day="${e.target.getAttribute('data-day')}"]`)
    targets.forEach(target => {
      target.value = e.target.value;
    });
  };

  return {
    onChangeColNumber,
    onChangeRowNumber,
  };
}

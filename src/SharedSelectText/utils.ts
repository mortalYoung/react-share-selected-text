export interface SelectionProps {
  selection: Selection;
  text: string;
}
export const getSelectedText = function(): SelectionProps {
  let text = '';
  let selection;
  if (window.getSelection) {
    selection = window.getSelection();
    text = selection ? selection.toString() : '';
  } else if (
    (document as any).selection &&
    (document as any).selection.type !== 'Control'
  ) {
    // 兼容
    selection = (document as any).selection.createRange();
    text = selection.text;
  }
  return {
    selection: selection,
    text: text,
  };
};

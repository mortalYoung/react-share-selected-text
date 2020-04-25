export const getSelectedText = function () {
    let text = '';
    let selection;
    if (window.getSelection) {
        selection = window.getSelection();
        text = selection ? selection.toString() : '';
    } else if (document.selection && document.selection.type !== 'Control') {
        // 兼容
        selection = document.selection.createRange();
        text = selection.text;
    }
    return {
        selection: selection,
        text: text
    };
};
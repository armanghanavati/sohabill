export default class ComboboxHelpers {
  static getSelectedOptionFromId(id: number | string, options: any): void {
    const fixCombo = options?.filter((item: any) => {
      return String(item?.id) === String(id);
    });
    return fixCombo;
  }
}

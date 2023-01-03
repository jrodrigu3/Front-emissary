import exportFromJSON from 'export-from-json';

export let FileUtils = {

  downloadExcel(array: Array<any>, filename: string = 'download'): void {
    const data = array
    const fileName = filename
    const exportType = exportFromJSON.types.xls

    exportFromJSON({ data, fileName, exportType })
  },

}

import { Report, Suite, Test } from '@/types/report';

import { newUuid } from './uuid-factory';

export function groupSpecFileReportsByFolders(specFileReports: (Suite | Test)[]) {
  const structuredFiles: Suite = {
    uuid: newUuid(),
    name: '',
    tests: [],
  };
  specFileReports.forEach((fileResult) => {
    const pathArray = fileResult.name.split('/');
    let parentFolder = structuredFiles;
    if (pathArray.length > 1) {
      for (const folderName of pathArray.slice(0, -1)) {
        let folder = parentFolder.tests?.find(
          (element) => element.name.toLowerCase() === folderName.toLowerCase()
        );
        if (folder == null) {
          folder = {
            uuid: newUuid(),
            name: capitalizeFirstLetter(folderName),
            tests: [],
          };
          parentFolder.tests?.push(folder);
        }
        parentFolder = folder;
      }
    }
    parentFolder.tests?.push({
      ...fileResult,
      name: capitalizeFirstLetter(fileResult.name.substring(fileResult.name.lastIndexOf('/') + 1)),
    });
  });

  const report: Report = {
    tests: structuredFiles,
  };
  return report;
}

export function suiteNameFromFileName(filename: string) {
  return capitalizeFirstLetter(filename.replace('.ts', '').replace('.spec', '').replace('-', ' '));
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

import path from 'path';
import fs from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';

export const getComponentFilesWithContentMap = async (basePath: string) => {
  const directory = await fs.readdir(basePath, { withFileTypes: true });
  const hasComponentsFolder = directory.find(
    (d) => d.name === 'components' && d.isDirectory()
  );

  if (!hasComponentsFolder) return {};

  const componentFileNames = await fs.readdir(
    path.join(basePath, 'components')
  );
  const componentFilesWithContentPromises = componentFileNames.map(
    async (file) => {
      const filePath = path.join(basePath, 'components', file);
      const fileData = await fs.readFile(filePath);

      const content = fileData.toString();
      console.log(content);

      return [filePath, content];
    }
  );
  const componentFilesWithContent = await Promise.all(
    componentFilesWithContentPromises
  );

  const componentFilesWithContentMap = Object.fromEntries(
    componentFilesWithContent
  );

  return componentFilesWithContentMap;
};

const pathToPosts = path.join(__dirname, '../../content/blog');

export const getBundledMdx = async (slug: string) => {
  const basePath = path.join(pathToPosts, slug);
  const fullPath = path.join(basePath, 'index.mdx');

  const componentFilesWithContentMap = await getComponentFilesWithContentMap(
    basePath
  );

  const bundle = await bundleMDX({
    file: fullPath,
    // files: componentFilesWithContentMap,
    cwd: basePath,
  });

  return bundle;
};

import fs from 'fs/promises';
import path from 'path';
import utils from 'util';
import child_process from 'child_process';
import chalk from 'chalk';

const startTime: number = Date.now();

async function isCompleted(isCompleted: boolean) {
  if (isCompleted) {
    process.stdout.write(chalk.green.bold('Done \n'));
  } else {
    process.stdout.write(chalk.red.bold('Failed \n'));
  }
}
// Clear current dist
async function clearBuild() {
  process.stdout.write(chalk.green('1. Clearing current build... '));
  await fs
    .rmdir(path.resolve(path.resolve(__dirname, '../'), 'dist'), {
      recursive: true
    })
    .then(() => {
      isCompleted(true);
    })
    .catch((error) => {
      isCompleted(false);
      throw new Error(error);
    });
}

// Generate directory structure
async function createDirStructure() {
  process.stdout.write(chalk.green('2. Creating a directory structure... '));
  await fs
    .mkdir(path.resolve(path.resolve(__dirname, '../'), 'dist/package'), {
      recursive: true
    })
    .then(() => {
      isCompleted(true);
    })
    .catch((error) => {
      isCompleted(false);
      throw new Error(error);
    });
}

// Run webpack to compile TypeScript & minify
async function runWebpackBuild() {
  process.stdout.write(chalk.green('3. Building with Webpack... '));
  await utils
    .promisify(child_process.exec)('npx webpack --config webpack.config.js', {
      encoding: 'utf8'
    })
    .then(() => {
      isCompleted(true);
    })
    .catch((error) => {
      isCompleted(false);
      throw new Error(error);
    });
}

// Copy required files to dist
async function copyRequiredFiles(): Promise<void> {
  process.stdout.write(chalk.green('4. Copying required file... '));
  const files = [
    {
      source: '../src/types/typing.d.ts',
      destination: '../dist/package/typing.d.ts'
    },
    {
      source: '../package.json',
      destination: '../dist/package/package.json'
    }
  ];
  new Promise((resolve, reject) => {
    try {
      files.forEach(async (data) => {
        await fs
          .copyFile(
            path.resolve(__dirname, data.source),
            path.resolve(__dirname, data.destination)
          )
          .catch((error) => {
            throw new Error(error);
          });
      });
      isCompleted(true);
      resolve;
    } catch {
      isCompleted(false);
      reject;
    }
  });
}

// Correct package.json paths & clear dependencies
async function updatePackageJson() {
  process.stdout.write(chalk.green('5. Formatting package.json file... '));
  const packageJsonPath = path.resolve(
    path.resolve(__dirname, '../'),
    'dist/package/package.json'
  );
  await fs
    .readFile(packageJsonPath, { encoding: 'utf8' })
    .then(async (data: any) => {
      const packageJson = {
        ...JSON.parse(data),
        files: ['/'],
        main: 'index.js',
        types: 'index.d.ts'
      };
      // Remove unnecessary properties
      delete packageJson.scripts;
      delete packageJson.devDependencies;

      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    })
    .then(() => {
      isCompleted(true);
    })
    .catch((error) => {
      isCompleted(false);
      throw new Error(error);
    });
}

// Build the package
async function generatePackage(): Promise<void> {
  process.stdout.write(chalk.green('6. Generating NPM package...'));
  await utils
    .promisify(child_process.exec)('npm pack ./dist/package/', {
      encoding: 'utf8'
    })
    .then(async (data) => {
      isCompleted(true);
      await copyZip(data.stdout.trim());
    })
    .catch((error) => {
      isCompleted(false);
      throw new Error(error);
    });
}

// Copy generated package from the root to the dist dir
async function copyZip(fileName: string): Promise<void> {
  process.stdout.write(
    chalk.green('7. Copying generating NPM package to dist... ')
  );
  await utils
    .promisify(child_process.exec)(`cp ./${fileName} ./dist/`, {
      encoding: 'utf8'
    })
    .then(() => {
      isCompleted(true);
    })
    .catch((error) => {
      isCompleted(false);
      throw new Error(error);
    });
}

// Generation completion output
async function completionOutput(startTime: number): Promise<void> {
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  process.stdout.write(chalk.green(`${'-'.repeat(50)}\n`));
  process.stdout.write(
    chalk.green.bold(
      `Success \t\t\t\t ${chalk.reset.green(
        '(' + duration.toFixed(2) + 'sec)'
      )}`
    )
  );
}

async function build() {
  console.log(chalk.green.bold('Starting Build...\n'));
  try {
    await clearBuild();
    await createDirStructure();
    await runWebpackBuild();
    await copyRequiredFiles();
    await updatePackageJson();
    await generatePackage();
    await completionOutput(startTime);
  } catch (error) {
    console.log(chalk.green('\n------------------------'));
    console.error(error);
  }
}

build();

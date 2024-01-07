import chalk from 'chalk';
import { exec } from 'child_process';
import { copyFile, exists, mkdir, readJSON, rm, writeJSON } from 'fs-extra';
import { join, resolve } from 'path';
import { promisify } from 'util';

const startTime: number = Date.now();

async function isCompleted(isCompleted: boolean) {
  if (isCompleted) {
    process.stdout.write(chalk.green.bold('Done \n'));
  } else {
    process.stdout.write(chalk.red.bold('Failed \n'));
  }
}

const distRootPath = resolve('dist');
const distPackageRootPath = join(distRootPath, 'package');

// Clear current dist
async function clearBuild() {
  try {
    process.stdout.write(chalk.green('1. Clearing current build... '));
    if (await exists(distRootPath)) {
      await rm(distRootPath, { recursive: true });
    }
    isCompleted(true);
  } catch (error) {
    isCompleted(false);
    throw error
  }
}

// Generate directory structure
async function createDirStructure() {
  try {
    process.stdout.write(chalk.green('2. Creating a directory structure... '));
    await mkdir(distPackageRootPath, { recursive: true });
    isCompleted(true);
  } catch (error) {
    isCompleted(false);
    throw error
  }
}

// Run webpack to compile TypeScript & minify
async function runWebpackBuild() {
  try {
    process.stdout.write(chalk.green('3. Building with Webpack... '));
    await promisify(exec)('npm run build', {
      encoding: 'utf8'
    })
    isCompleted(true);
  } catch (error) {
    isCompleted(false);
    throw error
  }
}

// Copy required files to dist
async function copyRequiredFiles(): Promise<void> {
  try {
    process.stdout.write(chalk.green('4. Copying required file... '));
    await copyFile('./src/types/typing.d.ts', './dist/package/typing.d.ts');
    await copyFile('./package.json', './dist/package/package.json');
    await copyFile('./README.md', './dist/package/README.md');
    isCompleted(true);
  } catch (error) {
    isCompleted(false);
    throw error
  }
}

// Correct package.json paths & clear dependencies
async function updatePackageJson() {
  try {
    process.stdout.write(chalk.green('5. Formatting package.json file... '));
    const packageJsonPath = join(distPackageRootPath, 'package.json');
    const packageJson = {
      ...await readJSON(packageJsonPath),
      files: ['*'],
      main: 'index.js',
      typings: 'typing.d.ts'
    };
    delete packageJson.scripts;
    delete packageJson.devDependencies;
    await writeJSON(packageJsonPath, packageJson, { spaces: 2 });
    isCompleted(true);
  } catch (error) {
    isCompleted(false);
    throw error
  }
}

// Build the package
async function generatePackage(): Promise<void> {
  try {
    process.stdout.write(chalk.green('6. Generating NPM package...'));
    await promisify(exec)('npm pack ./dist/package/ --pack-destination ./dist', {
      encoding: 'utf8'
    })
    isCompleted(true);
  } catch (error) {
    isCompleted(false);
    throw error
  }
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

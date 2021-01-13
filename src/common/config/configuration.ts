import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yml';
const ROUTE_PATH_FILE_CONFIG = join(`${process.cwd()}/environments`, YAML_CONFIG_FILENAME);

export default () => {
  return yaml.load(
    readFileSync(ROUTE_PATH_FILE_CONFIG, 'utf8'),
  );
};
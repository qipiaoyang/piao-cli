import { join, basename } from 'path';
import vfs from 'vinyl-fs';
import { renameSync, existsSync } from 'fs';
import { sync as empty_dir } from 'empty-dir';
import through from 'through2';
import leftPad from 'left-pad';
import chalk from 'chalk';

function info(type, message) {
    console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
  }
  
  function error(message) {
    console.error(chalk.red(message));
  }
  
  function success(message) {
    console.error(chalk.green(message));
  }
  
  function init({ssr, spa, vue, gulp, install, args}) {
    console.log(33333);
    let type = '';
    if(ssr) {
      type = 'ssr';
    } else if(spa) {
      type = 'spa';
    } else if(vue) {
      type = 'vue';
    } else if (gulp) {
      type = 'gulp';
    } else {
      type = 'spa';
    }

    const cwd = join(__dirname, '../boilerplates', type);
    const dest = process.cwd();
    const projectName = args[0] ? args[0] : basename(dest);
    const realfolder = args[0] ? join(dest, args[0]) : dest;
    console.log(realfolder,"=======")
    
    // //判断文件夹是否存在
    if (!empty_dir(dest,function(e) {
      if(e === projectName) {
        return false;
      }
      return true;
    })) {
      error('文件夹已存在，请在一个空的文件夹执行run init命令');
      process.exit(1);
    }
  
    console.log(`创建了一个新的 ${projectName} 项目在 ${dest}.`);
    console.log();
  
    vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, dot: true})
      .pipe(template(realfolder, cwd))
      .pipe(vfs.dest(realfolder))
      .on('end', function() {
        info('rename', 'gitignore -> .gitignore');
        renameSync(join(realfolder, 'gitignore'), join(realfolder, '.gitignore'));
        if (install) {
          info('run', 'npm install');
          require('./install').default(printSuccess,realfolder);
        } else {
          printSuccess();
        }
      })
      .resume();
  
    function printSuccess() {
      success(`
  恭喜您成功创建了一个项目 ${projectName} 在 ${dest}.
  
  您可以进入文件夹，然后执行下面的命令运行:
    cd ${realfolder}
    npm\\yarn run dev
  
  谢谢使用!`);
    }
  }
  
  function template(dest, cwd) {
    return through.obj(function (file, enc, cb) {
      if (!file.stat.isFile()) {
        return cb();
      }
  
      info('create', file.path.replace(cwd + '/', ''));
      this.push(file);
      cb();
    });
  }
  
  export default init;
  
# Make script

The make script generates components along with all of their files and imports.
The goal is to reduce the time spent bootstrapping and increase productivity.

It's written in TypeScript in order to improve maintainability. This means it
runs slower, and requires ts-node to run, but the cost is worth it.

The main flow of this script is:

1. In `index.ts`, **begin the script**

   - This is the entry point, and it also outlines the entire flow of the
     script. It begins by calling the `optionPicker`.

1. In `optionPicker.ts`, **choose your options**

   - This is the file that collects user input and provides options for them.

1. In `summaryLog.ts`, **summarize the options**

   - This takes the options selected in `optionPicker.ts` and displays them.

1. In `index.ts`, **ask for approval**

   - Check if the user is ok with the options they selected, as well as the
     warnings they received. If approved, call `generateFiles`.

1. In `generateFiles.ts`, **generate all files and directories**

   - This builds out all of the files and directories based on the options
     selected. This is the most substantial file, as it needs to interact a lot
     with the file system.

   1. It imports all of the file content strings from the `/file-content`
      directory in order to populate the file content.
   1. It uses the `getPaths` utility to generate all of the paths to files and
      directories
   1. It checks for any errors (ex: existing files or directories)
   1. It generates files and directories, as well as modifies index files to
      include the imports

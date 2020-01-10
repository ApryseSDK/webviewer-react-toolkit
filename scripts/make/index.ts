import { prompt } from 'enquirer';
import { clearTerminal, log, redErr } from '../utils/logUtils';
import { generateFiles } from './generateFiles';
import { optionPicker } from './optionPicker';
import { summaryLog } from './summaryLog';

(async () => {
  clearTerminal();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      /* --- Pick and display options --- */

      const options = await optionPicker();
      summaryLog(options);

      const { componentName, isRef } = options;

      /* --- Check for final approval before generating files --- */

      const approvedOptions = (
        await prompt<{ approvedOptions: 'quit' | 'no' | 'yes' }>({
          type: 'select',
          name: 'approvedOptions',
          message: `Do these options look ok?`,
          choices: [
            { name: 'yes', hint: ' All of your choices are correct' },
            { name: 'no', hint: '  Reselect your component options' },
            { name: 'quit', hint: 'You give up' },
          ],
        })
      )['approvedOptions'];

      // Quit
      if (approvedOptions === 'quit') return;

      // Restart (clear the console before repeating make script)
      if (approvedOptions === 'no') {
        clearTerminal();
        log('Restarting script...\n');
      }

      // Generate files and directories
      if (approvedOptions === 'yes') {
        log('\nAttempting to generate files...\n');
        generateFiles({ isRef, componentName });
        return;
      }
    } catch (error) {
      redErr(`\nScript Error:\n${error || 'No error returned.'}`);
      return;
    }
  }
})();

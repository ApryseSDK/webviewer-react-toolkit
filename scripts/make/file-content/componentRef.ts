import {pascalToCamel} from '../utils/stringUtils';
import {STYLE_PREFIX} from '../constants';

/* prettier-ignore */
export const componentRef = (componentName: string) =>
  `import classnames from 'classnames';
import React, {forwardRef, ButtonHTMLAttributes} from 'react';

export interface ${componentName}Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Set the internals of the button.
   * @default "Default value"
   */
  someProp?: string;
}

export const ${componentName} = forwardRef<HTMLButtonElement, ${componentName}Props>(
  ({someProp = 'Default value', className, ...buttonProps}, ref) => {
    const ${pascalToCamel(componentName)}Class = classnames('${STYLE_PREFIX}__${pascalToCamel(componentName)}', className, {
      ['${STYLE_PREFIX}__${pascalToCamel(componentName)}--disabled']: buttonProps.disabled,
    })

    return (
      <button className={${pascalToCamel(componentName)}Class} {...buttonProps} ref={ref}>
        {someProp}
      </button>
    );
  },
);
`;

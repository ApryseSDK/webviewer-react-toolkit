import { pascalToCamel } from '../utils/stringUtils';
import { STYLE_PREFIX } from '../constants';

/* prettier-ignore */
export const component = (componentName: string) =>
  `import classnames from 'classnames';
import React, { FC, ButtonHTMLAttributes } from 'react';

export interface ${componentName}Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Set the internals of the button.
   * @default "Default value"
   */
  someProp?: string;
}

export const ${componentName}: FC<${componentName}Props> = ({ someProp = 'Default value', className, ...buttonProps }) => {
  const ${pascalToCamel(componentName)}Class = classnames('${STYLE_PREFIX}__base ${STYLE_PREFIX}__${pascalToCamel(componentName)}', className, {
    ['${STYLE_PREFIX}__${pascalToCamel(componentName)}--disabled']: buttonProps.disabled,
  })

  return (
    <button {...buttonProps} className={${pascalToCamel(componentName)}Class}>
      {someProp}
    </button>
  );
};
`;
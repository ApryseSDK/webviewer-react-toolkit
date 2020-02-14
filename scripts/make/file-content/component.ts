import { STYLE_PREFIX } from '../constants';
import { pascalToCamel } from '../utils/stringUtils';

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

export const ${componentName}: FC<${componentName}Props> = ({ someProp = 'Default value', className, ...props }) => {
  const ${pascalToCamel(componentName)}Class = classnames(
    '${STYLE_PREFIX}__base ${STYLE_PREFIX}__${pascalToCamel(componentName)}',
    { '${STYLE_PREFIX}__${pascalToCamel(componentName)}--disabled': props.disabled },
    className,
  );

  return (
    <button {...props} className={${pascalToCamel(componentName)}Class}>
      {someProp}
    </button>
  );
};
`;

import { STYLE_PREFIX } from '../constants';
import { pascalToCamel } from '../utils/stringUtils';

export const component = (componentName: string) =>
  `import classnames from 'classnames';
import React, { FC, ButtonHTMLAttributes } from 'react';

export interface ${componentName}Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // write your first prop
}

export const ${componentName}: FC<${componentName}Props> = ({ className, children, ...props }) => {
  const ${pascalToCamel(componentName)}Class = classnames(
    '${STYLE_PREFIX}__base ${STYLE_PREFIX}__${pascalToCamel(componentName)}',
    { '${STYLE_PREFIX}__${pascalToCamel(componentName)}--modifier': true },
    className,
  );

  return (
    <button {...props} className={${pascalToCamel(componentName)}Class}>
      {children}
    </button>
  );
};
`;
